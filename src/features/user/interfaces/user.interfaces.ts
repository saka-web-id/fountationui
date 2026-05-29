import type { Company } from "~/features/company/interfaces/company.interfaces";
import type { Department, DepartmentSimplePayload } from "~/features/department/interfaces/department.interfaces";

export interface Authority {
    roleId: number;
    roleName: string;
    roleDescription: string;
    permissions: Permission[];
}

export interface Permission {
    permissionName: string;
}

export interface UserAuth {
    id: number;
    name: string;
    email: string;
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

export interface UserAccountPayload {
    id: number;
    name: string;
    phone: string;
    email: string;
    note: string;
    status: string;
    isVerified: boolean;
    accountNumber: string;
    accountStatus: string;
    membershipType: string;
    membershipStatus: string;
    membershipPlanId: number;
    createdAt: string;              // ISO date string
    membershipStartDate: string;    // ISO date string
    membershipEndDate: string;      // ISO date string
    authority: Authority;
    company: Company;
    department: Department;
}

export interface UserPayload {
    userId: number;
    userEmail: string;
    userPhone: string;
    userName: string;
    userStatus: string;
    userIsVerified: string;
    userLastLoginAt: string;
    userCreatedAt: string;
    userUpdatedAt: string;
    userLeaderId: number;
    userNote: string;
}

export interface UserCompanyPayLoad {
    userId: number;
    userName: string;
    companyId: number;
    companyName: string;
    isDefault: boolean;
}

export interface UserTableData {
    userId: number;
    userName: string;
    userEmail: string;
    userStatus: string;
    userCreatedAt: string;
}

export interface UserCreatePayload {
    userEmail: string;
    userName: string;
    userPassword: string;
    userPhone: string;
    userStatus: string;
    userLastLoginAt: string;
}

export interface UserRegisterPayload {
    user: UserCreatePayload;
    account: AccountPayload;
    company: Company;
    department: DepartmentSimplePayload;
}

export interface AccountPayload {
    accountNumber: string
    accountStatus: string;
    membershipType: string;
    membershipStatus: string;
    createdAt: string;
    membershipStartDate: string;
    membershipEndDate: string;
}