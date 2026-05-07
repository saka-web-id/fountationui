import { computed, h } from 'vue';
import { createColumnHelper } from '@tanstack/vue-table';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useApi } from "~/composables/useApi";
import { useDataTable } from '~/composables/useDataTable';
import { useAuthStore } from '~/stores/auth';
import type { CompanySimplePayload } from "~/features/company/interfaces/company.interfaces";

export function useRepoSequenceCompanyTable() {
    const { t } = useI18n()
    const router = useRouter()
    const auth = useAuthStore()

    const { data, get } = useApi<CompanySimplePayload[]>()

    const companies = computed(() => data.value || [])
    const columnHelper = createColumnHelper<CompanySimplePayload>()

    const goToRepoSequences = (companyId: number) => {
        router.push({ name: 'registryRepoSequenceList', params: { valueCompanyId: companyId } });
    };

    const columns = [
        columnHelper.accessor('companyId', {
            header: () => h('span', { class: 'd-none d-md-inline' }, t('textLabel.number')),
            cell: info => h('span', { class: 'd-none d-md-inline' }, info.getValue()),
            meta: { className: 'd-none d-md-table-cell' }
        }),
        columnHelper.accessor('companyName', {
            header: () => t('textLabel.name'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('companyEmail', {
            header: () => t('textLabel.email'),
            cell: info => info.getValue() || '-',
        }),
        columnHelper.display({
            id: 'actions',
            header: () => t('textLabel.action'),
            cell: info => h('div', { class: 'btn-group' }, [
                h('button', {
                    class: 'btn btn-primary btn-sm',
                    onClick: () => goToRepoSequences(info.row.original.companyId)
                }, t('button.view'))
            ]),
        }),
    ];

    const { table, globalFilter } = useDataTable(companies, columns)

    const fetchData = async () => {
        await get('/v0/user/companies/list/companyId/' + auth.user?.company.companyId + "/userId/" + auth.user?.id)
    }

    return {
        table,
        globalFilter,
        fetchData,
        t
    };
}
