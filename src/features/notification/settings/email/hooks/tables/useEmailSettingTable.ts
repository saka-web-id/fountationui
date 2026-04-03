import { computed, h } from 'vue'
import { createColumnHelper } from '@tanstack/vue-table'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useApi } from "~/composables/useApi.ts"
import { useDataTable } from '~/composables/useDataTable.ts'
import { useAuthStore } from '~/stores/auth.ts'
import type { ProviderPayload } from "~/features/notification/providers/interfaces/provider.payload.ts";

export interface Provider {
    providerId: number;
    providerCompanyId: number;
    providerName: string;
    providerType: string;
    providerSlug: string;
    providerIsActive: boolean;
    providerPriority: number;
    providerCreatedAt: string;
}

export function useEmailSettingTable(companyIdParam: string | string[]) {
    const { t } = useI18n()
    const router = useRouter()
    const auth = useAuthStore()

    // API State
    const { data, get } = useApi<ProviderPayload[]>()

    const companies = computed(() => data.value || [])
    const columnHelper = createColumnHelper<ProviderPayload>()

    // Helper functions for navigation
    const goToEdit = (providerIdParam: number, companyIdParam: string | string[]) => {
        router.push({ name: 'notificationdetaileditemail', params: { companyIdParam, providerIdParam } });
    };

    const onTestNotification = (providerIdParam: number, companyIdParam: string | string[]) => {
        router.push({ name: 'notificationtestemail', params: { companyIdParam, providerIdParam } });
    };

    // Column Definitions
    const columns = [
        columnHelper.accessor('providerId', {
            header: () => t('textLabel.number'),
            cell: info => info.getValue(),
            meta: { className: 'd-none d-md-table-cell' }
        }),
        columnHelper.accessor('providerName', {
            header: () => t('textLabel.name', 2),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('providerType', {
            header: () => t('textLabel.type'),
            cell: info => info.getValue(),
            meta: { className: 'd-none d-md-table-cell' }
        }),
        columnHelper.accessor('providerEngine', {
            header: () => t('textLabel.engine'),
            cell: info => info.getValue(),
            meta: { className: 'd-none d-md-table-cell' }
        }),
        columnHelper.accessor('providerPriority', {
            header: () => t('textLabel.priority'),
            cell: info => info.getValue(),
            meta: { className: 'd-none d-md-table-cell' }
        }),
        columnHelper.accessor('providerCreatedAt', {
            header: () => t('textLabel.dateCreated'),
            cell: info => info.getValue(),
            meta: { className: 'd-none d-md-table-cell' }
        }),
        columnHelper.display({
            id: 'actions',
            header: () => t('textLabel.action'),
            cell: info => h('div', { class: 'btn-group', role: 'group' }, [
                // Button View / Edit
                h('button', {
                    class: 'btn btn-sm btn-primary',
                    onClick: () => goToEdit(info.row.original.providerId, companyIdParam)
                }, t('button.view')),

                // Button Test Notification
                h('button', {
                    class: 'btn btn-warning btn-sm',
                    onClick: () => onTestNotification(info.row.original.providerId, companyIdParam)
                }, t('button.test'))
            ]),
        }),
    ]

    const { table, globalFilter } = useDataTable(companies, columns)

    const fetchData = async () => {
        await get(`/v0/notification/provider/list/companyId/${auth.user?.company.companyId}/userId/${auth.user?.id}/valueCompanyId/${companyIdParam}/notificationType/EMAIL`)
    }

    return {
        table,
        globalFilter,
        fetchData,
        t
    }
}
