import {useForm} from "vee-validate";
import {useUserAccountSchema} from "~/features/user/account/hooks/schemas/useraccount.schemas.ts";
import type { UserAccountPayload } from "~/features/user/interfaces/user.interfaces.ts";

export const mapUserAccountFromApi = (apiData: any): UserAccountPayload => ({
    id: apiData.id,
    name: apiData.name,
    phone: apiData.phone,
    email: apiData.email,
    note: apiData.note,
    status: apiData.status,
    isVerified: apiData.isVerified,
    accountNumber: apiData.accountNumber,
    accountStatus: apiData.accountStatus,
    membershipType: apiData.membershipType,
    membershipStatus: apiData.membershipStatus,
    membershipPlanId: apiData.membershipPlanId,
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
            status: "",
            isVerified: false,
            accountNumber: "",
            accountStatus: "",
            membershipType: "",
            membershipStatus: "",
            membershipPlanId: 0,
            createdAt: "",
            membershipStartDate: "",
            membershipEndDate: "",
            authority: {
                roleId: 0,
                roleName: "",
                roleDescription: ""
                /*permissions: []*/
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
    const [status, statusAttrs] = defineField('status');
    const [isVerified, isVerifiedAttrs] = defineField('isVerified');
    const [accountStatus, accountStatusAttrs] = defineField('accountStatus');
    const [membershipStatus, membershipStatusAttrs] = defineField('membershipStatus');
    const [membershipType, membershipTypeAttrs] = defineField('membershipType');
    const [membershipPlanId, membershipPlanIdAttrs] = defineField('membershipPlanId');
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
        status,
        statusAttrs,
        isVerified,
        isVerifiedAttrs,
        accountStatus,
        accountStatusAttrs,
        membershipStatus,
        membershipStatusAttrs,
        membershipType,
        membershipTypeAttrs,
        membershipPlanId,
        membershipPlanIdAttrs,
        roleId,
        roleIdAttrs,
        companyId,
        companyIdAttrs,
        departmentId,
        departmentIdAttrs
    }

}