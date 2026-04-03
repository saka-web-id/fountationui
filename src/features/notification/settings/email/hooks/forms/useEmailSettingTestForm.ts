import {useForm} from "vee-validate";
import {
    useNotificationRequestSchema
} from "~/features/notification/settings/email/hooks/schemas/notificationRequest.schema.ts";


export interface NotificationRequestPayload {
    providerSlug: string;
    notificationSource: string;
    notificationDestination: string;
    notificationSubject: string;
    notificationMessage: string;
    // Gunakan Record untuk mapping ke Map<String, Object> di Java
    notificationTemplateData: Record<string, any> | null;
    notificationTemplateCode: string | null;
    // Gunakan Record untuk mapping ke Map<String, String> di Java
    notificationMetadata: Record<string, string> | null;
}

export function useNotificationRequestPayload() {
    // 1. Inisialisasi Form Utama
    const { defineField, handleSubmit, setValues, resetForm, values, errors, meta } = useForm<NotificationRequestPayload>({
        validationSchema: useNotificationRequestSchema(),
        initialValues: {
            providerSlug: "",
            notificationSource: "",
            notificationDestination: "",
            notificationSubject: "",
            notificationMessage: "",
            notificationTemplateData: null,
            notificationTemplateCode: null,
            notificationMetadata: null
        }
    });

    // 3. Define fields untuk Master Provider
    const [providerSlug] = defineField('providerSlug');
    const [notificationSource] = defineField('notificationSource');
    const [notificationDestination] = defineField('notificationDestination');
    const [notificationSubject] = defineField('notificationSubject');
    const [notificationMessage] = defineField('notificationMessage');

    return {
        handleSubmit,
        setValues,
        resetForm,
        values,
        errors,
        meta,

        // Master Fields
        providerSlug,
        notificationSource,
        notificationDestination,
        notificationSubject,
        notificationMessage
    }
}