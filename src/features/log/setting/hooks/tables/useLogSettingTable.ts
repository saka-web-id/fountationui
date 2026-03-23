import { computed, h } from 'vue'
import { createColumnHelper } from '@tanstack/vue-table'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useApi } from "~/composables/useApi"
import { useDataTable } from '~/composables/useDataTable'
import { useAuthStore } from '~/stores/auth'

export interface LogSetting {
    logSettingId: number;
    logSettingEndpoint: string;
    logSettingMethod: string;
    logSettingLogFormat: string;
    logSettingEnabled: boolean;
}

export function useLogSettingTable(companyIdParam: string | string[]) {
    const { t } = useI18n()
    const router = useRouter()
    const auth = useAuthStore()

    // API State
    const { data, get } = useApi<LogSetting[]>()

    const settings = computed(() => data.value || [])
    const columnHelper = createColumnHelper<LogSetting>()

    // Column Definitions
    const columns = [
        columnHelper.accessor('logSettingEndpoint', {
            header: () => t('textLabel.endpoint'),
            cell: info => h('code', info.getValue()),
        }),
        columnHelper.accessor('logSettingMethod', {
            header: () => t('textLabel.method'),
            cell: info => h('span', { class: 'badge bg-secondary' }, info.getValue()),
            meta: { className: 'd-none d-md-table-cell' }
        }),
        columnHelper.accessor('logSettingLogFormat', {
            header: () => t('textLabel.logFormat'),
        }),
        columnHelper.accessor('logSettingEnabled', {
            header: () => t('textLabel.enabled'),
            cell: info => h('span', { class: info.getValue() ? 'text-success' : 'text-danger' },
                info.getValue() ? t('textLabel.true') : t('textLabel.false')
            ),
            meta: { className: 'd-none d-md-table-cell' }
        }),
        columnHelper.display({
            id: 'actions',
            header: () => t('textLabel.action'),
            cell: info => h('div', { class: 'btn-group', role: 'group' }, [
                h('button', {
                    class: 'btn btn-primary btn-sm',
                    onClick: () => goToEdit(info.row.original.logSettingId)
                }, [
                    h('i', { class: 'bi bi-pencil-square me-1' }),
                    t('button.edit')
                ])
            ]),
        }),
    ]

    const { table, globalFilter } = useDataTable(settings, columns)

    const fetchData = async () => {
        try {
            if (auth.user && companyIdParam) {
                await get(`/v0/logs/setting/list/companyId/${auth.user.company.companyId}/userId/${auth.user.id}/valueCompanyId/${companyIdParam}`);
            }
        } catch (error) {
            console.error("Fetch failed:", error);
        }
    }

    const goToEdit = (logSettingIdParam: number) => {
        router.push({ name: 'logsettingedit', params: { companyIdParam: companyIdParam as string, logSettingIdParam } });
    };

    return {
        table,
        globalFilter,
        fetchData,
        t
    }
}
