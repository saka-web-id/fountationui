// hooks/useLoginApi.ts
import { useFetch } from '../../../composables/useFetch';

interface RegisterPayload {
    company: string;
    username: string;
    email: string;
    password: string;
}

export function useRegisterApi() {
    const { data, error, loading, request } = useFetch<{ token: string }>();

    const register = async (payload: RegisterPayload) => {
        return await request('/user/register/new', {
            method: 'POST',
            body: payload,
        });
    };

    return {
        register,
        data,
        error,
        loading,
    };
}