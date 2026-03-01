// hooks/useLoginApi.ts
import { useFetch } from '../../../composables/useFetch';


export interface RegisterPayload {
    company: string;
    username: string;
    email: string;
    password: string;
}

export function useRegisterApi() {
    const { data, error, loading, request } = useFetch<{ token: string }>();

    const register = async (payload: RegisterPayload) => {
        return await request('https://webhook.site/c1eb4f7f-87af-423b-831c-85d1f546f0d3', {
            mode: 'no-cors',
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