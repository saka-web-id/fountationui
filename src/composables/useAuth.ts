import axios from 'axios';
import { auth } from '../stores/auth';

export const fetchUser = async () => {
    try {
        const response = await axios.get('http://www.myproject.local:8080/user/detail', {
            withCredentials: true
        });
        auth.user = response.data;
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