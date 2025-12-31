import { reactive } from 'vue';

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
}

interface Authority {
    roleId: number;
    roleName: string;
    roleDescription: string;
    permissions: Permission[];
}

interface Permission {
    permissionName: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
}

export const auth = reactive<AuthState>({
    user: null,
    isAuthenticated: false,
});