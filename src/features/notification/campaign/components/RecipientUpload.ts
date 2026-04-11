import type { NotificationDTO } from "~/features/notification/campaign/interfaces/types.ts";

export interface RecipientCSVRow {
    recipient: string;
    [key: string]: any;
}

export async function parseRecipientCSV(
    file: File,
    companyId: number,
    categoryId: number,
    providerId: number
): Promise<Partial<NotificationDTO>[]> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result as string;
            if (!text) return resolve([]);

            const lines = text.split('\n').filter(line => line.trim() !== '');
            if (lines.length < 2) return resolve([]);

            const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
            const recipientIndex = headers.indexOf('recipient');

            if (recipientIndex === -1) {
                return reject(new Error("CSV must contain a 'recipient' column."));
            }

            const notifications: Partial<NotificationDTO>[] = [];
            for (let i = 1; i < lines.length; i++) {
                const values = lines[i].split(',').map(v => v.trim());
                if (values[recipientIndex]) {
                    notifications.push({
                        notiCompanyId: companyId,
                        notiCategoryId: categoryId,
                        notiProviderId: providerId,
                        notiRecipientAddress: values[recipientIndex],
                        notiStatus: 'SCHEDULED',
                        notiRetryCount: 0
                    });
                }
            }
            resolve(notifications);
        };
        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.readAsText(file);
    });
}
