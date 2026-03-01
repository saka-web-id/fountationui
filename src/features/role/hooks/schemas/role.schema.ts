import * as yup from 'yup';

export function useRoleSchema() {

    return yup.object({
        roleName: yup.string()
            .min(4)
            .required(),
        roleDescription: yup.string()
            .min(8)
            .required(),
        permissions: yup.array().min(1, "At least one permission must be selected")
    });
}
