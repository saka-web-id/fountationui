import { computed } from 'vue'
import { createColumnHelper } from '@tanstack/vue-table'
import { useI18n } from 'vue-i18n'
import { useDataTable } from '~/composables/useDataTable'

export interface OrganizationMenu {
    id: string;
    name: string;
    route: string;
    icon: string;
    description: string;
    isPremium?: boolean;
}

export function useOrganizationSettingTable() {
    const { t } = useI18n()
    const isPremiumPlan = import.meta.env.VITE_APP_PLAN === 'PREMIUM';

    const menuItems = computed(() => [
        {
            id: 'company',
            name: t('textLabel.company', 2),
            route: '/company',
            icon: 'bi-building',
            description: 'Manage companies, departments, and organizational structures'
        },
        {
            id: 'roles',
            name: t('textLabel.role', 2),
            route: '/roles/0',
            icon: 'bi-person-badge',
            description: 'Configure user roles and authority management'
        },
        {
            id: 'membership',
            name: t('textLabel.membership', 2),
            route: '/membership/0',
            icon: 'bi-credit-card',
            description: 'Manage account memberships, plans, and subscriptions'
        }
    ])

    const columnHelper = createColumnHelper<OrganizationMenu>()

    const columns = [
        columnHelper.accessor('name', {
            header: () => t('textLabel.name'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('description', {
            header: () => t('textLabel.description'),
            cell: info => info.getValue(),
        }),
    ]

    const { table, globalFilter } = useDataTable(menuItems, columns)

    return {
        table,
        globalFilter,
        isPremiumPlan,
        t
    }
}
