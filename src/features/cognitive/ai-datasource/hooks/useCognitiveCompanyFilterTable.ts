import { computed, h } from 'vue'
import { createColumnHelper } from '@tanstack/vue-table'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useApi } from "~/composables/useApi"
import { useDataTable } from '~/composables/useDataTable'
import { useAuthStore } from '~/stores/auth'
import type { CompanySimplePayload } from "~/features/company/interfaces/company.interfaces.ts"

export function useCognitiveCompanyFilterTable() {
    const { t } = useI18n()
    const router = useRouter()
    const auth = useAuthStore()

    const { data, get } = useApi<CompanySimplePayload[]>()
    const companies = computed(() => data.value || [])
    const columnHelper = createColumnHelper<CompanySimplePayload>()

    const selectCompany = (valueCompanyId: number) => {
        router.push({ name: 'cognitiveaidatasource', params: { valueCompanyId: valueCompanyId.toString() } });
    }

    const columns = [
        columnHelper.accessor('companyId', {
            header: () => t('textLabel.number'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('companyName', {
            header: () => t('textLabel.company', 2),
            cell: info => info.getValue(),
        }),
        columnHelper.display({
            id: 'actions',
            header: () => t('textLabel.action'),
            cell: info => h('button', {
                class: 'btn btn-primary btn-sm',
                onClick: () => selectCompany(info.row.original.companyId)
            }, 'Select'),
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
