import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '~/stores/auth';
import { configParameterService } from '~/services/registry/configParameterService';
import { setGlobalSuccess } from '~/stores/globalSuccess';
import { setGlobalError } from '~/stores/globalError';
import type { ConfigParameterDTO } from '~/types/registry';

export function useConfigParameter() {
    const { t } = useI18n();
    const authStore = useAuthStore();
    const loading = ref(false);

    const addConfigParameter = async (configParameter: ConfigParameterDTO) => {
        const companyId = authStore.user?.company?.companyId;
        const userId = authStore.user?.id;
        if (!companyId || !userId) return false;

        loading.value = true;
        try {
            await configParameterService.addConfigParameter(companyId, userId, configParameter);
            setGlobalSuccess(t('textLabel.successSave'));
            return true;
        } catch (error: any) {
            setGlobalError(error.response?.data?.message || t('textLabel.errorSave'));
            return false;
        } finally {
            loading.value = false;
        }
    };

    const updateConfigParameter = async (configParameter: ConfigParameterDTO) => {
        const companyId = authStore.user?.company?.companyId;
        const userId = authStore.user?.id;
        const valueId = configParameter.configParamId;
        
        if (!companyId || !userId || !valueId) return false;

        loading.value = true;
        try {
            await configParameterService.updateConfigParameter(companyId, userId, valueId, configParameter);
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
        addConfigParameter,
        updateConfigParameter
    };
}
