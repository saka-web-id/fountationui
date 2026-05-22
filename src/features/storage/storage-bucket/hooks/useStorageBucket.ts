import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { objectBucketService } from '~/services/storage/objectBucketService';
import type { ObjectBucketDTO } from '~/types/registry';
import { setGlobalSuccess } from '~/stores/globalSuccess';
import { setGlobalError } from '~/stores/globalError';
import { setGlobalLoading } from '~/stores/globalLoading';

export function useStorageBucket() {
    const authStore = useAuthStore();
    const loading = ref(false);

    const addBucket = async (valueCompanyId: number, bucket: ObjectBucketDTO) => {
        loading.value = true;
        setGlobalLoading(true);
        try {
            const companyId = authStore.user?.company?.companyId;
            const userId = authStore.user?.id;
            if (!companyId || !userId) throw new Error("User or Company not found");

            await objectBucketService.addBucket(companyId, userId, valueCompanyId, bucket);
            setGlobalSuccess("Bucket added successfully");
            return true;
        } catch (error: any) {
            setGlobalError(error.message || "Failed to add bucket");
            return false;
        } finally {
            loading.value = false;
            setGlobalLoading(false);
        }
    };

    const updateBucket = async (valueCompanyId: number, bucket: ObjectBucketDTO) => {
        loading.value = true;
        setGlobalLoading(true);
        try {
            const companyId = authStore.user?.company?.companyId;
            const userId = authStore.user?.id;
            if (!companyId || !userId) throw new Error("User or Company not found");

            await objectBucketService.updateBucket(companyId, userId, valueCompanyId, bucket);
            setGlobalSuccess("Bucket updated successfully");
            return true;
        } catch (error: any) {
            setGlobalError(error.message || "Failed to update bucket");
            return false;
        } finally {
            loading.value = false;
            setGlobalLoading(false);
        }
    };

    return {
        loading,
        addBucket,
        updateBucket
    };
}
