import * as yup from 'yup';

export function useUserSchema() {

    return yup.object({
        userName: yup.string().min(8).required(),
        userEmail: yup.string().email().required(),
        userPhone: yup.string().min(8).required(),
        userStatus: yup.string().required("Please select a status."),
        userIsVerified: yup.boolean().required(),
        userNote: yup.string()
    });
}
