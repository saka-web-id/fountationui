import * as yup from 'yup';

export function usePermissionSchema() {
    return yup.object({
        name: yup.string()
            .min(4, "Name must be at least 4 characters")
            .required("Name is required"),
        resource: yup.string()
            .required("Resource is required"),
        action: yup.string()
            .required("Action is required"),
        description: yup.string()
            .min(8, "Description must be at least 8 characters")
            .required("Description is required"),
        isSuperAdmin: yup.boolean()
    });
}
