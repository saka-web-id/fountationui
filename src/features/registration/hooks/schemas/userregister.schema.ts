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
            userPassword: yup
                .string()
                .min(8)
                .required(t("textError.formatError.password")),
            userName: yup
                .string()
                .min(8)
                .matches(/^[a-zA-Z0-9\s]+$/)
                .required(t("textError.formatError.username")),
            userPhone: yup.string().nullable(), // optional if needed
        }),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('user.userPassword')], t("textError.formatError.passwordConfirmation"))
            .required(t("textError.formatError.passwordConfirmation")),

        account: yup.object({
            membershipType: yup.string().required(t("textError.formatError.membershipType")),
        }),

        company: yup.object({
            companyName: yup.string().min(3).required(t("textError.formatError.company")),
            companyPhone: yup.string().nullable(),
            companyEmail: yup.string().email().nullable(),
            companyAddress: yup.string().nullable(),
            companyWebsite: yup.string().url().nullable(),
            companyLogoUrl: yup.string().url().nullable(),
            companyRegistrationId: yup.string().nullable(),
            companyIndustry: yup.string().nullable(),
            companyType: yup.string().nullable(),
            companyDescription: yup.string().nullable(),
        }),

        department: yup.object({
            departmentName: yup.string().required(t("textError.formatError.department")),
        }),
    });
}
