
import { defineStore } from 'pinia'


interface User {
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

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        user: null,
        isAuthenticated: false,
    }),
    persist: true, // 👈 requires pinia-plugin-persistedstate
})

