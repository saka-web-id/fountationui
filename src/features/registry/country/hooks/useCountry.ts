import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { countryService } from '~/services/registry/countryService';
import type { CountryDTO } from '~/types/registry';
import { setGlobalSuccess } from '~/stores/globalSuccess';
import { setGlobalError } from '~/stores/globalError';
import { setGlobalLoading } from '~/stores/globalLoading';

export function useCountry() {
    const authStore = useAuthStore();
    const loading = ref(false);

    const uploadCsv = async (countries: CountryDTO[]) => {
        loading.value = true;
        setGlobalLoading(true);
        try {
            const companyId = authStore.user?.company?.companyId;
            const userId = authStore.user?.id;
            if (!companyId || !userId) throw new Error("User or Company not found");

            await countryService.addCountries(companyId, userId, countries);
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
        const headers = ["repoCountryCode", "repoCountryName", "repoCountryPhoneCode", "repoCountryActive"];
        const exampleData = [
            ["ID", "Indonesia", "62", "true"],
            ["SG", "Singapore", "65", "true"],
            ["US", "United States", "1", "true"]
        ];
        
        const csvContent = [
            headers.join(","),
            ...exampleData.map(row => row.join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "country_example.csv");
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
