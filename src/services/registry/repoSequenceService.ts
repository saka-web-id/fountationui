import api from "~/services/api";
import type { RepoSequenceDTO, RepoSequencePageDTO } from "~/types/registry";

export const repoSequenceService = {
    addRepoSequence(companyId: number, userId: number, valueCompanyId: number, repoSequence: RepoSequenceDTO) {
        return api.post<RepoSequenceDTO>(`/v0/registry/repository/sequence/add/companyId/${companyId}/userId/${userId}/valueCompanyId/${valueCompanyId}`, repoSequence);
    },

    updateRepoSequence(id: number, companyId: number, userId: number, valueCompanyId: number, repoSequence: RepoSequenceDTO) {
        return api.post<RepoSequenceDTO>(`/v0/registry/repository/sequence/update/${id}/companyId/${companyId}/userId/${userId}/valueCompanyId/${valueCompanyId}`, repoSequence);
    },

    getRepoSequences(companyId: number, userId: number, valueCompanyId: number, params: { name?: string; page?: number; size?: number }) {
        return api.get<RepoSequencePageDTO>(`/v0/registry/repository/sequence/list/companyId/${companyId}/userId/${userId}/valueCompanyId/${valueCompanyId}`, {
            params
        });
    }
};
