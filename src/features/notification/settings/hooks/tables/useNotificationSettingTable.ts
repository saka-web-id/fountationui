import { computed } from 'vue'
import { createColumnHelper } from '@tanstack/vue-table'
import { useI18n } from 'vue-i18n'
import { useDataTable } from '~/composables/useDataTable'

export interface NotificationMenu {
    id: string;
    name: string;
    route: string;
    icon: string;
    description: string;
    isPremium?: boolean;
}

export function useNotificationSettingTable() {
    const { t } = useI18n()
    const isPremiumPlan = import.meta.env.VITE_APP_PLAN === 'PREMIUM';

    const menuItems = computed(() => [
        {
            id: 'email',
            name: t('textLabel.emailSetting'),
            route: '/notification/email',
            icon: 'bi-envelope-at',
            description: t('textLabel.emailSettingDescription') || 'Configure email notification settings',
            isPremium: true
        },
        {
            id: 'sms',
            name: t('textLabel.smsSetting'),
            route: '/notification/sms',
            icon: 'bi-chat-left-text',
            description: t('textLabel.smsSettingDescription') || 'Configure SMS notification settings',
            isPremium: true
        },
        {
            id: 'whatapps',
            name: t('textLabel.whatappsSetting'),
            route: '/notification/whatapps',
            icon: 'bi-whatsapp',
            description: t('textLabel.whatappsSettingDescription') || 'Configure Whatsapp notification settings',
            isPremium: true
        },
        {
            id: 'category',
            name: t('textLabel.category'),
            route: '/notification/category',
            icon: 'bi-whatsapp',
            description: t('textLabel.categorySettingDescription') || 'Configure Category notification settings',
            isPremium: true
        }
        /*{
            id: 'log',
            name: t('textLabel.logSetting'),
            route: '/logsetting',
            icon: 'bi-shield-lock',
            description: t('textLabel.logSettingDescription') || 'Manage application and security logs',
            isPremium: true
        },
        {
            id: 'permission',
            name: t('textLabel.permissionSetting'),
            route: '/permissionsetting',
            icon: 'bi-key',
            description: t('textLabel.permissionSettingDescription') || 'Configure granular access control and permissions'
        }*/
    ])

    const columnHelper = createColumnHelper<NotificationMenu>()

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
