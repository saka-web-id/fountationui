<script setup lang="ts">
import { ref, onMounted, watch, computed, h } from 'vue';
import { useI18n } from 'vue-i18n';
import { useApi } from "~/composables/useApi";
import { useAuthStore } from '~/stores/auth';
import { useCampaignForm, mapCampaignFromApi } from '../hooks/forms/useCampaignForm';
import type { TemplateSimpleDTO, NotificationCategorySimpleDTO, NotificationDTO } from '../interfaces/types';
import { getNotificationProviders } from '~/services/notification/providers/NotificationProviderService';
import { parseRecipientCSV } from './RecipientUpload';
import type { ProviderPayload } from "~/features/notification/providers/interfaces/provider.payload.ts";
import { createColumnHelper } from '@tanstack/vue-table';
import { useDataTable } from '~/composables/useDataTable';
import BaseTable from '~/components/table/BaseTable.vue';
import dayjs from "dayjs";

const emit = defineEmits(['saved', 'cancel']);

const { t } = useI18n();
const auth = useAuthStore();
const { post, put, get, data: campaignData } = useApi();
const { data: templates, get: getTemplates } = useApi<TemplateSimpleDTO[]>();
const { data: categories, get: getCategories } = useApi<NotificationCategorySimpleDTO[]>();

const props = defineProps<{
  companyId: string;
  campaignId?: number;
}>();

const {
    handleSubmit,
    setValues,
    values,
    errors,
    notiCampaignTemplateId,
    notiCampaignTitle,
    notiCampaignDescription,
    notiCampaignMetadata,
    notiCampaignScheduledAt,
    notiCampaignNotifications,
    beautifyMetadata,
    updateNotification,
    addNotification,
    removeNotification
} = useCampaignForm();

const providers = ref<ProviderPayload[]>([]);
const selectedCategory = ref<number>(0);
const selectedProvider = ref<number>(0);
const isUploading = ref(false);

// Recipient Offcanvas State
const recipientForm = ref<Partial<NotificationDTO>>({
    notiRecipientAddress: '',
    notiCategoryId: 0,
    notiProviderId: 0,
    notiStatus: 'SCHEDULED'
});
const editingRecipientIndex = ref<number>(-1);

// Recipients Table Logic
const recipientsData = computed(() => notiCampaignNotifications.value || []);
const columnHelper = createColumnHelper<NotificationDTO>();

const columns = [
    columnHelper.accessor('notiRecipientAddress', {
        header: () => t('campaign.recipients'),
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('notiCategoryId', {
        header: () => t('category.name'),
        cell: info => {
            const cat = categories.value?.find(c => c.notiCategoryId === info.getValue());
            return cat ? cat.notiCategoryName : info.getValue();
        },
        meta: { className: 'd-none d-md-table-cell' }
    }),
    columnHelper.accessor('notiProviderId', {
        header: () => t('provider.name'),
        cell: info => {
            const prov = providers.value?.find(p => p.providerId === info.getValue());
            return prov ? prov.providerName : info.getValue();
        },
        meta: { className: 'd-none d-md-table-cell' }
    }),
    columnHelper.accessor('notiStatus', {
        header: () => t('textLabel.status'),
        cell: info => h('span', { class: 'badge bg-light text-dark' }, t(`status.${info.getValue().toLowerCase()}`)),
        meta: { className: 'd-none d-md-table-cell' }
    }),
    columnHelper.display({
        id: 'actions',
        header: () => t('textLabel.action'),
        cell: info => h('div', { class: 'btn-group' }, [
            h('button', {
                type: 'button',
                class: 'btn btn-outline-primary btn-sm border-0',
                'data-bs-toggle': 'offcanvas',
                'data-bs-target': '#offcanvasRecipientForm',
                onClick: () => openEditRecipient(info.row.index)
            }, h('i', { class: 'fas fa-edit' })),
            h('button', {
                type: 'button',
                class: 'btn btn-outline-danger btn-sm border-0',
                onClick: () => removeNotification(info.row.index)
            }, h('i', { class: 'fas fa-trash' }))
        ]),
    }),
];

const { table: recipientsTable, globalFilter: recipientsFilter } = useDataTable(recipientsData, columns);

const fetchData = async () => {
    const userId = auth.user?.id;
    await Promise.all([
        getTemplates(`/v0/notification/templates/list/companyId/${auth.user?.company.companyId}/userId/${userId}/valueCompanyId/${props.companyId}`),
        getCategories(`/v0/notification/category/list/companyId/${auth.user?.company.companyId}/userId/${userId}/valueCompanyId/${props.companyId}`)
    ]);

    if (props.campaignId) {
        await get(`/v0/notification/campaign/detail/companyId/${auth.user?.company.companyId}/userId/${userId}/campaignId/${props.campaignId}`);
        if (campaignData.value) {
            const mapped = mapCampaignFromApi(campaignData.value as any);
            setValues(mapped);
            if (mapped.notiCampaignNotifications.length > 0) {
                selectedCategory.value = mapped.notiCampaignNotifications[0].notiCategoryId;
                selectedProvider.value = mapped.notiCampaignNotifications[0].notiProviderId;
            }
        }
    }
};

onMounted(fetchData);

const updateProviders = async () => {
    if (notiCampaignTemplateId.value && templates.value) {
        const template = templates.value.find(t => t.notiTemplateId === notiCampaignTemplateId.value);
        if (template) {
            const userId = auth.user?.id;
            const res = await getNotificationProviders(
                Number(auth.user?.company.companyId), 
                userId!, 
                Number(props.companyId), 
                template.notiTemplateType
            );
            providers.value = Array.isArray(res) ? (res as ProviderPayload[]) : [];
        }
    } else {
        providers.value = [];
    }
};

watch(selectedCategory, updateProviders);
watch(notiCampaignTemplateId, updateProviders);

const onFileChange = async (event: any) => {
    const file = event.target.files[0];
    if (!file) return;

    if (selectedCategory.value && selectedProvider.value) {
        isUploading.value = true;
        try {
            const notis = await parseRecipientCSV(file, Number(props.companyId), selectedCategory.value, selectedProvider.value);
            notis.forEach(n => addNotification(n as NotificationDTO));
        } catch (e: any) {
            alert(e.message);
            event.target.value = '';
        } finally {
            isUploading.value = false;
        }
    } else {
        alert("Please select category and provider first.");
        event.target.value = '';
    }
};

const downloadExampleCSV = () => {
    const csvContent = "recipient\nuser1@example.com\n+628123456789\nuser2@example.com";
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "campaign_recipients_example.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const openAddRecipient = () => {
    editingRecipientIndex.value = -1;
    recipientForm.value = {
        notiRecipientAddress: '',
        notiCategoryId: selectedCategory.value,
        notiProviderId: selectedProvider.value,
        notiStatus: 'SCHEDULED'
    };
};

const openEditRecipient = (index: number) => {
    editingRecipientIndex.value = index;
    const target = values.notiCampaignNotifications[index];
    recipientForm.value = { ...target };
};

const saveRecipientManual = () => {
    if (!recipientForm.value.notiRecipientAddress || !recipientForm.value.notiCategoryId || !recipientForm.value.notiProviderId) {
        alert("Please fill all required fields");
        return;
    }

    const payload = {
        ...recipientForm.value,
        notiCompanyId: Number(props.companyId)
    } as NotificationDTO;

    if (editingRecipientIndex.value >= 0) {
        updateNotification(editingRecipientIndex.value, payload);
    } else {
        addNotification(payload);
    }

    // Close offcanvas via data-bs-dismiss on the button or JS if needed
    // Simplified: relying on user clicking Close or having a ref to the offcanvas
    const offcanvasElement = document.getElementById('offcanvasRecipientForm');
    if (offcanvasElement) {
        const bsOffcanvas = (window as any).bootstrap?.Offcanvas.getInstance(offcanvasElement);
        bsOffcanvas?.hide();
    }
};

const onSubmit = handleSubmit(async (values) => {
    const userId = auth.user?.id;
    const payload = {
        ...values,
        notiCampaignCompanyId: Number(props.companyId),
        notiCampaignMetadata: JSON.parse(values.notiCampaignMetadata),
        notiCampaignScheduledAt: dayjs(values.notiCampaignScheduledAt).format()
    };

    try {
        if (values.notiCampaignId) {
            await put(`/v0/notification/campaign/update/companyId/${auth.user?.company.companyId}/userId/${userId}`, payload);
        } else {
            await post(`/v0/notification/campaign/add/companyId/${auth.user?.company.companyId}/userId/${userId}`, payload);
        }
        emit('saved');
    } catch (e) {
        console.error("Save failed", e);
    }
});
</script>

<template>
    <div class="card p-4">
        <h4 class="mb-4">{{ props.campaignId ? t('campaign.editTitle') : t('campaign.addTitle') }}</h4>
        <form @submit.prevent="onSubmit">
            <div class="mb-3">
                <label class="form-label">{{ t('campaign.title') }}</label>
                <input v-model="notiCampaignTitle" type="text" class="form-control" :class="{ 'is-invalid': errors.notiCampaignTitle }">
                <div class="invalid-feedback">{{ errors.notiCampaignTitle }}</div>
            </div>

            <div class="mb-3">
                <label class="form-label">{{ t('campaign.description') }}</label>
                <textarea v-model="notiCampaignDescription" class="form-control"></textarea>
            </div>

            <div class="row mb-3">
                <div class="col-md-6">
                    <label class="form-label">{{ t('campaign.template') }}</label>
                    <select v-model="notiCampaignTemplateId" class="form-select" :class="{ 'is-invalid': errors.notiCampaignTemplateId }">
                        <option :value="0">{{ t('campaign.selectTemplate') }}</option>
                        <option v-for="tpl in templates" :key="tpl.notiTemplateId" :value="tpl.notiTemplateId">
                            {{ tpl.notiTemplateName }} ({{ tpl.notiTemplateType }})
                        </option>
                    </select>
                    <div class="invalid-feedback">{{ errors.notiCampaignTemplateId }}</div>
                </div>
                <div class="col-md-6">
                    <label class="form-label">{{ t('campaign.scheduledAt') }}</label>
                    <input v-model="notiCampaignScheduledAt" type="datetime-local" class="form-control" :class="{ 'is-invalid': errors.notiCampaignScheduledAt }">
                    <div class="invalid-feedback">{{ errors.notiCampaignScheduledAt }}</div>
                </div>
            </div>

            <div class="mb-3">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <label class="form-label mb-0">{{ t('campaign.metadata') }} (JSON)</label>
                    <button type="button" class="btn btn-outline-secondary btn-sm" @click="beautifyMetadata">{{ t('campaign.beautify') }}</button>
                </div>
                <textarea v-model="notiCampaignMetadata" class="form-control font-monospace" rows="5" :class="{ 'is-invalid': errors.notiCampaignMetadata }"></textarea>
                <div class="invalid-feedback">{{ errors.notiCampaignMetadata }}</div>
            </div>

            <hr>

            <div class="mb-4">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h5 class="mb-0">{{ t('campaign.recipients') }} ({{ recipientsData.length }})</h5>
                    <button type="button" class="btn btn-sm btn-outline-primary" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRecipientForm" @click="openAddRecipient">
                        <i class="fas fa-plus me-1"></i>{{ t('campaign.addManual') }}
                    </button>
                </div>
                
                <div class="row g-2 align-items-end mb-3">
                    <div class="col-md-3">
                        <label class="form-label small">{{ t('category.name') }}</label>
                        <select v-model="selectedCategory" class="form-select form-select-sm">
                            <option :value="0">{{ t('campaign.selectCategory') }}</option>
                            <option v-for="cat in categories" :key="cat.notiCategoryId" :value="cat.notiCategoryId">{{ cat.notiCategoryName }}</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <label class="form-label small">{{ t('provider.name') }}</label>
                        <select v-model="selectedProvider" class="form-select form-select-sm" :disabled="!selectedCategory">
                            <option :value="0">{{ t('campaign.selectProvider') }}</option>
                            <option v-for="p in providers" :key="p.providerId" :value="p.providerId">{{ p.providerName }}</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <div class="d-flex justify-content-between align-items-center mb-1">
                            <label class="form-label small mb-0">{{ t('campaign.uploadCSV') }}</label>
                            <a href="#" class="small text-decoration-none" @click.prevent="downloadExampleCSV" style="font-size: 0.7rem;">
                                <i class="fas fa-download me-1"></i>{{ t('campaign.example') }}
                            </a>
                        </div>
                        <input type="file" class="form-control form-control-sm" accept=".csv" @change="onFileChange" :disabled="isUploading">
                    </div>
                    <div class="col-md-3">
                        <label class="form-label small">{{ t('button.search') }}</label>
                        <input v-model="recipientsFilter" type="text" class="form-control form-control-sm" :placeholder="t('button.search') + '...'">
                    </div>
                </div>

                <div class="border rounded bg-light p-2">
                    <BaseTable :table="recipientsTable" />
                </div>
            </div>

            <div class="d-flex justify-content-end gap-2 mt-4">
                <button type="button" class="btn btn-secondary" @click="emit('cancel')">{{ t('button.cancel') }}</button>
                <button type="submit" class="btn btn-primary">{{ t('button.save') }}</button>
            </div>
        </form>

        <!-- Recipient Add/Edit Offcanvas -->
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRecipientForm" aria-labelledby="offcanvasRecipientFormLabel">
            <div class="offcanvas-header border-bottom">
                <h5 id="offcanvasRecipientFormLabel">{{ editingRecipientIndex >= 0 ? t('campaign.editRecipient') : t('campaign.addRecipient') }}</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <div class="mb-3">
                    <label class="form-label">{{ t('campaign.recipientAddress') }}</label>
                    <input v-model="recipientForm.notiRecipientAddress" type="text" class="form-control" placeholder="e.g. email@example.com or +62...">
                </div>
                <div class="mb-3">
                    <label class="form-label">{{ t('category.name') }}</label>
                    <select v-model="recipientForm.notiCategoryId" class="form-select">
                        <option :value="0">{{ t('campaign.selectCategory') }}</option>
                        <option v-for="cat in categories" :key="cat.notiCategoryId" :value="cat.notiCategoryId">{{ cat.notiCategoryName }}</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label class="form-label">{{ t('provider.name') }}</label>
                    <select v-model="recipientForm.notiProviderId" class="form-select">
                        <option :value="0">{{ t('campaign.selectProvider') }}</option>
                        <option v-for="p in providers" :key="p.providerId" :value="p.providerId">{{ p.providerName }}</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label class="form-label">{{ t('textLabel.status') }}</label>
                    <select v-model="recipientForm.notiStatus" class="form-select">
                        <option value="SCHEDULED">{{ t('status.scheduled') }}</option>
                        <option value="SENT">{{ t('status.sent') }}</option>
                        <option value="FAILED">{{ t('status.failed') }}</option>
                    </select>
                </div>
                <div class="d-grid mt-4">
                    <button type="button" class="btn btn-primary" @click="saveRecipientManual">
                        {{ editingRecipientIndex >= 0 ? t('button.save') : t('button.add') }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.font-monospace {
    font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    font-size: 0.875rem;
}
</style>
