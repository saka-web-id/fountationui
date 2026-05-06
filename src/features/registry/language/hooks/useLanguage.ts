import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { languageService } from '~/services/registry/languageService';
import type { LanguageDTO } from '~/types/registry';
import { setGlobalSuccess } from '~/stores/globalSuccess';
import { setGlobalError } from '~/stores/globalError';
import { setGlobalLoading } from '~/stores/globalLoading';

export function useLanguage() {
    const authStore = useAuthStore();
    const loading = ref(false);

    const uploadCsv = async (languages: LanguageDTO[]) => {
        loading.value = true;
        setGlobalLoading(true);
        try {
            const companyId = authStore.user?.company?.companyId;
            const userId = authStore.user?.id;
            if (!companyId || !userId) throw new Error("User or Company not found");

            await languageService.addLanguages(companyId, userId, languages);
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
        const headers = ["repoLanguageName", "repoLanguageCode", "repoLanguageIsoCode", "repoLanguageActive", "repoLanguageDirection"];
        const exampleData = [
            ["English", "en", "en-US", "true", "LTR"],
            ["Indonesian", "id", "id-ID", "true", "LTR"],
            ["Arabic", "ar", "ar-SA", "true", "RTL"]
        ];
        
        const csvContent = [
            headers.join(","),
            ...exampleData.map(row => row.join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "language_example.csv");
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
