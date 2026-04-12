import { computed, h, ref } from 'vue'
import { createColumnHelper, type PaginationState } from '@tanstack/vue-table'
import { useI18n } from 'vue-i18n'
import { useApi } from "~/composables/useApi"
import { useDataTable } from '~/composables/useDataTable'
import { useAuthStore } from '~/stores/auth'
import type { NotificationSimpleDTO, NotificationPageDTO } from '../../interfaces/notificationHistory.types.ts'
import dayjs from 'dayjs'

export function useNotificationHistoryTable(valueCompanyId: number) {
    const { t } = useI18n()
    const auth = useAuthStore()
    const { get, data: pageData, loading } = useApi<NotificationPageDTO>()
    const selectedNotificationId = ref<number | null>(null)

    const notifications = computed(() => pageData.value?.notificationData || [])
    const columnHelper = createColumnHelper<NotificationSimpleDTO>()

    const columns = [
        columnHelper.accessor('notiId', {
            header: () => t('textLabel.number'),
            cell: info => info.getValue(),
            meta: { className: 'd-none d-md-table-cell' }
        }),
        columnHelper.accessor('notiRecipientAddress', {
            header: () => t('campaign.recipients'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('notiStatus', {
            header: () => t('textLabel.status'),
            cell: info => h('span', { class: 'badge bg-light text-dark' }, t(`status.${info.getValue().toLowerCase()}`)),
        }),
        columnHelper.accessor('notiCreatedAt', {
            header: () => t('textLabel.date'),
            cell: info => dayjs(info.getValue()).format('YYYY-MM-DD HH:mm:ss'),
            meta: { className: 'd-none d-md-table-cell' }
        }),
        columnHelper.display({
            id: 'actions',
            header: () => t('textLabel.action'),
            cell: info => h('button', {
                class: 'btn btn-outline-info btn-sm',
                'data-bs-toggle': 'offcanvas',
                'data-bs-target': '#offcanvasHistoryDetail',
                onClick: () => {
                    selectedNotificationId.value = info.row.original.notiId
                }
            }, t('button.view'))
        })
    ]

    const paginationState = ref<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })

    const { table, globalFilter, pagination } = useDataTable(notifications, columns, {
        pagination: paginationState,
        manualPagination: true,
        get pageCount() { 
            return Math.ceil((pageData.value?.notificationTotalItems || 0) / (paginationState.value.pageSize || 10)) 
        }
    })

    const fetchHistory = async (campaignId: number, dateFrom: string, dateTo: string) => {
        const userId = auth.user?.id
        const page = pagination.value.pageIndex
        const size = pagination.value.pageSize
        
        await get(`/v0/notification/search/companyId/${auth.user?.company.companyId}/userId/${userId}/valueCompanyId/${valueCompanyId}/campaignId/${campaignId}?dateFrom=${dateFrom}&dateTo=${dateTo}&page=${page}&size=${size}`)
    }

    return {
        table,
        globalFilter,
        pagination,
        fetchHistory,
        loading,
        selectedNotificationId,
        t
    }
}
