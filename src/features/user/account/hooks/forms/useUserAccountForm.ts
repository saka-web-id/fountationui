import {useForm} from "vee-validate";
import {useUserAccountSchema} from "~/features/user/account/hooks/schemas/useraccount.schemas.ts";


export interface UserAccountPayload {
    id: number;
    name: string;
    phone: string;
    email: string;
    note: string;
    isVerified: boolean;
    accountNumber: string;
    accountStatus: string;
    membershipType: string;
    membershipStatus: string;
    createdAt: string;              // ISO date string
    membershipStartDate: string;    // ISO date string
    membershipEndDate: string;      // ISO date string
    authority: Authority;
    company: Company;
    department: Department;
}

interface Authority {
    roleId: number;
    roleName: string;
    roleDescription: string;
    permissions: Permission[];
}

interface Company {
    companyId: number;
    companyName: string;
    companyAddress: string;
    companyPhone: string;
    companyEmail: string;
    companyWebsite: string;
    companyDescription: string;
    companyLogoUrl: string;
    companyTaxId: string;
    companyRegistrationId: string;
    companyStatus: string;
    companyIndustry: string;
    companyType: string;
}

interface Department {
    departmentId: number;
    departmentName: string;
    departmentStatus: string;
    departmentDescription: string;
    departmentCreatedAt: string;
    departmentUpdatedAt: string;
}

interface Permission {
    permissionName: string;
}

export const mapUserAccountFromApi = (apiData: any): UserAccountPayload => ({
    id: apiData.id,
    name: apiData.name,
    phone: apiData.phone,
    email: apiData.email,
    note: apiData.note,
    isVerified: apiData.isVerified,
    accountNumber: apiData.accountNumber,
    accountStatus: apiData.accountStatus,
    membershipType: apiData.membershipType,
    membershipStatus: apiData.membershipStatus,
    createdAt: apiData.createdAt,              // ISO date string
    membershipStartDate: apiData.membershipStartDate,     // ISO date string
    membershipEndDate: apiData.membershipEndDate,    // ISO date string
    authority: apiData.authority,
    company: apiData.company,
    department: apiData.department
});

export function useUserAccountForm() {

    const {  defineField, handleSubmit, setValues } = useForm<UserAccountPayload>({
        validationSchema: useUserAccountSchema,
        initialValues: {
            id: 0,
            name: "",
            email: "",
            note: "",
            isVerified: false,
            accountNumber: "",
            accountStatus: "",
            membershipType: "",
            membershipStatus: "",
            createdAt: "",
            membershipStartDate: "",
            membershipEndDate: "",
            authority: {
                roleId: 0,
                roleName: "",
                roleDescription: "",
                permissions: []
            },
            company: {
                companyId: 0,
                companyName: "",
                companyAddress: "",
                companyPhone: "",
                companyEmail: "",
                companyWebsite: "",
                companyDescription: "",
                companyLogoUrl: "",
                companyTaxId: "",
                companyRegistrationId: "",
                companyStatus: "",
                companyIndustry: "",
                companyType: ""
            },
            department: {
                departmentId: 0,
                departmentName: "",
                departmentStatus: "",
                departmentDescription: "",
                departmentCreatedAt: "",
                departmentUpdatedAt: ""
            }
        }
    })

    const [name, nameAttrs] = defineField('name');
    const [email, emailAttrs] = defineField('email');
    const [phone, phoneAttrs] = defineField('phone');
    const [note, noteAttrs] = defineField('note');
    const [isVerified, isVerifiedAttrs] = defineField('isVerified');
    const [accountStatus, accountStatusAttrs] = defineField('accountStatus');
    const [membershipStatus, membershipStatusAttrs] = defineField('membershipStatus');
    const [membershipType, membershipTypeAttrs] = defineField('membershipType');
    const [roleId, roleIdAttrs] = defineField('authority.roleId');
    const [companyId, companyIdAttrs] = defineField('company.companyId');
    const [departmentId, departmentIdAttrs] = defineField('department.departmentId');


    return {
        handleSubmit,
        setValues,
        name,
        nameAttrs,
        email,
        emailAttrs,
        phone,
        phoneAttrs,
        note,
        noteAttrs,
        isVerified,
        isVerifiedAttrs,
        accountStatus,
        accountStatusAttrs,
        membershipStatus,
        membershipStatusAttrs,
        membershipType,
        membershipTypeAttrs,
        roleId,
        roleIdAttrs,
        companyId,
        companyIdAttrs,
        departmentId,
        departmentIdAttrs
    }

}