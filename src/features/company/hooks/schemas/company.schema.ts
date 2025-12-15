import * as yup from 'yup';
import { useI18n } from 'vue-i18n';

export function useCompanySchema() {
    const { t } = useI18n();

    return yup.object({
        companyName: yup.string()
            .min(8)
            .required(),
        companyAddress: yup.string()
            .min(8),
        companyPhone: yup.number()
            .min(8),
        companyEmail: yup.string()
            .email()
            .required(t('textError.formatError.email')),
        companyWebsite: yup.string()
            .url()
            .min(8),
        companyDescription: yup.string()
            .min(8),
        companyLogoUrl: yup.string()
            .url()
            .min(8),
        companyTaxId: yup.string()
            .min(8),
        companyRegistrationId: yup.string()
            .min(8),
        companyStatus: yup.string().required("Please select a gender."),
        companyIndustry: yup.string()
            .min(8),
        companyType: yup.string()
            .min(8)
    });
}
