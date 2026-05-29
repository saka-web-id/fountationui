import { computed, h } from 'vue'
import { createColumnHelper } from '@tanstack/vue-table'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useApi } from "~/composables/useApi"
import { useDataTable } from '~/composables/useDataTable'
import { useAuthStore } from '~/stores/auth'
import type { CompanySimplePayload } from "~/features/company/interfaces/company.interfaces.ts"

export function useCompanyTable() {
    const { t } = useI18n()
    const router = useRouter()
    const auth = useAuthStore()

    // API State
    const { data, get } = useApi<CompanySimplePayload[]>()

    const companies = computed(() => data.value || [])
    const columnHelper = createColumnHelper<CompanySimplePayload>()

    // Helper functions for navigation
    const goToEdit = (companyIdParam: number) => {
        router.push({ name: 'companyedit', params: { companyIdParam } });
    };

    const goToDepartment = (companyId: number) => {
        router.push({ name: 'companydepartment', params: { companyId } });
    }

    // Column Definitions
    const columns = [
        columnHelper.accessor('companyId', {
            header: () => t('textLabel.number'),
            cell: info => info.getValue(),
            meta: { className: 'd-none d-md-table-cell' }
        }),
        columnHelper.accessor('companyCode', {
            header: () => t('cognitive.companyCode'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('companyName', {
            header: () => t('textLabel.company', 2),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('companyEmail', {
            header: () => t('textField.email'),
            cell: info => info.getValue(),
            meta: { className: 'd-none d-md-table-cell' }
        }),
        columnHelper.display({
            id: 'actions',
            header: () => t('textLabel.action'),
            cell: info => h('div', { class: 'btn-group', role: 'group' }, [
                h('button', {
                    class: 'btn btn-primary',
                    onClick: () => goToEdit(info.row.original.companyId)
                }, t('button.edit')),
                h('button', {
                    class: 'btn btn-info',
                    onClick: () => goToDepartment(info.row.original.companyId)
                }, t('textLabel.department'))
            ]),
        }),
    ]

    const { table, globalFilter } = useDataTable(companies, columns)

    const fetchData = async () => {
        await get('/v0/user/companies/list/companyId/' + auth.user?.company.companyId + "/userId/" + auth.user?.id)
    }

    return {
        table,
        globalFilter,
        fetchData,
        t
    }
}
