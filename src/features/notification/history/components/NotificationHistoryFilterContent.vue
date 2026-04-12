<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '~/stores/auth';
import { useApi } from '~/composables/useApi';
import type { NotificationCampaignDTO } from '../interfaces/notificationHistory.types.ts';
import { useNotificationHistoryFilter } from '../hooks/forms/useNotificationHistoryFilter.ts';
import debounce from 'lodash.debounce';

const emit = defineEmits(['filter']);

const props = defineProps<{
    companyId: number;
}>();

const { t } = useI18n();
const auth = useAuthStore();
const { get, data: campaigns } = useApi<NotificationCampaignDTO[]>();

const {
    campaignName,
    dateFrom,
    dateTo,
    handleSubmit,
    setFieldValue
} = useNotificationHistoryFilter();

const searchCampaigns = debounce(async (query: string) => {
    if (query.length < 3) {
        campaigns.value = [];
        return;
    }
    const userId = auth.user?.id;
    await get(`/v0/notification/campaign/list/companyId/${auth.user?.company.companyId}/userId/${userId}/valueCompanyId/${props.companyId}/campaignName/${query}`);
}, 500);

watch(campaignName, (newVal) => {
    if (typeof newVal === 'string') {
        searchCampaigns(newVal);
    }
});

const selectCampaign = (campaign: NotificationCampaignDTO) => {
    setFieldValue('campaignId', campaign.notiCampaignId);
    setFieldValue('campaignName', campaign.notiCampaignTitle);
    campaigns.value = [];
};

const onSubmit = handleSubmit((values) => {
    emit('filter', values);
});

onMounted(() => {
    // Optional: auto-trigger search or leave empty
});
</script>

<template>
    <div class="card mb-4 border-0 shadow-sm">
        <div class="card-body">
            <form @submit.prevent="onSubmit" class="row g-3 align-items-end">
                <div class="col-md-4 position-relative">
                    <label class="form-label small">{{ t('campaign.title') }}</label>
                    <input 
                        v-model="campaignName" 
                        type="text" 
                        class="form-control form-control-sm" 
                        :placeholder="t('history.searchPlaceholder')"
                        autocomplete="off"
                    >
                    <ul v-if="campaigns && campaigns.length > 0" class="dropdown-menu show w-100 shadow-sm overflow-auto" style="max-height: 200px;">
                        <li v-for="c in campaigns" :key="c.notiCampaignId">
                            <a class="dropdown-item small" href="#" @click.prevent="selectCampaign(c)">
                                {{ c.notiCampaignTitle }}
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="col-md-3">
                    <label class="form-label small">{{ t('textLabel.dateFrom') }}</label>
                    <input v-model="dateFrom" type="date" class="form-control form-control-sm">
                </div>
                <div class="col-md-3">
                    <label class="form-label small">{{ t('textLabel.dateTo') }}</label>
                    <input v-model="dateTo" type="date" class="form-control form-control-sm">
                </div>
                <div class="col-md-2">
                    <button type="submit" class="btn btn-primary btn-sm w-100">
                        <i class="fas fa-search me-1"></i> {{ t('button.search') }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
.dropdown-menu {
    top: 100%;
    left: 0;
    z-index: 1050;
}
</style>
