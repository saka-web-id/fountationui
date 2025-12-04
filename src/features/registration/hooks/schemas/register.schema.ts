import * as yup from 'yup';
/*import { useI18n } from "vue-i18n";*/

export function useLoginSchema(t: any) {
    /*const { t } = useI18n();*/

    return yup.object({
        company: yup.string()
            .min(8)
            .required(),
        email: yup.string()
            .email()
            .required(t('textError.formatError.email')),
        username: yup.string()
            .min(8)
            .matches(/^[a-zA-Z0-9\s]+$/)
            .required(t('textError.formatError.username')),
        password: yup.string()
            .min(8)
            .required(t('textError.formatError.password.general'))
            .min(8, t('textError.formatError.password.size'))
            .matches(/[A-Z]/, t('textError.formatError.password.uppercase'))
            .matches(/[a-z]/, t('textError.formatError.password.lowercase'))
            .matches(/[^A-Za-z0-9]/, t('textError.formatError.password.specialCharacter'))
            .matches(/[0-9]/, t('textError.formatError.password.number')),
        passwordConfirmation: yup
            .string()
            .required()
            .oneOf([yup.ref("password")], t('textError.formatError.passwordConfirmation')),
    });
}
