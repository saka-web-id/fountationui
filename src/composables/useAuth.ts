import { useApi } from "~/composables/useApi.ts";
import { auth } from '../stores/auth';

const { data, get } = useApi();

export const fetchUser = async () => {
    try {
        await get('/api/v0/user/detail');
        auth.user = data.value;
        auth.isAuthenticated = !!auth.user;
    } catch (err) {
        auth.user = null;
        auth.isAuthenticated = false;
    }
};

export const hasRole = (role: string): boolean => {
    if (!auth.user || !auth.user.role) return false;
    return auth.user.role.toLowerCase().includes(role.toLowerCase());
};