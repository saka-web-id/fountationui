

export interface CompanySimplePayload {
    companyId: number;
    companyName: string;
    companyEmail: string;
}

export interface Company {
    companyId?: number; // Made optional for creation scenarios
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
    companyCreatedAt?: string; // Made optional for creation scenarios
    companyUpdatedAt?: string; // Made optional for creation scenarios
}

export interface CompanyCreatePayload {
    companyName: string;
    companyPhone: string;
    companyEmail: string;
    companyAddress: string;
    companyWebsite: string;
    companyStatus: string;
    companyLogoUrl: string;
    companyTaxId: string;
    companyRegistrationId: string;
    companyIndustry: string;
    companyType: string;
    companyDescription: string;
}