// hooks/useRegisterForm.ts
import { useForm } from 'vee-validate'
import { useCompanyUpdateSchema } from '../schemas/companyUpdate.schema';

export interface CompanyUpdatePayload {
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
    companyCreatedAt: string;
    companyUpdatedAt: string;
}


export function useRegisterForm() {
    // useForm with schema
    const {  defineField, handleSubmit } = useForm<CompanyUpdatePayload>({
        validationSchema: useCompanyUpdateSchema,
        initialValues: {companyId: 0, companyName: "", companyAddress: "", companyPhone: "", companyEmail: "", companyWebsite: "", companyDescription: "", companyLogoUrl:"",  companyTaxId:"", companyRegistrationId:"", companyStatus:"", companyIndustry:"", companyType:"", companyCreatedAt:"", companyUpdatedAt:""}
    })

    // define fields
    const [companyId, companyIdAttrs] = defineField('companyId');
    const [companyName, companyNameAttrs] = defineField('companyName');
    const [companyAddress, companyAddressAttrs] = defineField('companyAddress');
    const [companyPhone, companyPhoneAttrs] = defineField('companyPhone');
    const [companyEmail, companyEmailAttrs] = defineField('companyEmail');
    const [companyWebsite, companyWebsiteAttrs] = defineField('companyWebsite');
    const [companyDescription, companyDescriptionAttrs] = defineField('companyDescription');
    const [companyLogoUrl, companyLogoUrlAttrs] = defineField('companyLogoUrl');
    const [companyTaxId, companyTaxIdAttrs] = defineField('companyTaxId');
    const [companyRegistrationId, companyRegistrationIdAttrs] = defineField('companyRegistrationId');
    const [companyStatus, companyStatusAttrs] = defineField('companyStatus');
    const [companyIndustry, companyIndustryAttrs] = defineField('companyIndustry');
    const [companyType, companyTypeAttrs] = defineField('companyType');
    const [companyCreatedAt, companyCreatedAtAttrs] = defineField('companyCreatedAt');
    const [companyUpdatedAt, companyUpdatedAtAttrs] = defineField('companyUpdatedAt');

    return {
        handleSubmit,
        companyId,
        companyIdAttrs,
        companyName,
        companyNameAttrs,
        companyAddress,
        companyAddressAttrs,
        companyPhone,
        companyPhoneAttrs,
        companyEmail,
        companyEmailAttrs,
        companyWebsite,
        companyWebsiteAttrs,
        companyDescription,
        companyDescriptionAttrs,
        companyLogoUrl,
        companyLogoUrlAttrs,
        companyTaxId,
        companyTaxIdAttrs,
        companyRegistrationId,
        companyRegistrationIdAttrs,
        companyStatus,
        companyStatusAttrs,
        companyIndustry,
        companyIndustryAttrs,
        companyType,
        companyTypeAttrs,
        companyCreatedAt,
        companyCreatedAtAttrs,
        companyUpdatedAt,
        companyUpdatedAtAttrs
    }
}