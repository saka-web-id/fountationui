import { reactive } from 'vue';

interface User {
    id: number;
    name: string;
    email: string;
    status: string;
    locale: string;
    role: string;
    department: string;
    organization: string;
    createdAt: string
    membershipStatus: string;
    membershipType: string;
    membershipStartDate: string;
    membershipEndDate: string;
}

/*
accountNumber  :    "JIP00010"
name    :    "sakoen"
email    :    "sakoen_not_death@yahoo.com"
accountStatus    :    "ACTIVE"
locale    :    null
role    :    null
department    :    null
organization    :    null
createdAt    :    "2025-12-08T16:38:40.10737Z"
membershipStatus    :    null
membershipType    :    "VIP"
membershipEndDate    :    "2025-12-08T12:32:41.945484Z"
membershipStartDate    :    "2025-12-08T12:32:41.945484Z"
*/

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
}

export const auth = reactive<AuthState>({
    user: null,
    isAuthenticated: false,
});