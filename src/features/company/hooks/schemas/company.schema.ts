import * as yup from 'yup';
import { useI18n } from 'vue-i18n';

export function useCompanySchema() {
    const { t } = useI18n();

    return yup.object({
        companyName: yup.string()
            .min(8)
            .required(),
        companyAddress: yup.string(),
        companyPhone: yup.number()
            .min(8),
        companyEmail: yup.string()
            .email()
            .required(t('textError.formatError.email')),
        companyWebsite: yup.string()
            .url(),
        companyDescription: yup.string(),
        companyLogoUrl: yup.string()
            .url(),
        companyTaxId: yup.string(),
        companyRegistrationId: yup.string(),
        companyStatus: yup.string().required("Please select a status."),
        companyIndustry: yup.string(),
        companyType: yup.string()
    });
}
