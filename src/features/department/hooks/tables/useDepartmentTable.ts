import { computed, h } from 'vue'
import { createColumnHelper } from '@tanstack/vue-table'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useApi } from "~/composables/useApi"
import { useDataTable } from '~/composables/useDataTable'
import { useAuthStore } from '~/stores/auth'

export interface Department {
    departmentId: number;
    departmentName: string;
    departmentDescription: string;
    companyId: number;
}

export function useDepartmentTable(companyId: string) {
    const { t } = useI18n()
    const router = useRouter()
    const auth = useAuthStore()

    // API State
    const { data, get } = useApi<Department[]>()
    const { data: companyData, get: getCompany } = useApi()

    const departments = computed(() => data.value || [])
    const columnHelper = createColumnHelper<Department>()

    // Helper functions for navigation
    const goToEdit = (paramCompanyId: number, paramDepartmentId: number) => {
        router.push({ name: 'departmentedit', params: { paramCompanyId, paramDepartmentId } });
    };

    const goToUsers = (companyId: number, departmentId: number) => {
        router.push({ name: 'departmentusers', params: { companyIdParam: companyId, departmentIdParam: departmentId } });
    }

    // Column Definitions
    const columns = [
        columnHelper.accessor('departmentId', {
            header: () => h('span', { class: 'd-none d-md-inline' }, t('textLabel.number')),
            cell: info => h('span', { class: 'd-none d-md-inline' }, info.getValue()),
            meta: { className: 'd-none d-md-table-cell' }
        }),
        columnHelper.accessor('departmentName', {
            header: () => t('textLabel.department', 2),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('departmentDescription', {
            header: () => h('span', { class: 'd-none d-md-inline' }, t('textLabel.description')),
            cell: info => h('span', { class: 'd-none d-md-inline' }, info.getValue()),
            meta: { className: 'd-none d-md-table-cell' }
        }),
        columnHelper.display({
            id: 'actions',
            header: () => t('textLabel.action'),
            cell: info => h('div', { class: 'btn-group', role: 'group' }, [
                h('button', {
                    class: 'btn btn-primary',
                    onClick: () => goToEdit(info.row.original.companyId, info.row.original.departmentId)
                }, t('button.edit')),
                h('button', {
                    class: 'btn btn-info',
                    onClick: () => goToUsers(info.row.original.companyId, info.row.original.departmentId)
                }, t('textLabel.user', 2))
            ]),
        }),
    ]

    const { table, globalFilter } = useDataTable(departments, columns)

    const fetchData = async () => {
        await Promise.all([
            getCompany('/v0/user/organization/company/detail/companyId/' + companyId + '/userId/' + auth.user?.id),
            get('/v0/user/organization/department/list/companyId/' + companyId + "/userId/" + auth.user?.id)
        ])
    }

    return {
        table,
        globalFilter,
        companyData,
        fetchData,
        t
    }
}
