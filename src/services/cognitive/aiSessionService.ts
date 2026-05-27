import api from "~/services/api";
import type { AiSessionDTO, AiSessionPageDTO } from "~/types/cognitive";

export const aiSessionService = {
    getSessions(companyId: number, userId: number, params: { title?: string; page?: number; size?: number }) {
        return api.get<AiSessionPageDTO>(`/v0/cognitive/ai/session/list/companyId/${companyId}/userId/${userId}`, {
            params
        });
    },

    createSession(companyId: number, userId: number, session: AiSessionDTO) {
        return api.post<AiSessionDTO>(`/v0/cognitive/ai/session/add/companyId/${companyId}/userId/${userId}`, session);
    }
};
