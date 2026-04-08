import { computed, h } from 'vue'
import { createColumnHelper } from '@tanstack/vue-table'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useApi } from "~/composables/useApi"
import { useDataTable } from '~/composables/useDataTable'
import { useAuthStore } from '~/stores/auth'
import type { CompanySimplePayload } from '~/features/company/interfaces/company.interfaces'

export function useTemplateCompanyTable() {
    const { t } = useI18n()
    const router = useRouter()
    const auth = useAuthStore()

    const { data, get } = useApi<CompanySimplePayload[]>()
    const companies = computed(() => data.value || [])
    const columnHelper = createColumnHelper<CompanySimplePayload>()

    const goToTemplateList = (companyId: number) => {
        router.push({ name: 'notificationTemplateList', params: { companyId } });
    }

    const columns = [
        columnHelper.accessor('companyId', {
            header: () => t('textLabel.number'),
            cell: info => info.getValue(),
            meta: { className: 'd-none d-md-table-cell' }
        }),
        columnHelper.accessor('companyName', {
            header: () => t('textLabel.company', 2),
            cell: info => info.getValue(),
        }),
        columnHelper.display({
            id: 'actions',
            header: () => t('textLabel.action'),
            cell: info => h('button', {
                class: 'btn btn-primary',
                onClick: () => goToTemplateList(info.row.original.companyId)
            }, t('button.view'))
        }),
    ]

    const { table, globalFilter } = useDataTable(companies, columns)

    const fetchData = async () => {
        await get(`/v0/user/companies/list/companyId/${auth.user?.company.companyId}/userId/${auth.user?.id}`)
    }

    return { table, globalFilter, fetchData, t }
}
