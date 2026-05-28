import api from "~/services/api";
import type { AiMessagePageDTO } from "~/types/cognitive";

export const aiMessageService = {
    getMessages(companyId: number, userId: number, params: { sessionId?: number; content?: string; page?: number; size?: number }) {
        return api.get<AiMessagePageDTO>(`/v0/cognitive/ai/message/list/companyId/${companyId}/userId/${userId}`, {
            params
        });
    }
};
