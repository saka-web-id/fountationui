import { computed, h } from 'vue'
import { createColumnHelper } from '@tanstack/vue-table'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useApi } from "~/composables/useApi"
import { useCompany } from '~/composables/useCompany'
import { useDataTable } from '~/composables/useDataTable'
import { useAuthStore } from '~/stores/auth'

export interface BillingCycle {
    billingCycleId: number;
    billingCycleName: string;
    billingCycleDuration: string;
    billingCyclecreatedAt: string;
}

export function useBillingCycleTable() {
    const { t } = useI18n()
    const router = useRouter()
    const auth = useAuthStore()

    const { selectedCompanyId, onCompanyChange, userCompanyData } = useCompany({
        routeName: 'billingcycle',
        apiPath: '/v0/account/membership/billing/cycle/list'
    })

    const { data, get } = useApi<BillingCycle[]>()

    const billingCycles = computed(() => data.value || [])

    const columnHelper = createColumnHelper<BillingCycle>()

    const columns = [
        columnHelper.accessor('billingCycleId', {
            header: () => h('span', { class: 'd-none d-md-inline' }, t('textLabel.number')),
            cell: info => h('span', { class: 'd-none d-md-inline' }, info.getValue()),
            meta: { className: 'd-none d-md-table-cell' }
        }),
        columnHelper.accessor('billingCycleName', {
            header: () => t('textLabel.name', 1),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('billingCycleDuration', {
            header: () => t('textField.duration'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('billingCyclecreatedAt', {
            header: () => h('span', { class: 'd-none d-md-inline' }, t('textField.createdAt')),
            cell: info => h('span', { class: 'd-none d-md-inline' }, info.getValue()),
            meta: { className: 'd-none d-md-table-cell' }
        }),
        columnHelper.display({
            id: 'actions',
            header: () => t('textLabel.action'),
            cell: _info => h('div', { class: 'btn-group', role: 'group' }, [
                h('button', {
                    class: 'btn btn-primary',
                    onClick: () => goToEdit(selectedCompanyId.value as any)
                }, t('button.edit'))
            ]),
        }),
    ]

    const { table, globalFilter } = useDataTable(billingCycles, columns)

    const fetchData = async () => {
        if (selectedCompanyId.value && auth.user) {
            await get('/v0/account/membership/billing/cycle/list/companyId/' + selectedCompanyId.value + "/userId/" + auth.user.id + "/valueCompanyId/" + selectedCompanyId.value)
        }
    }

    const handleCompanyChange = async (event: Event) => {
        const target = event.target as HTMLSelectElement
        // Replicating existing logic, though parameter name looks odd
        await onCompanyChange({ valueMembershipPlanId: target.value })
    }

    const goToEdit = (companyIdParam: number) => {
        router.push({ name: 'billingcycleedit', params: { companyIdParam } });
    };

    return {
        table,
        globalFilter,
        selectedCompanyId,
        userCompanyData,
        handleCompanyChange,
        fetchData,
        t
    }
}
