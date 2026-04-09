import { ref, onMounted } from 'vue'
import { useApi } from '~/composables/useApi'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import type { UserCompanyPayLoad } from "~/features/user/interfaces/user.interfaces.ts";

export function useCompany(config: { routeName: string; apiPath: string }) {

    const { get, data } = useApi()
    const { data: userCompanyData, get: getUserCompany } = useApi()
    /*const { data, get } = useApi()*/
    const auth = useAuthStore()
    const router = useRouter()
    const route = useRoute()

    const selectedCompanyId = ref<number>(
        Number(route.params.companyIdParam) > 0
            ? Number(route.params.companyIdParam)
            : Number(auth.user?.company.companyId)
    )

    async function fetchCompanies() {
        await getUserCompany(
            `/v0/user/organization/company/list/companyId/${auth.user?.company.companyId}/userId/${auth.user?.id}/valueCompanyId/0`
        )

        const defaultCompany = userCompanyData.value?.find(
            (c: UserCompanyPayLoad) => c.isDefault
        )

        if (defaultCompany && (!selectedCompanyId.value || selectedCompanyId.value === 0)) {
            selectedCompanyId.value = defaultCompany.companyId
        }

    }

    // Flexible fetch function
    async function fetchData(extraParams: Record<string, string | number>) {
        // Build query string dynamically from extraParams
        const queryString = Object.entries(extraParams)
            .map(([key, value]) => `${key}/${value}`)
            .join('/')

        const url = `${config.apiPath}/companyId/${auth.user?.company.companyId}/userId/${auth.user?.id}/${queryString}`

        console.log("useCompany : " + url )

        await get(url)

        return data
    }


    async function onCompanyChange(extraParams: Record<string, string | number>) {
        if (selectedCompanyId.value) {
            // Navigate to the correct route
            await router.push({
                name: config.routeName,
                params: { companyIdParam: selectedCompanyId.value }
            })

            await fetchData(extraParams)
        }
    }

    onMounted(fetchCompanies)

    return {
        userCompanyData,
        selectedCompanyId,
        fetchData,
        onCompanyChange,
        data
    }
}