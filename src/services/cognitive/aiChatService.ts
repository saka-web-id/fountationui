import type { AiChatRequest, AiMessageDTO } from "~/types/cognitive";

export const aiChatService = {
    async streamChat(
        companyId: number,
        userId: number,
        sessionId: number,
        request: AiChatRequest,
        onMessage: (message: AiMessageDTO) => void,
        onError: (error: any) => void,
        onDone: () => void
    ) {
        try {
            const response = await fetch(`/api/v0/cognitive/ai/chat/companyId/${companyId}/userId/${userId}/session/${sessionId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const reader = response.body?.getReader();
            if (!reader) {
                throw new Error('Response body is null');
            }

            const decoder = new TextDecoder();
            let buffer = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                
                // Flux might send multiple JSON objects. 
                // We need to handle how they are delimited.
                // Assuming they are newline-delimited or just chunks of JSON.
                // A common way for Flux is newline-delimited JSON or a single JSON array (unlikely for streaming).
                // If it's pure Flux with application/x-ndjson:
                let lines = buffer.split('\n');
                buffer = lines.pop() || '';

                for (let line of lines) {
                    line = line.trim();
                    if (line) {
                        try {
                            // Handle SSE "data: " prefix
                            if (line.startsWith('data:')) {
                                line = line.substring(5).trim();
                            }
                            
                            // Ignore SSE heartbeat or [DONE] signals if necessary
                            if (line === '[DONE]' || !line) continue;

                            const message: AiMessageDTO = JSON.parse(line);
                            onMessage(message);
                        } catch (e) {
                            console.error('Error parsing JSON chunk', e, line);
                        }
                    }
                }
            }
            
            // Handle last chunk
            let lastLine = buffer.trim();
            if (lastLine) {
                try {
                    if (lastLine.startsWith('data:')) {
                        lastLine = lastLine.substring(5).trim();
                    }
                    if (lastLine !== '[DONE]' && lastLine) {
                        const message: AiMessageDTO = JSON.parse(lastLine);
                        onMessage(message);
                    }
                } catch (e) {
                    // might be incomplete
                }
            }

            onDone();
        } catch (error) {
            onError(error);
        }
    }
};
