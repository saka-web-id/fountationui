import * as yup from 'yup';
import { useI18n } from 'vue-i18n';

export function notificationCategorySchema() {
    const { t } = useI18n();

    return yup.object({
        name: yup.string().required(t('validation.required', { field: t('textField.name') })),
        description: yup.string().required(t('validation.required', { field: t('textField.description') })),
        priority: yup.number().required(t('validation.required', { field: t('textField.priority') })),
        defaultProviderId: yup.number().required(t('validation.required', { field: t('textField.provider') })),
        retryPolicy: yup.object().required(t('validation.required', { field: t('textField.retryPolicy') }))
    });
}
