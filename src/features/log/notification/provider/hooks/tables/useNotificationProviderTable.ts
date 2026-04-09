import { computed, h, ref, watch } from 'vue'
import { createColumnHelper } from '@tanstack/vue-table'
import { useI18n } from 'vue-i18n'
import { useDataTable } from '~/composables/useDataTable'
import { useAuthStore } from '~/stores/auth'
import { 
    getLogsProviderNotificationList, 
    getLogsProviderNotificationDetail 
} from '../../api/notificationProvider.service'
import { mapDetailToUI } from '../../api/notificationProvider.mapper'
import type { 
    LogsProviderNotificationSimple, 
    LogsProviderNotificationDetail 
} from '../../interfaces/notificationProvider.interface'
import { Offcanvas } from 'bootstrap'

export function useNotificationProviderTable(filters: any) {
    const { t } = useI18n()
    const auth = useAuthStore()

    const logs = ref<LogsProviderNotificationSimple[]>([])
    const totalItems = ref(0)
    const loading = ref(false)

    const selectedLog = ref<LogsProviderNotificationDetail | null>(null)
    const detailLoading = ref(false)
    let offcanvasInstance: Offcanvas | null = null

    const paginationState = ref({
        pageIndex: 0,
        pageSize: filters.value.size || 10,
    })

    const formatDate = (timestamp: string | number) => {
        return new Date(timestamp).toLocaleString()
    }

    const columnHelper = createColumnHelper<LogsProviderNotificationSimple>()

    const columns = [
        columnHelper.accessor('id', {
            header: () => 'Log ID',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('notificationId', {
            header: () => 'Notification ID',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('executionTime', {
            header: () => t('textLabel.executionTime'),
            cell: info => `${info.getValue()} ms`,
            meta: { className: 'd-none d-md-table-cell' }
        }),
        columnHelper.accessor('createdAt', {
            header: () => t('textLabel.createdAt'),
            cell: info => formatDate(info.getValue()),
            meta: { className: 'd-none d-md-table-cell' }
        }),
        columnHelper.display({
            id: 'actions',
            header: () => t('textLabel.action'),
            cell: info => h('button', {
                class: 'btn btn-primary btn-sm',
                onClick: (e: Event) => {
                    e.stopPropagation();
                    showDetail(info.row.original.id);
                }
            }, [
                h('i', { class: 'bi bi-eye me-1' }),
                t('button.view')
            ]),
        }),
    ]

    const { table } = useDataTable(logs, columns, {
        manualPagination: true,
        pageCount: computed(() => Math.ceil(totalItems.value / paginationState.value.pageSize)) as unknown as number,
        state: {
            pagination: paginationState.value
        },
        onPaginationChange: (updater) => {
            if (typeof updater === 'function') {
                paginationState.value = updater(paginationState.value);
            } else {
                paginationState.value = updater;
            }
        }
    })

    const fetchLogs = async () => {
        if (!auth.user || !filters.value.providerId) {
            logs.value = [];
            totalItems.value = 0;
            return;
        }
        loading.value = true;
        try {
            const response = await getLogsProviderNotificationList(
                auth.user.company.companyId ?? 0,
                auth.user.id ?? 0,
                filters.value.providerId,
                {
                    dateFrom: filters.value.dateFrom,
                    dateTo: filters.value.dateTo,
                    page: paginationState.value.pageIndex,
                    size: paginationState.value.pageSize
                }
            );
            logs.value = response.logProviderNotificationData;
            totalItems.value = response.logProviderNotificationTotalItems;
        } catch (error) {
            console.error("Failed to fetch notification provider logs:", error);
            logs.value = [];
            totalItems.value = 0;
        } finally {
            loading.value = false;
        }
    };

    const showDetail = async (id: number) => {
        if (!auth.user) return;
        detailLoading.value = true;
        selectedLog.value = null;

        const element = document.getElementById('logNotificationProviderDetailOffcanvas');
        if (element) {
            offcanvasInstance = new Offcanvas(element);
            offcanvasInstance.show();
        }

        try {
            const data = await getLogsProviderNotificationDetail(
                auth.user.company.companyId ?? 0,
                auth.user.id ?? 0,
                id
            );
            selectedLog.value = mapDetailToUI(data);
        } catch (error) {
            console.error("Failed to fetch log detail:", error);
        } finally {
            detailLoading.value = false;
        }
    };

    // Watch filters and pagination
    watch([() => filters.value.providerId, () => filters.value.dateFrom, () => filters.value.dateTo], () => {
        paginationState.value.pageIndex = 0;
        fetchLogs();
    });

    watch(() => paginationState.value.pageSize, (newSize) => {
        paginationState.value.pageIndex = 0;
        filters.value.size = newSize; // Update filter size if needed
        fetchLogs();
    });

    watch(() => paginationState.value.pageIndex, fetchLogs);
    
    // Sync filter size with pagination size if changed from outside
    watch(() => filters.value.size, (newSize) => {
        if (newSize !== paginationState.value.pageSize) {
            paginationState.value.pageSize = newSize;
            paginationState.value.pageIndex = 0;
            fetchLogs();
        }
    });

    return {
        table,
        loading,
        selectedLog,
        detailLoading,
        fetchLogs,
        showDetail,
        formatDate,
        paginationState,
        t
    }
}
