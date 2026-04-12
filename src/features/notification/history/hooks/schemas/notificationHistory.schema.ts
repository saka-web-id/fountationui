import * as yup from 'yup';

export const notificationHistoryFilterSchema = yup.object({
    campaignId: yup.number().nullable().required('Campaign is required'),
    campaignName: yup.string().required('Campaign search is required'),
    dateFrom: yup.string().required('Start date is required'),
    dateTo: yup.string().required('End date is required'),
});
