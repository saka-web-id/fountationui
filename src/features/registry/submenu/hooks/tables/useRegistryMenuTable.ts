import { computed } from 'vue'
import { createColumnHelper } from '@tanstack/vue-table'
import { useI18n } from 'vue-i18n'
import { useDataTable } from '~/composables/useDataTable'
import type {GridSubMenu} from "~/features/log/hooks/tables/useLogMenuTable.ts";


export function useRegistryMenuTable() {
    const { t } = useI18n()
    const isPremiumPlan = import.meta.env.VITE_APP_PLAN === 'PREMIUM';

    const menuItems = computed(() => [
        {
            id: 'idregistrycountry',
            name: t('registry.country'),
            route: '/registry/country',
            icon: 'bi-globe',
            description: 'Registry Country',
            isPremium: true
        },
        {
            id: 'idregistrycurrency',
            name: t('registry.currency'),
            route: '/registry/country',
            icon: 'bi-currency-exchange',
            description: 'Registry Currency',
            isPremium: true
        },
        {
            id: 'idregistrylanguage',
            name: t('registry.language'),
            route: '/registry/language',
            icon: 'bi-translate',
            description: 'Registry Language',
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
