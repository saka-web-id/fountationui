import { useForm } from 'vee-validate'
import { useCompanySchema } from '../schemas/company.schema.ts';
import type { Company } from "~/features/company/interfaces/company.interfaces.ts";

export const mapCompanyFromApi = (apiData: any): Company => ({
    companyId: apiData.companyId,
    companyName: apiData.companyName,
    companyAddress: apiData.companyAddress,
    companyPhone: apiData.companyPhone,
    companyEmail: apiData.companyEmail,
    companyWebsite: apiData.companyWebsite,
    companyDescription: apiData.companyDescription,
    companyLogoUrl: apiData.companyLogoUrl,
    companyTaxId: apiData.companyTaxId,
    companyRegistrationId: apiData.companyRegistrationId,
    companyStatus: apiData.companyStatus,
    companyIndustry: apiData.companyIndustry,
    companyType: apiData.companyType,
    companyCreatedAt: apiData.companyCreatedAt,
    companyUpdatedAt: apiData.companyUpdatedAt,
});


export function useCompanyForm() {
    // useForm with schema
    const {  defineField, handleSubmit, setValues } = useForm<Company>({
        validationSchema: useCompanySchema,
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
        setValues,
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