import api from "~/services/api";
import type { ObjectsDTO, ObjectsPageDTO, ObjectMetadataDTO } from "~/types/registry";

export const objectUploadService = {
    uploadFile(companyId: number, userId: number, valueCompanyId: number, file: File, bucketCode: string, targetPath: string) {
        const formData = new FormData();
        formData.append('file', file);

        return api.post<ObjectsDTO>(`/v0/objects/upload/add/companyId/${companyId}/userId/${userId}/valueCompanyId/${valueCompanyId}`, formData, {
            params: {
                bucketCode,
                targetPath
            },
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },

    getObjects(companyId: number, userId: number, valueCompanyId: number, params: { name?: string; page?: number; size?: number }) {
        return api.get<ObjectsPageDTO>(`/v0/objects/upload/list/companyId/${companyId}/userId/${userId}/valueCompanyId/${valueCompanyId}`, {
            params
        });
    },

    getObjectMetadata(companyId: number, userId: number, objectId: number) {
        return api.get<ObjectMetadataDTO[]>(`/v0/objects/metadata/detail/companyId/${companyId}/userId/${userId}/objectId/${objectId}`);
    }
};
