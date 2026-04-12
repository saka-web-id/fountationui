<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '~/stores/auth';
import axios from 'axios';
import { useNotificationHistoryTable } from '~/features/notification/history/hooks/tables/useNotificationHistoryTable.ts';
import HistoryFilter from '~/features/notification/history/components/NotificationHistoryFilterContent.vue';
import HistoryOffcanvas from '~/features/notification/history/components/NotificationHistoryOffcanvas.vue';
import BaseTable from '~/components/table/BaseTable.vue';
import SidebarDashboard from '~/layouts/sidebar/SidebarDashboard.vue';
import HeaderDashboard from '~/layouts/headers/HeaderDashboard.vue';
import type { HistoryFilterValues } from '~/features/notification/history/interfaces/notificationHistory.types.ts';

const route = useRoute();
const { t } = useI18n();
const auth = useAuthStore();
const companyIdParam = Number(route.params.companyIdParam);

const { 
    table, 
    fetchHistory, 
    loading, 
    pagination, 
    selectedNotificationId 
} = useNotificationHistoryTable(companyIdParam);

const currentFilter = ref<HistoryFilterValues | null>(null);

const handleFilter = (filters: HistoryFilterValues) => {
    currentFilter.value = filters;
    pagination.value.pageIndex = 0; // Reset to first page
    triggerFetch();
};

const triggerFetch = () => {
    if (currentFilter.value?.campaignId) {
        fetchHistory(
            currentFilter.value.campaignId,
            currentFilter.value.dateFrom,
            currentFilter.value.dateTo
        );
    }
};

watch(() => pagination.value.pageIndex, triggerFetch);
watch(() => pagination.value.pageSize, () => {
    pagination.value.pageIndex = 0;
    triggerFetch();
});

const downloadCSV = async () => {
    if (!currentFilter.value?.campaignId) {
        alert(t('history.alertFilter'));
        return;
    }

    const userId = auth.user?.id;
    const { campaignId, dateFrom, dateTo } = currentFilter.value;
    
    try {
        // Fetch all data (using a large size to get everything as requested)
        const response = await axios.get(`/api/v0/notification/search/companyId/${auth.user?.company.companyId}/userId/${userId}/campaignId/${campaignId}`, {
            params: { dateFrom, dateTo, page: 0, size: 10000 },
            withCredentials: true
        });

        const data = response.data.notificationData || [];
        if (data.length === 0) {
            alert(t('textLabel.noData'));
            return;
        }

        const headers = ['ID', 'Recipient', 'Status', 'Error Message', 'Created At'];
        const csvContent = [
            headers.join(','),
            ...data.map((item: any) => [
                item.notiId,
                `"${item.notiRecipientAddress}"`,
                item.notiStatus,
                `"${item.notiErrorMessage || ''}"`,
                item.notiCreatedAt
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `notification_history_${campaignId}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (e) {
        console.error("Download failed", e);
        alert(t('history.alertDownloadFailed'));
    }
};
</script>

<template>
    <div id="wrapper">
        <SidebarDashboard />
        <HeaderDashboard />
        <section class="pt-2 pb-2">
            <div class="container">
                <ol class="breadcrumb ms-2 me-2">
                    <li class="breadcrumb-item"><router-link to="/dashboard"><span>{{ t('textLabel.dashboard') }}</span></router-link></li>
                    <li class="breadcrumb-item"><router-link to="/notification/history"><span>{{ t('textLabel.history') }}</span></router-link></li>
                    <li class="breadcrumb-item active"><span class="active">{{ t('history.campaignList') }}</span></li>
                </ol>

                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="mb-0">{{ t('history.listTitle') }}</h4>
                    <button class="btn btn-outline-success btn-sm" @click="downloadCSV" :disabled="!currentFilter?.campaignId || loading">
                        <i class="fas fa-download me-1"></i> {{ t('history.exportCsv') }}
                    </button>
                </div>

                <HistoryFilter :companyId="companyIdParam" @filter="handleFilter" />

                <div class="card border-0 shadow-sm">
                    <div class="card-body">
                        <div v-if="loading" class="text-center py-5">
                            <div class="spinner-border text-primary" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                        <div v-else-if="currentFilter?.campaignId">
                            <BaseTable :table="table" />
                        </div>
                        <div v-else class="text-center py-5 text-muted">
                            <i class="fas fa-info-circle me-2"></i> {{ t('history.selectPrompt') }}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <HistoryOffcanvas :notificationId="selectedNotificationId" :companyId="companyIdParam" />
    </div>
</template>

<style scoped>
</style>
