<script setup lang="ts">
import { watch } from 'vue';
import { useApi } from '~/composables/useApi';
import { useAuthStore } from '~/stores/auth';
import { useI18n } from 'vue-i18n';
import type { NotificationHistoryDTO } from '../interfaces/notificationHistory.types.ts';

const props = defineProps<{
    notificationId: number | null;
    companyId: number;
}>();

const { t } = useI18n();
const auth = useAuthStore();
const { get, data: historyList, loading } = useApi<NotificationHistoryDTO[]>();

watch(() => props.notificationId, (newId) => {
    if (newId) {
        fetchHistory(newId);
    }
});

const fetchHistory = async (notificationId: number) => {
    const userId = auth.user?.id;
    await get(`/v0/notification/history/list/companyId/${auth.user?.company.companyId}/userId/${userId}/notificationId/${notificationId}`);
};
</script>

<template>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasHistoryDetail" aria-labelledby="offcanvasHistoryDetailLabel">
        <div class="offcanvas-header border-bottom">
            <h5 id="offcanvasHistoryDetailLabel">{{ t('history.detailTitle') }}</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <div v-if="loading" class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
            <div v-else-if="historyList && historyList.length > 0">
                <div v-for="history in historyList" :key="history.notiHistoryId" class="card mb-3 border-0 shadow-sm">
                    <div class="card-body">
                        <h6 class="card-subtitle mb-2 text-muted">{{ history.notiHistoryEventName }}</h6>
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <span class="badge" :class="history.notiHistoryStatus === 'COMPLETED' ? 'bg-success' : 'bg-secondary'">
                                {{ history.notiHistoryStatus }}
                            </span>
                        </div>
                        <div v-if="history.notiHistoryMetadata" class="mt-2">
                            <label class="small text-muted d-block">{{ t('campaign.metadata') }}:</label>
                            <pre class="bg-light p-2 rounded small mb-0">{{ JSON.stringify(history.notiHistoryMetadata, null, 2) }}</pre>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="text-center py-5 text-muted">
                {{ t('history.noData') }}
            </div>
        </div>
    </div>
</template>

<style scoped>
pre {
    max-height: 200px;
    overflow-y: auto;
    font-size: 0.75rem;
}
</style>
