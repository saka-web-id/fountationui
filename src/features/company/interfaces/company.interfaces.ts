export interface Company {
    companyId?: number;
    companyCode: string;
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
    companyCreatedAt?: string;
    companyUpdatedAt?: string;
    companyIsDefault?: boolean;
}

export interface CompanySimplePayload {
    companyId: number;
    companyCode: string;
    companyName: string;
    companyEmail: string;
}

export interface OrganizationDTO {
    companyCode: string;
    companyName: string;
    companyAddress: string;
    companyPhone: string;
    companyEmail: string;
    companyWebsite: string;
    companyDescription: string;
    departmentName: string;
    departmentDescription: string;
}

export interface OrganizationStructureDTO {
    companyCode: string;
    companyName: string;
    companyAddress: string;
    companyPhone: string;
    companyEmail: string;
    companyWebsite: string;
    companyDescription: string;
    departments: any[]; // Use actual DepartmentDTO if available, otherwise any
}
