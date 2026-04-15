import { computed } from 'vue'
import { createColumnHelper } from '@tanstack/vue-table'
import { useI18n } from 'vue-i18n'
import { useDataTable } from '~/composables/useDataTable'

export interface GridSubMenu {
    id: string;
    name: string;
    route: string;
    icon: string;
    description: string;
    isPremium?: boolean;
}

export function useLogMenuTable() {
    const { t } = useI18n()
    const isPremiumPlan = import.meta.env.VITE_APP_PLAN === 'PREMIUM';

    const menuItems = computed(() => [
        {
            id: 'ididgatewaylogs',
            name: t('textLabel.gatewayLogs'),
            route: '/gatewaylogs',
            icon: 'bi-list-columns-reverse',
            description: 'Gateway Log History',
            isPremium: true
        },
        {
            id: 'ididapilogs',
            name: t('textLabel.apiLogs'),
            route: '/apilogs',
            icon: 'bi-journal-text',
            description: 'API Logs History',
            isPremium: true
        },
        {
            id: 'ididnotificationlogs',
            name: t('textLabel.notification'),
            route: '/notificationlogs',
            icon: 'bi-journals',
            description: 'Notification Logs History',
            isPremium: true
        }
    ])

    const columnHelper = createColumnHelper<GridSubMenu>()

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
