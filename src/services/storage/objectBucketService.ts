import api from "~/services/api";
import type { ObjectBucketDTO, ObjectBucketPageDTO } from "~/types/registry";

export const objectBucketService = {
    addBucket(companyId: number, userId: number, valueCompanyId: number, bucket: ObjectBucketDTO) {
        return api.post<ObjectBucketDTO>(`/v0/objects/bucket/add/companyId/${companyId}/userId/${userId}/valueCompanyId/${valueCompanyId}`, bucket);
    },

    updateBucket(companyId: number, userId: number, valueCompanyId: number, bucket: ObjectBucketDTO) {
        return api.post<ObjectBucketDTO>(`/v0/objects/bucket/update/companyId/${companyId}/userId/${userId}/valueCompanyId/${valueCompanyId}`, bucket);
    },

    getBuckets(companyId: number, userId: number, valueCompanyId: number, params: { name?: string; page?: number; size?: number }) {
        return api.get<ObjectBucketPageDTO>(`/v0/objects/bucket/list/companyId/${companyId}/userId/${userId}/valueCompanyId/${valueCompanyId}`, {
            params
        });
    }
};
