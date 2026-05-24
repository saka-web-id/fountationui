import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { objectUploadService } from '~/services/storage/objectUploadService';
import { setGlobalSuccess } from '~/stores/globalSuccess';
import { setGlobalError } from '~/stores/globalError';
import { setGlobalLoading } from '~/stores/globalLoading';

export function useObjectUpload() {
    const authStore = useAuthStore();
    const loading = ref(false);
    const uploadProgress = ref(0);
    const uploadResults = ref<{ name: string; success: boolean; error?: string }[]>([]);

    const uploadFiles = async (valueCompanyId: number, files: File[], bucketCode: string, targetPath: string) => {
        loading.value = true;
        setGlobalLoading(true);
        uploadResults.value = [];
        uploadProgress.value = 0;
        
        let successCount = 0;

        try {
            const companyId = authStore.user?.company?.companyId;
            const userId = authStore.user?.id;
            if (!companyId || !userId) throw new Error("User or Company not found");

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                try {
                    await objectUploadService.uploadFile(companyId, userId, valueCompanyId, file, bucketCode, targetPath);
                    uploadResults.value.push({ name: file.name, success: true });
                    successCount++;
                } catch (error: any) {
                    uploadResults.value.push({ name: file.name, success: false, error: error.message });
                }
                uploadProgress.value = Math.round(((i + 1) / files.length) * 100);
            }

            if (successCount === files.length) {
                setGlobalSuccess(`${successCount} file(s) uploaded successfully`);
            } else if (successCount > 0) {
                setGlobalSuccess(`${successCount} file(s) uploaded, ${files.length - successCount} failed`);
            } else {
                setGlobalError("All file uploads failed");
            }
            
            return successCount > 0;
        } catch (error: any) {
            setGlobalError(error.message || "Failed to upload files");
            return false;
        } finally {
            loading.value = false;
            setGlobalLoading(false);
        }
    };

    return {
        loading,
        uploadProgress,
        uploadResults,
        uploadFiles
    };
}
