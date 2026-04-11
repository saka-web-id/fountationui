import { useForm } from "vee-validate";
import { useCampaignSchema } from "~/features/notification/campaign/hooks/schemas/campaign.schema.ts";
import type { NotificationCampaignDTO, NotificationDTO } from "~/features/notification/campaign/interfaces/types.ts";
import dayjs from "dayjs";

export interface CampaignFormValues {
    notiCampaignId: number;
    notiCampaignCompanyId: number;
    notiCampaignTemplateId: number;
    notiCampaignTitle: string;
    notiCampaignDescription: string;
    notiCampaignStatus: string;
    notiCampaignMetadata: string;
    notiCampaignScheduledAt: string;
    notiCampaignNotifications: NotificationDTO[];
}

export const mapCampaignFromApi = (apiData: NotificationCampaignDTO): CampaignFormValues => ({
    notiCampaignId: apiData.notiCampaignId,
    notiCampaignCompanyId: apiData.notiCampaignCompanyId,
    notiCampaignTemplateId: apiData.notiCampaignTemplateId,
    notiCampaignTitle: apiData.notiCampaignTitle,
    notiCampaignDescription: apiData.notiCampaignDescription,
    notiCampaignStatus: apiData.notiCampaignStatus,
    notiCampaignMetadata: JSON.stringify(apiData.notiCampaignMetadata, null, 2),
    notiCampaignScheduledAt: apiData.notiCampaignScheduledAt ? dayjs(apiData.notiCampaignScheduledAt).format('YYYY-MM-DDTHH:mm') : "",
    notiCampaignNotifications: apiData.notiCampaignNotifications || []
});

export function useCampaignForm() {
    const { defineField, handleSubmit, setValues, values, errors } = useForm<CampaignFormValues>({
        validationSchema: useCampaignSchema,
        initialValues: {
            notiCampaignId: 0,
            notiCampaignCompanyId: 0,
            notiCampaignTemplateId: 0,
            notiCampaignTitle: "",
            notiCampaignDescription: "",
            notiCampaignStatus: "SCHEDULED",
            notiCampaignMetadata: "{}",
            notiCampaignScheduledAt: "",
            notiCampaignNotifications: []
        }
    });

    const [notiCampaignId] = defineField('notiCampaignId');
    const [notiCampaignCompanyId] = defineField('notiCampaignCompanyId');
    const [notiCampaignTemplateId] = defineField('notiCampaignTemplateId');
    const [notiCampaignTitle] = defineField('notiCampaignTitle');
    const [notiCampaignDescription] = defineField('notiCampaignDescription');
    const [notiCampaignMetadata] = defineField('notiCampaignMetadata');
    const [notiCampaignScheduledAt] = defineField('notiCampaignScheduledAt');
    const [notiCampaignNotifications] = defineField('notiCampaignNotifications');

    const beautifyMetadata = () => {
        try {
            const parsed = JSON.parse(values.notiCampaignMetadata);
            setValues({
                ...values,
                notiCampaignMetadata: JSON.stringify(parsed, null, 2)
            });
        } catch (e) {
            // Silence error if JSON is invalid
        }
    };

    const addNotification = (noti: NotificationDTO) => {
        const currentNotis = [...values.notiCampaignNotifications];
        currentNotis.push(noti);
        setValues({ ...values, notiCampaignNotifications: currentNotis });
    };

    const updateNotification = (index: number, noti: NotificationDTO) => {
        const currentNotis = [...values.notiCampaignNotifications];
        currentNotis[index] = noti;
        setValues({ ...values, notiCampaignNotifications: currentNotis });
    };

    const removeNotification = (index: number) => {
        const currentNotis = [...values.notiCampaignNotifications];
        currentNotis.splice(index, 1);
        setValues({ ...values, notiCampaignNotifications: currentNotis });
    };

    return {
        handleSubmit,
        setValues,
        values,
        errors,
        notiCampaignId,
        notiCampaignCompanyId,
        notiCampaignTemplateId,
        notiCampaignTitle,
        notiCampaignDescription,
        notiCampaignMetadata,
        notiCampaignScheduledAt,
        notiCampaignNotifications,
        beautifyMetadata,
        addNotification,
        updateNotification,
        removeNotification
    };
}
