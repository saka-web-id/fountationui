import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { aiDatasourceService } from '~/services/cognitive/aiDatasourceService';
import type { AiDatasourceDTO } from '~/types/cognitive-datasource';
import { setGlobalSuccess } from '~/stores/globalSuccess';
import { setGlobalError } from '~/stores/globalError';
import { setGlobalLoading } from '~/stores/globalLoading';

export function useAiDatasource() {
    const authStore = useAuthStore();
    const loading = ref(false);

    const addAiDatasource = async (datasource: AiDatasourceDTO) => {
        loading.value = true;
        setGlobalLoading(true);
        try {
            const companyId = authStore.user?.company?.companyId;
            const userId = authStore.user?.id;
            if (!companyId || !userId) throw new Error("User or Company not found");

            await aiDatasourceService.addAiDatasource(companyId, userId, datasource);
            setGlobalSuccess("AI Datasource added successfully");
            return true;
        } catch (error: any) {
            setGlobalError(error.message || "Failed to add AI datasource");
            return false;
        } finally {
            loading.value = false;
            setGlobalLoading(false);
        }
    };

    const updateAiDatasource = async (datasourceId: number, datasource: AiDatasourceDTO) => {
        loading.value = true;
        setGlobalLoading(true);
        try {
            const companyId = authStore.user?.company?.companyId;
            const userId = authStore.user?.id;
            if (!companyId || !userId) throw new Error("User or Company not found");

            await aiDatasourceService.updateAiDatasource(companyId, userId, datasourceId, datasource);
            setGlobalSuccess("AI Datasource updated successfully");
            return true;
        } catch (error: any) {
            setGlobalError(error.message || "Failed to update AI datasource");
            return false;
        } finally {
            loading.value = false;
            setGlobalLoading(false);
        }
    };

    return {
        loading,
        addAiDatasource,
        updateAiDatasource
    };
}
