<script setup lang="ts">
import { onMounted, h, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { createColumnHelper } from '@tanstack/vue-table';
import { useApi } from '~/composables/useApi';
import { useDataTable } from '~/composables/useDataTable';
import { useAuthStore } from '~/stores/auth';
import type { CompanySimplePayload } from '~/features/company/interfaces/company.interfaces';
import BaseTable from '~/components/table/BaseTable.vue';
import BaseGridView from '~/components/table/BaseGridView.vue';

const router = useRouter();
const { t } = useI18n();
const auth = useAuthStore();
const viewMode = ref<'list' | 'grid'>('grid'); // Default to grid as it was before
const { get, data: companies, loading } = useApi<CompanySimplePayload[]>();

const companiesData = computed(() => companies.value || []);
const columnHelper = createColumnHelper<CompanySimplePayload>();

const goToHistoryList = (companyIdParam: number) => {
    router.push({ name: 'notificationhistorylist', params: { companyIdParam } });
};

const toggleViewMode = (mode: 'list' | 'grid') => {
    viewMode.value = mode;
};

const columns = [
    columnHelper.accessor('companyId', {
        header: () => t('textLabel.number'),
        cell: info => info.getValue(),
        meta: { className: 'd-none d-md-table-cell' }
    }),
    columnHelper.accessor('companyName', {
        header: () => t('textLabel.company', 2),
        cell: info => info.getValue(),
    }),
    columnHelper.display({
        id: 'actions',
        header: () => t('textLabel.action'),
        cell: info => h('button', {
            class: 'btn btn-primary btn-sm',
            onClick: () => goToHistoryList(info.row.original.companyId)
        }, t('button.view'))
    }),
];

const { table, globalFilter } = useDataTable(companiesData, columns);

const fetchData = async () => {
    await get('/v0/user/companies/list/companyId/' + auth.user?.company.companyId + "/userId/" + auth.user?.id);
};

onMounted(fetchData);
</script>

<template>
    <div class="card mb-3 border-0 shadow-sm">
        <div class="card-body">
            <div class="row d-flex justify-content-between align-items-center mb-4">
                <div class="col-auto">
                    <h4 class="mb-0">{{ t('history.selectCompanyTitle') }}</h4>
                </div>
                <div class="col-auto d-flex gap-2">
                    <div class="btn-group" role="group">
                        <button 
                            type="button" 
                            class="btn btn-outline-primary btn-sm"
                            :class="{ active: viewMode === 'list' }"
                            @click="toggleViewMode('list')"
                        >
                            <i class="fa fa-list"></i>
                        </button>
                        <button 
                            type="button" 
                            class="btn btn-outline-primary btn-sm"
                            :class="{ active: viewMode === 'grid' }"
                            @click="toggleViewMode('grid')"
                        >
                            <i class="fa fa-th-large"></i>
                        </button>
                    </div>
                    <div style="width: 200px;">
                        <input v-model="globalFilter" type="text" class="form-control form-control-sm" :placeholder="t('button.search') + '...'">
                    </div>
                </div>
            </div>
            <div v-if="loading" class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
            <div v-else>
                <BaseTable v-if="viewMode === 'list'" :table="table" />
                <BaseGridView v-else :table="table">
                    <template #item="{ row }">
                        <div class="card h-100 border-0 shadow-sm hover-shadow transition-all" @click="goToHistoryList(row.original.companyId)" style="cursor: pointer;">
                            <div class="card-body text-center py-4">
                                <div class="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width: 60px; height: 60px;">
                                    <i class="fas fa-building text-primary fs-3"></i>
                                </div>
                                <h5 class="card-title text-truncate">{{ row.original.companyName }}</h5>
                                <p class="card-text text-muted small text-truncate">{{ row.original.companyEmail }}</p>
                                <button class="btn btn-outline-primary btn-sm mt-2">{{ t('history.selectCompanyButton') }}</button>
                            </div>
                        </div>
                    </template>
                </BaseGridView>
            </div>
        </div>
    </div>
</template>

<style scoped>
.hover-shadow:hover {
    box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
    transform: translateY(-2px);
}
.transition-all {
    transition: all 0.2s ease-in-out;
}
</style>
