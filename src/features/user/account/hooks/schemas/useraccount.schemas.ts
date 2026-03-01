import * as yup from 'yup';

export function useUserAccountSchema() {

    return yup.object({
        name: yup.string().min(8).required(),
        email: yup.string().email().required(),
        phone: yup.string().min(8).required(),
        status: yup.string().required("Please select a status."),
        isVerified: yup.boolean().required(),
        note: yup.string()
    });
}
