import * as yup from 'yup';

export function useProviderSchema() {

    return yup.object({
        providerName: yup.string()
            .min(4)
            .required()
    });
}
