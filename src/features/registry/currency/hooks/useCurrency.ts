import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { currencyService } from '~/services/registry/currencyService';
import type { CurrencyDTO } from '~/types/registry';
import { setGlobalSuccess } from '~/stores/globalSuccess';
import { setGlobalError } from '~/stores/globalError';
import { setGlobalLoading } from '~/stores/globalLoading';

export function useCurrency() {
    const authStore = useAuthStore();
    const loading = ref(false);

    const uploadCsv = async (currencies: CurrencyDTO[]) => {
        loading.value = true;
        setGlobalLoading(true);
        try {
            const companyId = authStore.user?.company?.companyId;
            const userId = authStore.user?.id;
            if (!companyId || !userId) throw new Error("User or Company not found");

            await currencyService.addCurrencies(companyId, userId, currencies);
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
        const headers = ["repoCurrencyName", "repoCurrencySymbol", "repoCurrencyPosition", "repoCurrencyActive"];
        const exampleData = [
            ["Indonesian Rupiah", "Rp", "LEFT", "true"],
            ["US Dollar", "$", "LEFT", "true"],
            ["Euro", "€", "RIGHT", "true"]
        ];
        
        const csvContent = [
            headers.join(","),
            ...exampleData.map(row => row.join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "currency_example.csv");
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
