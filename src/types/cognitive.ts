export interface AiChatRequest {
    prompt: string;
    providerName: string;
}

export interface AiMessageDTO {
    aiMessageId: number | null;
    aiMessageSessionId: number;
    aiMessageRole: "user" | "assistant";
    aiMessageContent: string;
    aiMessageTokensUsed: number;
    aiMessageCreatedAt: string | null;
}

export interface AiSessionDTO {
    aiSessionId?: number;
    aiSessionTitle: string;
    aiSessionUserId?: number;
    aiSessionCompanyId?: number;
    aiSessionCreatedAt?: string;
}

export interface AiSessionPageDTO {
    aiSessionData: AiSessionDTO[];
    aiSessionTotalItems: number;
    aiSessionPage: number;
    aiSessionSize: number;
}
