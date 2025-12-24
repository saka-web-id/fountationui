// hooks/useRegisterForm.ts
import { useForm } from 'vee-validate'
import { useDepartmentSchema } from '../schemas/department.schema';

export interface DepartmentPayload {
    departmentId: number;
    companyId: number;
    departmentName: string;
    departmentStatus: string;
    departmentDescription: string;
    departmentCreatedAt: string;
    departmentUpdatedAt: string;
}

export const mapDepartmentFromApi = (apiData: any): DepartmentPayload => ({
    departmentId: apiData.departmentId,
    companyId: apiData.companyId,
    departmentName: apiData.departmentName,
    departmentStatus: apiData.departmentStatus,
    departmentDescription: apiData.departmentDescription,
    departmentCreatedAt: apiData.departmentCreatedAt,
    departmentUpdatedAt: apiData.departmentUpdatedAt
});


export function useDepartmentForm() {
    // useForm with schema
    const {  defineField, handleSubmit, setValues } = useForm<DepartmentPayload>({
        validationSchema: useDepartmentSchema,
        initialValues: {departmentId: 0, companyId: 0, departmentName:"", departmentStatus:"", departmentDescription:"", departmentCreatedAt:"", departmentUpdatedAt:"" }
    })

    // define fields
    const [departmentId, departmentIdAttrs] = defineField('departmentId');
    const [companyId, companyIdAttrs] = defineField('companyId');
    const [departmentName, departmentNameAttrs] = defineField('departmentName');
    const [departmentStatus, departmentStatusAttrs] = defineField('departmentStatus');
    const [departmentDescription, departmentDescriptionAttrs] = defineField('departmentDescription');
    const [departmentCreatedAt, departmentCreatedAtAttrs] = defineField('departmentCreatedAt');

    return {
        handleSubmit,
        setValues,
        departmentId,
        departmentIdAttrs,
        companyId,
        companyIdAttrs,
        departmentName,
        departmentNameAttrs,
        departmentStatus,
        departmentStatusAttrs,
        departmentDescription,
        departmentDescriptionAttrs,
        departmentCreatedAt,
        departmentCreatedAtAttrs,
    }
}