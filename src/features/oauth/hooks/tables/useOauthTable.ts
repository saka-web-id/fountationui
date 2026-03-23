import { h, ref } from 'vue'
import { createColumnHelper } from '@tanstack/vue-table'
import { useDataTable } from '~/composables/useDataTable'

export interface OauthProvider {
    name: string;
    company: string;
    beingUsedFor: string;
    verified: string;
}

export function useOauthTable() {
    // Hardcoded data for now as per original component
    const providers = ref<OauthProvider[]>([
        { name: 'Google OAuth', company: 'PT Auan DBB', beingUsedFor: 'Email', verified: 'Yes' },
        { name: 'Microsoft 365', company: 'PT Assarrra', beingUsedFor: 'None', verified: 'No' },
    ])

    const columnHelper = createColumnHelper<OauthProvider>()

    const columns = [
        columnHelper.accessor('name', {
            header: () => 'Name',
        }),
        columnHelper.accessor('company', {
            header: () => 'Company',
        }),
        columnHelper.accessor('beingUsedFor', {
            header: () => 'Being used for',
        }),
        columnHelper.accessor('verified', {
            header: () => 'Verified',
        }),
        columnHelper.display({
            id: 'actions',
            header: () => 'Action',
            cell: _info => h('div', { class: 'btn-group btn-group-sm' }, [
                h('button', {
                    class: 'btn btn-primary',
                    'data-bs-target': '#editModal',
                    'data-bs-toggle': 'modal'
                }, 'Edit'),
                h('button', {
                    class: 'btn btn-danger',
                    'data-bs-target': '#deleteModal',
                    'data-bs-toggle': 'modal'
                }, 'Delete')
            ]),
        }),
    ]

    const { table, globalFilter } = useDataTable(providers, columns)

    return {
        table,
        globalFilter
    }
}
