import { useForm } from 'vee-validate';
import { notificationHistoryFilterSchema } from '../schemas/notificationHistory.schema.ts';
import dayjs from 'dayjs';
import type { HistoryFilterValues } from '../../interfaces/notificationHistory.types.ts';

export function useNotificationHistoryFilter() {
    const today = dayjs().format('YYYY-MM-DD');

    const { defineField, handleSubmit, values, setFieldValue, resetForm } = useForm<HistoryFilterValues>({
        validationSchema: notificationHistoryFilterSchema,
        initialValues: {
            campaignId: null,
            campaignName: '',
            dateFrom: today,
            dateTo: today,
        }
    });

    const [campaignId] = defineField('campaignId');
    const [campaignName] = defineField('campaignName');
    const [dateFrom] = defineField('dateFrom');
    const [dateTo] = defineField('dateTo');

    return {
        campaignId,
        campaignName,
        dateFrom,
        dateTo,
        values,
        handleSubmit,
        setFieldValue,
        resetForm
    };
}
