// hooks/useRegisterForm.ts
import { useForm } from 'vee-validate'
import { useUserRegisterSchema } from '../schemas/userregister.schema';


export interface UserRegisterPayload {
    user: UserPayload;
    company: CompanyPayload;
    department: DepartmentPayload;
}

export interface UserPayload {
    userEmail: string;
    userName: string;
    userPhone: string;
    userStatus: string;
}

export interface CompanyPayload {
    companyName: string;
    companyPhone: string;
    companyEmail: string;
    companyAddress: string;
    companyWebsite: string;
    companyStatus: string;
}

export interface DepartmentPayload {
    departmentName: string;
    departmentStatus: string;
}

export function useUserRegisterForm() {
    const { defineField, handleSubmit, meta } = useForm<UserRegisterPayload>({
        validationSchema: useUserRegisterSchema,
        initialValues: {
            user: {
                userEmail: "",
                userName: "",
                userPhone: "",
                userStatus: "INACTIVE"
            },
            company: {
                companyName: "",
                companyPhone: "",
                companyEmail: "",
                companyAddress: "",
                companyWebsite: "",
                companyStatus: "INACTIVE"
            },
            department: {
                departmentName: "",
                departmentStatus: "INACTIVE",
            },
        },
    });

    // define fields with correct paths
    const [userEmail, userEmailAttrs] = defineField("user.userEmail");
    const [userName, userNameAttrs] = defineField("user.userName");
    const [userPhone, userPhoneAttrs] = defineField("user.userPhone");

    const [companyName, companyNameAttrs] = defineField("company.companyName");
    const [companyPhone, companyPhoneAttrs] = defineField("company.companyPhone");
    const [companyEmail, companyEmailAttrs] = defineField("company.companyEmail");
    const [companyAddress, companyAddressAttrs] = defineField("company.companyAddress");
    const [companyWebsite, companyWebsiteAttrs] = defineField("company.companyWebsite");

    const [departmentName, departmentNameAttrs] = defineField("department.departmentName");

    return {
        handleSubmit,
        meta, // ✅ expose meta
        userEmail, userEmailAttrs,
        userName, userNameAttrs,
        userPhone, userPhoneAttrs,
        companyName, companyNameAttrs,
        companyPhone, companyPhoneAttrs,
        companyEmail, companyEmailAttrs,
        companyAddress, companyAddressAttrs,
        companyWebsite, companyWebsiteAttrs,
        departmentName, departmentNameAttrs,
    };
}