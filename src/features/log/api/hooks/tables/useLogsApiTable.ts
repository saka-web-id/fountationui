import { computed, h, ref, watch } from 'vue'
import { createColumnHelper } from '@tanstack/vue-table'
import { useI18n } from 'vue-i18n'
import { useDataTable } from '~/composables/useDataTable'
import { useAuthStore } from '~/stores/auth'
import { getLogsApi, getLogApiDetail, type LogsApi } from '~/services/log/api/LogsApiService.ts'
import { Offcanvas } from 'bootstrap'

export function useLogsApiTable() {
    const { t } = useI18n()
    const auth = useAuthStore()

    const logs = ref<LogsApi[]>([])
    const totalItems = ref(0)
    const loading = ref(false)

    const filterEndpoint = ref('')
    const filterDateFrom = ref(new Date().toISOString().split('T')[0])
    const filterDateTo = ref(new Date().toISOString().split('T')[0])

    const selectedLog = ref<LogsApi | null>(null)
    const detailLoading = ref(false)
    let offcanvasInstance: Offcanvas | null = null

    const paginationState = ref({
        pageIndex: 0,
        pageSize: 10,
    })

    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleString()
    }

    const columnHelper = createColumnHelper<LogsApi>()

    const columns = [
        columnHelper.accessor('logEndPoint', {
            header: () => t('textLabel.endpoint'),
            cell: info => h('code', info.getValue()),
        }),
        columnHelper.accessor('logMethod', {
            header: () => t('textLabel.method'),
            cell: info => h('span', { class: 'badge bg-primary' }, info.getValue()),
            meta: { className: 'd-none d-md-table-cell' }
        }),
        columnHelper.accessor('logStatusCode', {
            header: () => t('textLabel.statusCode'),
            cell: info => h('span', {
                class: ['badge', info.getValue() < 400 ? 'bg-success' : 'bg-danger']
            }, info.getValue()),
            meta: { className: 'd-none d-md-table-cell' }
        }),
        columnHelper.accessor('logExecutionTime', {
            header: () => t('textLabel.executionTime'),
            cell: info => `${info.getValue()} ms`,
            meta: { className: 'd-none d-md-table-cell' }
        }),
        columnHelper.accessor('logCreatedAt', {
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
                    showDetail(info.row.original.logId);
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
        if (!auth.user) return;
        loading.value = true;
        try {
            const response = await getLogsApi(auth.user.company.companyId, auth.user.id, {
                endpoint: filterEndpoint.value,
                dateFrom: filterDateFrom.value,
                dateTo: filterDateTo.value,
                page: paginationState.value.pageIndex,
                size: paginationState.value.pageSize
            });
            logs.value = response.logApiData;
            totalItems.value = response.logApiTotalItems;
        } catch (error) {
            console.error("Failed to fetch logs:", error);
        } finally {
            loading.value = false;
        }
    };

    const showDetail = async (id: number) => {
        if (!auth.user) return;
        detailLoading.value = true;
        selectedLog.value = null;

        const element = document.getElementById('logApiDetailOffcanvas');
        if (element) {
            // Check if instance already exists to avoid memory leaks or re-initialization issues
            // Although Bootstrap handles it, it's good practice. 
            // Here we just create new one as in original code, but we might need to dispose old one if we were storing it strictly.
            // For now sticking to original logic but inside hook.
            offcanvasInstance = new Offcanvas(element);
            offcanvasInstance.show();
        }

        try {
            selectedLog.value = await getLogApiDetail(auth.user.company.companyId, auth.user.id, id);
        } catch (error) {
            console.error("Failed to fetch log detail:", error);
        } finally {
            detailLoading.value = false;
        }
    };

    watch([filterEndpoint, filterDateFrom, filterDateTo], () => {
        paginationState.value.pageIndex = 0; // Reset to first page on filter change
        fetchLogs();
    });
    
    watch(() => paginationState.value.pageSize, () => {
         paginationState.value.pageIndex = 0;
         fetchLogs();
    });

    watch(() => paginationState.value.pageIndex, fetchLogs);

    return {
        table,
        loading,
        filterEndpoint,
        filterDateFrom,
        filterDateTo,
        selectedLog,
        detailLoading,
        fetchLogs,
        showDetail,
        formatDate,
        t
    }
}
