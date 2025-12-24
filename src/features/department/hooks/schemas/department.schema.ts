import * as yup from 'yup';

export function useDepartmentSchema() {

    return yup.object({
        departmentName: yup.string()
            .min(8)
            .required(),
        departmentStatus: yup.string().required("Please select a status."),
        departmentDescription: yup.string()
    });
}
