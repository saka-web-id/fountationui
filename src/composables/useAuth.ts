import { useApi } from "~/composables/useApi.ts";
import { auth } from '../stores/auth';

const { data, get } = useApi();

export const fetchUser = async () => {
    try {
        await get('/api/v0/user/detail');
        console.log("User Detail Login : " + JSON.stringify(data.value));

        auth.user = data.value;
        auth.isAuthenticated = !!auth.user;
    } catch (err) {
        auth.user = null;
        auth.isAuthenticated = false;
    }
};

export const hasRole = (role: string): boolean => {
    if (!auth.user || !auth.user.authority || !auth.user.authority.roleName) return false;
    return auth.user.authority.roleName.includes(role.toUpperCase());
};