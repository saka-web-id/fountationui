import { computed, h } from 'vue'
import { createColumnHelper } from '@tanstack/vue-table'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useCompany } from '~/composables/useCompany'
import { useDataTable } from '~/composables/useDataTable'

export interface MembershipPlan {
    membershipPlanId: number;
    membershipPlanName: string;
    membershipPlanBillingCycle: string;
    membershipPlanPrice: number;
}

export function useMembershipTable() {
    const { t } = useI18n()
    const router = useRouter()

    const { selectedCompanyId, onCompanyChange, userCompanyData, data, fetchData } = useCompany({
        routeName: 'membership',
        apiPath: '/v0/account/membership/plan/list'
    })

    const membershipPlans = computed(() => (data.value as MembershipPlan[]) || [])

    const columnHelper = createColumnHelper<MembershipPlan>()

    const columns = [
        columnHelper.accessor('membershipPlanId', {
            header: () => t('textLabel.number'),
            cell: info => info.getValue(),
            meta: { className: 'd-none d-md-table-cell' }
        }),
        columnHelper.accessor('membershipPlanName', {
            header: () => t('textLabel.membership', 1),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('membershipPlanBillingCycle', {
            header: () => t('textLabel.billingCycle'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('membershipPlanPrice', {
            header: () => t('textLabel.billing'),
            cell: info => info.getValue(),
        }),
        columnHelper.display({
            id: 'actions',
            header: () => t('textLabel.action'),
            cell: info => h('div', { class: 'btn-group', role: 'group' }, [
                h('button', {
                    class: 'btn btn-primary',
                    onClick: () => goToEdit(selectedCompanyId.value, info.row.original.membershipPlanId)
                }, t('button.edit'))
            ]),
        }),
    ]

    const { table, globalFilter } = useDataTable(membershipPlans, columns)

    const initialize = async () => {
        if (selectedCompanyId.value) {
            await fetchData({ valueCompanyId: selectedCompanyId.value })
        }
    }

    const goToEdit = (companyIdParam: any, membershipIdParam: number) => {
        router.push({ name: 'membershipedit', params: { companyIdParam, membershipIdParam } });
    };

    return {
        table,
        globalFilter,
        selectedCompanyId,
        userCompanyData,
        onCompanyChange,
        initialize,
        t
    }
}
