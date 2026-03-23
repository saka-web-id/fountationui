// useUserTable.ts
import { computed, h } from 'vue'
import { createColumnHelper } from '@tanstack/vue-table'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useApi } from "~/composables/useApi"
import { useDataTable } from '~/composables/useDataTable'
import { useAuthStore } from '~/stores/auth'

export interface User {
    userId: number;
    userName: string;
    userEmail: string;
    userStatus: string;
    userCreatedAt: string;
}

export function useUserTable(companyIdParam: string, departmentIdParam: string) {
    const { t } = useI18n()
    const router = useRouter()
    const auth = useAuthStore()

    // API State
    const { data, get } = useApi<User[]>()
    const { data: companyData, get: getCompany } = useApi()
    const { data: departmentData, get: getDepartment } = useApi()

    const users = computed(() => data.value || [])
    const columnHelper = createColumnHelper<User>()

    // Helper function for navigation
    const goToEdit = (userId: number) => {
        router.push({ name: 'useredit', params: { userId, companyIdParam, departmentIdParam } })
    }

    // Column Definitions
    const columns = [
        columnHelper.accessor('userId', {
            header: () => h('span', { class: 'd-none d-md-inline' }, t('textLabel.number')),
            cell: info => h('span', { class: 'd-none d-md-inline' }, info.getValue()),
            meta: { className: 'd-none d-md-table-cell' }
        }),
        columnHelper.accessor('userName', {
            header: () => t('textLabel.name'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('userEmail', {
            header: () => h('span', { class: 'd-none d-md-inline' }, t('textLabel.email')),
            cell: info => h('span', { class: 'd-none d-md-inline' }, info.getValue()),
            meta: { className: 'd-none d-md-table-cell' }
        }),
        columnHelper.accessor('userStatus', {
            header: () => t('textLabel.status'),
            cell: info => info.getValue(),
        }),
        columnHelper.display({
            id: 'actions',
            header: () => t('textLabel.action'),
            cell: info => h('div', { class: 'btn-group' }, [
                h('button', {
                    class: 'btn btn-primary btn-sm',
                    onClick: () => goToEdit(info.row.original.userId)
                }, t('button.edit'))
            ]),
        }),
    ]

    const { table, globalFilter } = useDataTable(users, columns)

    const fetchData = async () => {
        const userId = auth.user?.id
        await Promise.all([
            get(`/v0/user/organization/department/users/companyId/${companyIdParam}/userId/${userId}/valueDepartmentId/${departmentIdParam}`),
            getCompany(`/v0/user/organization/company/detail/companyId/${companyIdParam}/userId/${userId}`),
            getDepartment(`/v0/user/organization/department/detail/companyId/${companyIdParam}/userId/${userId}/${departmentIdParam}`)
        ])
    }

    return {
        table,
        globalFilter,
        companyData,
        departmentData,
        fetchData,
        t // export t if needed in template
    }
}
