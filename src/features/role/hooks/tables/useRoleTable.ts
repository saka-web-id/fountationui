import { computed, h, ref } from 'vue'
import { createColumnHelper } from '@tanstack/vue-table'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useApi } from "~/composables/useApi"
import { useDataTable } from '~/composables/useDataTable'
import { useAuthStore } from '~/stores/auth'
import { type UserCompanyPayLoad } from "~/features/user/hooks/forms/useUserForm.ts";

export interface Role {
    roleId: number;
    roleName: string;
    roleDescription: string;
    roleCreatedAt: string;
}

export function useRoleTable(companyIdParam: string | string[]) {
    const { t } = useI18n()
    const router = useRouter()
    const auth = useAuthStore()

    // API State
    const { data, get } = useApi<Role[]>()
    const { data: userCompanyData, get: getUserCompany } = useApi<UserCompanyPayLoad[]>();

    // Selected company ID
    const selectedCompanyId = ref<number | null>(
        companyIdParam != null && Number(companyIdParam) > 0
            ? Number(companyIdParam)
            : null
    );

    const roles = computed(() => data.value || [])
    const columnHelper = createColumnHelper<Role>()

    // Column Definitions
    const columns = [
        columnHelper.accessor('roleId', {
            header: () => h('span', { class: 'd-none d-md-inline' }, t('textLabel.number')),
            cell: info => h('span', { class: 'd-none d-md-inline' }, info.getValue()),
            meta: { className: 'd-none d-md-table-cell' }
        }),
        columnHelper.accessor('roleName', {
            header: () => t('textLabel.name'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('roleDescription', {
            header: () => h('span', { class: 'd-none d-md-inline' }, t('textLabel.description')),
            cell: info => h('span', { class: 'd-none d-md-inline' }, info.getValue()),
            meta: { className: 'd-none d-md-table-cell' }
        }),
        columnHelper.accessor('roleCreatedAt', {
            header: () => h('span', { class: 'd-none d-md-inline' }, t('textLabel.dateCreated')),
            cell: info => h('span', { class: 'd-none d-md-inline' }, info.getValue()),
            meta: { className: 'd-none d-md-table-cell' }
        }),
        columnHelper.display({
            id: 'actions',
            header: () => t('textLabel.action'),
            cell: info => h('div', { class: 'btn-group', role: 'group' }, [
                h('button', {
                    class: 'btn btn-primary',
                    onClick: () => router.push({ name: 'roleedit', params: { roleIdParam: info.row.original.roleId, companyIdParam: selectedCompanyId.value } })
                }, t('button.view'))
            ]),
        }),
    ]

    const { table, globalFilter } = useDataTable(roles, columns)

    const fetchData = async () => {
        await getUserCompany('/v0/user/organization/company/list/companyId/' + auth.user?.company.companyId + "/userId/" + auth.user?.id + "/valueCompanyId/0");

        const defaultCompany = userCompanyData.value?.find((c: any) => c.companyIsDefault)
        if (defaultCompany) { //Get is defaultCompany True
            if (selectedCompanyId.value == null || selectedCompanyId.value == 0) {
                selectedCompanyId.value = defaultCompany.companyId
            }
        }

        if (selectedCompanyId.value) {
            await get('/v0/authorization/company/role/list/companyId/' + auth.user?.company.companyId + "/userId/" + auth.user?.id + "/valueCompanyId/" + selectedCompanyId.value);
        }
    }

    async function onCompanyChange() {
        if (selectedCompanyId.value) {
            // Wait until the route navigation finishes
            await router.push({
                name: 'roles',
                params: { companyIdParam: selectedCompanyId.value }
            });

            // Then trigger the API call and wait for it to complete
            await get('/v0/authorization/company/role/list/companyId/' + auth.user?.company.companyId + "/userId/" + auth.user?.id + "/valueCompanyId/" + selectedCompanyId.value);
        }
    }

    return {
        table,
        globalFilter,
        userCompanyData,
        selectedCompanyId,
        onCompanyChange,
        fetchData,
        t
    }
}
