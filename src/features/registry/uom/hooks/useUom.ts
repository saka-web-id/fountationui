import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { uomService } from '~/services/registry/uomService';
import type { UoMDTO } from '~/types/registry';
import { setGlobalSuccess } from '~/stores/globalSuccess';
import { setGlobalError } from '~/stores/globalError';
import { setGlobalLoading } from '~/stores/globalLoading';

export function useUom() {
    const authStore = useAuthStore();
    const loading = ref(false);

    const uploadCsv = async (uoms: UoMDTO[]) => {
        loading.value = true;
        setGlobalLoading(true);
        try {
            const companyId = authStore.user?.company?.companyId;
            const userId = authStore.user?.id;
            if (!companyId || !userId) throw new Error("User or Company not found");

            await uomService.addUoms(companyId, userId, uoms);
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
        const headers = ["registryUomCategoryId", "registryUomName", "registryUomType", "registryUomFactor", "registryUomActive"];
        const exampleData = [
            ["1", "Kilogram", "Weight", "1.0", "true"],
            ["1", "Gram", "Weight", "0.001", "true"],
            ["2", "Meter", "Length", "1.0", "true"]
        ];
        
        const csvContent = [
            headers.join(","),
            ...exampleData.map(row => row.join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "uom_example.csv");
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
