// hooks/useRegisterForm.ts
import { useForm } from 'vee-validate'
import { useDepartmentSchema } from '../schemas/department.schema';

export interface CompanyPayload {
    departmentId: number;
    companyId: number;
    departmentName: string;
    departmentDescription: string;
    departmentCreatedAt: string;
    departmentUpdatedAt: string;
}

export const mapCompanyFromApi = (apiData: any): CompanyPayload => ({
    departmentId: apiData.departmentId,
    companyId: apiData.companyId,
    departmentName: apiData.departmentName,
    departmentDescription: apiData.departmentDescription,
    departmentCreatedAt: apiData.departmentCreatedAt,
    departmentUpdatedAt: apiData.departmentUpdatedAt
});


export function useCompanyForm() {
    // useForm with schema
    const {  defineField, handleSubmit, setValues } = useForm<CompanyPayload>({
        validationSchema: useDepartmentSchema,
        initialValues: {departmentId: 0, companyId: 0, departmentName:"", departmentDescription:"", departmentCreatedAt:"", departmentUpdatedAt:"" }
    })

    // define fields
    const [departmentId, departmentIdAttrs] = defineField('departmentId');
    const [companyId, companyIdAttrs] = defineField('companyId');
    const [departmentName, departmentNameAttrs] = defineField('departmentName');
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
        departmentDescription,
        departmentDescriptionAttrs,
        departmentCreatedAt,
        departmentCreatedAtAttrs,
    }
}