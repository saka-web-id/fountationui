import { computed, h } from 'vue'
import { createColumnHelper } from '@tanstack/vue-table'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useApi } from "~/composables/useApi"
import { useDataTable } from '~/composables/useDataTable'
import { useAuthStore } from '~/stores/auth'

export interface Permission {
    permissionId: number;
    permissionName: string;
    permissionResource: string;
    permissionAction: string;
    permissionDescription: string;
}

export function usePermissionTable() {
    const { t } = useI18n()
    const router = useRouter()
    const auth = useAuthStore()

    // API State
    const { data, get } = useApi<Permission[]>()

    const permissions = computed(() => data.value || [])
    const columnHelper = createColumnHelper<Permission>()

    // Column Definitions
    const columns = [
        columnHelper.accessor('permissionName', {
            header: () => t('textLabel.name'),
            cell: info => h('span', { class: 'fw-bold' }, info.getValue()),
        }),
        columnHelper.accessor('permissionResource', {
            header: () => t('textLabel.resource'),
            cell: info => h('code', info.getValue()),
            meta: { className: 'd-none d-md-table-cell' }
        }),
        columnHelper.accessor('permissionAction', {
            header: () => t('textLabel.action'),
            cell: info => h('span', { class: 'badge bg-secondary' }, info.getValue()),
            meta: { className: 'd-none d-md-table-cell' }
        }),
        columnHelper.accessor('permissionDescription', {
            header: () => h('span', { class: 'd-none d-md-inline' }, t('textLabel.description')),
            cell: info => h('span', { class: 'd-none d-md-inline' }, info.getValue()),
            meta: { className: 'd-none d-md-table-cell' }
        }),
        columnHelper.display({
            id: 'actions',
            header: () => t('textLabel.action'),
            cell: info => h('div', { class: 'btn-group', role: 'group' }, [
                h('button', {
                    class: 'btn btn-primary btn-sm',
                    onClick: () => router.push({ name: 'permissionedit', params: { permissionIdParam: info.row.original.permissionId } })
                }, [
                    h('i', { class: 'bi bi-pencil-square me-1' }),
                    t('button.edit')
                ])
            ]),
        }),
    ]

    const { table, globalFilter } = useDataTable(permissions, columns, {
        initialState: {
            sorting: [{ id: 'permissionName', desc: false }]
        }
    })

    const fetchData = async () => {
        await get('/v0/authorization/permission/list/companyId/' + auth.user?.company.companyId + "/userId/" + auth.user?.id);
    }

    return {
        table,
        globalFilter,
        fetchData,
        t
    }
}
