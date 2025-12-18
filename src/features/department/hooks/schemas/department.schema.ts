import * as yup from 'yup';

export function useDepartmentSchema() {

    return yup.object({
        departmentName: yup.string()
            .min(8)
            .required(),
        departmentDescription: yup.string(),
        departmentCreatedAt: yup.date()
    });
}
