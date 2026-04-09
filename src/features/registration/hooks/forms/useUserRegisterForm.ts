import { useForm } from 'vee-validate'
import { useUserRegisterSchema } from '../schemas/userregister.schema';
import { type UserRegisterPayload } from "~/features/user/interfaces/user.interfaces.ts";


export function useUserRegisterForm() {
    const currentTimestamp = new Date().toISOString();

    const { defineField, handleSubmit, meta } = useForm<UserRegisterPayload & { confirmPassword?: string }>({
        validationSchema: useUserRegisterSchema,
        initialValues: {
            user: {
                userEmail: "",
                userName: "",
                userPassword: "",
                userPhone: "",
                userStatus: "INACTIVE",
                userLastLoginAt: currentTimestamp
            },
            account: {
                accountNumber: "",
                accountStatus: "INACTIVE",
                membershipType: "FREE",
                membershipStatus: "INACTIVE",
                createdAt: currentTimestamp,
                membershipStartDate: currentTimestamp,
                membershipEndDate: currentTimestamp
            },
            company: {
                companyName: "",
                companyPhone: "",
                companyEmail: "",
                companyAddress: "",
                companyWebsite: "",
                companyStatus: "INACTIVE",
                companyLogoUrl: "",
                companyTaxId: "",
                companyRegistrationId: "",
                companyIndustry: "",
                companyType: "",
                companyDescription: ""
            },
            department: {
                departmentName: "",
                departmentStatus: "INACTIVE",
                departmentDescription: ""
            },
            confirmPassword: ""
        },
    });

    // define fields with correct paths
    const [userEmail, userEmailAttrs] = defineField("user.userEmail");
    const [userName, userNameAttrs] = defineField("user.userName");
    const [userPassword, userPasswordAttrs] = defineField("user.userPassword");
    const [confirmPassword, confirmPasswordAttrs] = defineField("confirmPassword");
    const [userPhone, userPhoneAttrs] = defineField("user.userPhone");
    const [membershipType, membershipTypeAttrs] = defineField("account.membershipType");
    const [companyName, companyNameAttrs] = defineField("company.companyName");
    const [companyPhone, companyPhoneAttrs] = defineField("company.companyPhone");
    const [companyEmail, companyEmailAttrs] = defineField("company.companyEmail");
    const [companyAddress, companyAddressAttrs] = defineField("company.companyAddress");
    const [companyWebsite, companyWebsiteAttrs] = defineField("company.companyWebsite");
    const [companyLogoUrl, companyLogoUrlAttrs] = defineField("company.companyLogoUrl");
    const [companyTaxId, companyTaxIdAttrs] = defineField("company.companyTaxId");
    const [companyRegistrationId, companyRegistrationIdAttrs] = defineField("company.companyRegistrationId");
    const [companyIndustry, companyIndustryAttrs] = defineField("company.companyIndustry");
    const [companyType, companyTypeAttrs] = defineField("company.companyType");
    const [companyDescription, companyDescriptionAttrs] = defineField("company.companyDescription");
    const [departmentName, departmentNameAttrs] = defineField("department.departmentName");

    return {
        handleSubmit,
        meta, // ✅ expose meta
        userEmail, userEmailAttrs,
        userName, userNameAttrs,
        userPassword, userPasswordAttrs,
        confirmPassword, confirmPasswordAttrs,
        userPhone, userPhoneAttrs,
        membershipType, membershipTypeAttrs,
        companyName, companyNameAttrs,
        companyPhone, companyPhoneAttrs,
        companyEmail, companyEmailAttrs,
        companyAddress, companyAddressAttrs,
        companyWebsite, companyWebsiteAttrs,
        companyLogoUrl, companyLogoUrlAttrs,
        companyTaxId, companyTaxIdAttrs,
        companyRegistrationId, companyRegistrationIdAttrs,
        companyIndustry, companyIndustryAttrs,
        companyType, companyTypeAttrs,
        companyDescription, companyDescriptionAttrs,
        departmentName, departmentNameAttrs,
    };
}