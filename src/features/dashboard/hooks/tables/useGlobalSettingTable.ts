import { computed } from 'vue'
import { createColumnHelper } from '@tanstack/vue-table'
import { useI18n } from 'vue-i18n'
import { useDataTable } from '~/composables/useDataTable'

export interface GlobalMenu {
    id: string;
    name: string;
    route: string;
    icon: string;
    description: string;
    isPremium?: boolean;
}

export function useGlobalSettingTable() {
    const { t } = useI18n()
    const isPremiumPlan = import.meta.env.VITE_APP_PLAN === 'PREMIUM';

    const menuItems = computed(() => [
        {
            id: 'notification',
            name: t('textLabel.notification'),
            route: '/notification/setting',
            icon: 'bi-bell-fill',
            description: 'Configure and manage system-wide notifications and templates',
            isPremium: true
        },
        {
            id: 'log',
            name: t('textLabel.logSetting'),
            route: '/logsetting',
            icon: 'bi-journal-code',
            description: 'Manage application logs and security auditing configurations',
            isPremium: true
        },
        {
            id: 'permission',
            name: t('textLabel.permissionSetting'),
            route: '/permissionsetting',
            icon: 'bi-shield-lock',
            description: 'Configure granular access control and user permissions'
        }
    ])

    const columnHelper = createColumnHelper<GlobalMenu>()

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
