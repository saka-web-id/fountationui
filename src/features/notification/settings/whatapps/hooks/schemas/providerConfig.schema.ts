import * as yup from 'yup';

export function useProviderConfigSchema() {

    return yup.object({
        providerConfigKey: yup.string()
            .min(4)
            .required(),
        providerConfigValue: yup.string()
            .min(4)
            .required()
    });
}
