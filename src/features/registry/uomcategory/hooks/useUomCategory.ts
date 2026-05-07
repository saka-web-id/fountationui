import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { uomCategoryService } from '~/services/registry/uomCategoryService';
import type { UoMCategoryDTO } from '~/types/registry';
import { setGlobalSuccess } from '~/stores/globalSuccess';
import { setGlobalError } from '~/stores/globalError';
import { setGlobalLoading } from '~/stores/globalLoading';

export function useUomCategory() {
    const authStore = useAuthStore();
    const loading = ref(false);

    const uploadCsv = async (categories: UoMCategoryDTO[]) => {
        loading.value = true;
        setGlobalLoading(true);
        try {
            const companyId = authStore.user?.company?.companyId;
            const userId = authStore.user?.id;
            if (!companyId || !userId) throw new Error("User or Company not found");

            await uomCategoryService.addUomCategoryBatch(companyId, userId, categories);
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

    const addSingleCategory = async (category: UoMCategoryDTO) => {
        loading.value = true;
        setGlobalLoading(true);
        try {
            const companyId = authStore.user?.company?.companyId;
            const userId = authStore.user?.id;
            if (!companyId || !userId) throw new Error("User or Company not found");

            await uomCategoryService.addUomCategorySingle(companyId, userId, category);
            setGlobalSuccess("Category added successfully");
            return true;
        } catch (error: any) {
            setGlobalError(error.message || "Failed to add category");
            return false;
        } finally {
            loading.value = false;
            setGlobalLoading(false);
        }
    };

    const downloadExampleCsv = () => {
        const headers = ["registryUomCategoryName"];
        const exampleData = [
            ["Unit"],
            ["Weight"],
            ["Length"],
            ["Volume"],
            ["Time"]
        ];
        
        const csvContent = [
            headers.join(","),
            ...exampleData.map(row => row.join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "uom_category_example.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return {
        loading,
        uploadCsv,
        addSingleCategory,
        downloadExampleCsv
    };
}
