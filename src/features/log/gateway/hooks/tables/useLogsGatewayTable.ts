import { computed, h, ref, watch } from 'vue'
import { createColumnHelper } from '@tanstack/vue-table'
import { useI18n } from 'vue-i18n'
import { useDataTable } from '~/composables/useDataTable'
import { useAuthStore } from '~/stores/auth'
import { getLogsGateway, getLogGatewayDetail, type LogsGateway } from '~/services/log/gateway/LogsGatewayService.ts'
import { Offcanvas } from 'bootstrap'

export function useLogsGatewayTable() {
    const { t } = useI18n()
    const auth = useAuthStore()

    const logs = ref<LogsGateway[]>([])
    const totalItems = ref(0)
    const loading = ref(false)

    const filterEndpoint = ref('')
    const filterDateFrom = ref(new Date().toISOString().split('T')[0])
    const filterDateTo = ref(new Date().toISOString().split('T')[0])

    const selectedLog = ref<LogsGateway | null>(null)
    const detailLoading = ref(false)
    let offcanvasInstance: Offcanvas | null = null

    const paginationState = ref({
        pageIndex: 0,
        pageSize: 10,
    })

    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleString()
    }

    const columnHelper = createColumnHelper<LogsGateway>()

    const columns = [
        columnHelper.accessor('logGatewayEndPoint', {
            header: () => t('textLabel.endpoint'),
            cell: info => h('code', info.getValue()),
        }),
        columnHelper.accessor('logGatewayMethod', {
            header: () => h('span', { class: 'd-none d-md-inline' }, t('textLabel.method')),
            cell: info => h('span', { class: 'd-none d-md-inline badge bg-info text-dark' }, info.getValue()),
            meta: { className: 'd-none d-md-table-cell' }
        }),
        columnHelper.accessor('logGatewayStatusCode', {
            header: () => t('textLabel.statusCode'),
            cell: info => h('span', {
                class: ['badge', info.getValue() < 400 ? 'bg-success' : 'bg-danger']
            }, info.getValue()),
        }),
        columnHelper.accessor('logGatewayExecutionTime', {
            header: () => h('span', { class: 'd-none d-md-inline' }, t('textLabel.executionTime')),
            cell: info => h('span', { class: 'd-none d-md-inline ' }, info.getValue()),
            meta: { className: 'd-none d-md-table-cell' }
        }),
        columnHelper.accessor('logGatewayCreatedAt', {
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
                    showDetail(info.row.original.logGatewayId);
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
            const response = await getLogsGateway(auth.user.company.companyId ?? 0, auth.user.id ?? 0, {
                endpoint: filterEndpoint.value,
                dateFrom: filterDateFrom.value,
                dateTo: filterDateTo.value,
                page: paginationState.value.pageIndex,
                size: paginationState.value.pageSize
            });
            logs.value = response.logGatewayData;
            totalItems.value = response.logGatewayTotalItems;
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

        const element = document.getElementById('logDetailOffcanvas');
        if (element) {
            offcanvasInstance = new Offcanvas(element);
            offcanvasInstance.show();
        }

        try {
            selectedLog.value = await getLogGatewayDetail(auth.user.company.companyId ?? 0, auth.user.id ?? 0, id);
        } catch (error) {
            console.error("Failed to fetch log detail:", error);
        } finally {
            detailLoading.value = false;
        }
    };

    watch([filterEndpoint, filterDateFrom, filterDateTo], () => {
        paginationState.value.pageIndex = 0;
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
