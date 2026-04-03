import * as yup from 'yup';

export function useNotificationRequestSchema() {

    return yup.object({
        providerSlug: yup.string()
            .required(),
        notificationDestination: yup.string()
            .min(4)
            .required(),
        notificationMessage: yup.string()
            .min(4)
            .required()
    });
}
