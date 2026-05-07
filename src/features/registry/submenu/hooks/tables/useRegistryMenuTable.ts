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
            id: 'idregistrycountrystate',
            name: t('registry.countryState'),
            route: '/registry/country/state',
            icon: 'bi-map',
            description: 'Registry Country State',
            isPremium: true
        },
        {
            id: 'idregistrycurrency',
            name: t('registry.currency'),
            route: '/registry/currency',
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
        },
        {
            id: 'idregistryuom',
            name: t('registry.uom'),
            route: '/registry/uom',
            icon: 'bi-rulers',
            description: 'Registry Unit of Measure',
            isPremium: true
        },
        {
            id: 'idregistryuomcategory',
            name: t('registry.uomCategory'),
            route: '/registry/uomcategory',
            icon: 'bi-tags',
            description: 'Registry UoM Category',
            isPremium: true
        },
        {
            id: 'idregistryconfigparameter',
            name: t('registry.configParameter'),
            route: '/registry/configparameter',
            icon: 'bi-gear',
            description: 'Registry Config Parameter',
            isPremium: true
        },
        {
            id: 'idregistryreposequence',
            name: t('registry.repoSequence'),
            route: '/registry/repo/sequence',
            icon: 'bi-list-ol',
            description: 'Registry Repository Sequence',
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
