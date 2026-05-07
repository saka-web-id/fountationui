import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '~/stores/auth';
import { repoSequenceService } from '~/services/registry/repoSequenceService';
import { setGlobalSuccess } from '~/stores/globalSuccess';
import { setGlobalError } from '~/stores/globalError';
import type { RepoSequenceDTO } from '~/types/registry';

export function useRepoSequence() {
    const { t } = useI18n();
    const authStore = useAuthStore();
    const loading = ref(false);

    const addRepoSequence = async (valueCompanyId: number, repoSequence: RepoSequenceDTO) => {
        const companyId = authStore.user?.company?.companyId;
        const userId = authStore.user?.id;
        if (!companyId || !userId || !valueCompanyId) return false;

        loading.value = true;
        try {
            await repoSequenceService.addRepoSequence(companyId, userId, valueCompanyId, repoSequence);
            setGlobalSuccess(t('textLabel.successSave'));
            return true;
        } catch (error: any) {
            setGlobalError(error.response?.data?.message || t('textLabel.errorSave'));
            return false;
        } finally {
            loading.value = false;
        }
    };

    const updateRepoSequence = async (valueCompanyId: number, repoSequence: RepoSequenceDTO) => {
        const companyId = authStore.user?.company?.companyId;
        const userId = authStore.user?.id;
        const id = repoSequence.repoSequenceId;
        
        if (!companyId || !userId || !valueCompanyId || !id) return false;

        loading.value = true;
        try {
            await repoSequenceService.updateRepoSequence(id, companyId, userId, valueCompanyId, repoSequence);
            setGlobalSuccess(t('textLabel.successUpdate'));
            return true;
        } catch (error: any) {
            setGlobalError(error.response?.data?.message || t('textLabel.errorUpdate'));
            return false;
        } finally {
            loading.value = false;
        }
    };

    return {
        loading,
        addRepoSequence,
        updateRepoSequence
    };
}
