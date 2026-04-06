import * as yup from 'yup';

export const notificationProviderFilterSchema = yup.object({
    notificationType: yup.string().oneOf(['SMS', 'EMAIL', 'WHATAPPS']).required(),
    companyId: yup.number().nullable().required('Company is required'),
    providerId: yup.number().nullable().required('Provider is required'),
    dateFrom: yup.string().required('Date from is required'),
    dateTo: yup.string().required('Date to is required'),
    size: yup.number().default(10)
});
