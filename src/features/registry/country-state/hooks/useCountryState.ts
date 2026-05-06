import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { countryStateService } from '~/services/registry/countryStateService';
import type { CountryStateDTO } from '~/types/registry';
import { setGlobalSuccess } from '~/stores/globalSuccess';
import { setGlobalError } from '~/stores/globalError';
import { setGlobalLoading } from '~/stores/globalLoading';

export function useCountryState() {
    const authStore = useAuthStore();
    const loading = ref(false);

    const uploadCsv = async (countryStates: CountryStateDTO[]) => {
        loading.value = true;
        setGlobalLoading(true);
        try {
            const companyId = authStore.user?.company?.companyId;
            const userId = authStore.user?.id;
            if (!companyId || !userId) throw new Error("User or Company not found");

            await countryStateService.addCountryStates(companyId, userId, countryStates);
            setGlobalSuccess("Data uploaded successfully");
            return true;
        } catch (error: any) {
            setGlobalError(error.message || "Failed to upload data");
            return false;
        } finally {
            loading.value = false;
            setGlobalLoading(false);
        }
    };

    const downloadExampleCsv = () => {
        const headers = ["registryCountryId", "registryCountryStateCode", "registryCountryStateName"];
        const exampleData = [
            ["1", "JW", "Jawa"],
            ["1", "SM", "Sumatera"],
            ["2", "CA", "California"]
        ];
        
        const csvContent = [
            headers.join(","),
            ...exampleData.map(row => row.join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "country_state_example.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return {
        loading,
        uploadCsv,
        downloadExampleCsv
    };
}
