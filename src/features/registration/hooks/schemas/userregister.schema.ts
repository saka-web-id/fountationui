import * as yup from 'yup';
import { useI18n } from 'vue-i18n';

export function useUserRegisterSchema() {
    const { t } = useI18n();

    return yup.object({
        user: yup.object({
            userEmail: yup
                .string()
                .email()
                .required(t("textError.formatError.email")),
            userName: yup
                .string()
                .min(8)
                .matches(/^[a-zA-Z0-9\s]+$/)
                .required(t("textError.formatError.username")),
            userPhone: yup.string().nullable(), // optional if needed
        }),

        company: yup.object({
            companyName: yup.string().min(3).required(t("textError.formatError.company")),
            companyPhone: yup.string().nullable(),
            companyEmail: yup.string().email().nullable(),
            companyAddress: yup.string().nullable(),
            companyWebsite: yup.string().url().nullable(),
        }),

        department: yup.object({
            departmentName: yup.string().required(t("textError.formatError.department")),
        }),
    });
}
