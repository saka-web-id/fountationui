

export interface DepartmentSimplePayload {
    departmentName: string;
    departmentStatus: string;
    departmentDescription: string;
}


export interface DepartmentCompanySimplePayload {
    departmentId: number;
    companyId: number;
    departmentName: string;
    departmentStatus: string;
    departmentDescription: string;
    departmentCreatedAt: string;
    departmentUpdatedAt: string;
}

export interface Department {
    departmentId: number;
    departmentName: string;
    departmentStatus: string;
    departmentDescription: string;
    departmentCreatedAt: string;
    departmentUpdatedAt: string;
}