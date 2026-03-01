import { ref } from 'vue';

interface FetchOptions extends RequestInit {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: any; // optional, for POST/PUT
}


export function useFetch<T = any>() {
    const loading = ref(false);
    const error = ref<string | null>(null);
    const data = ref<T | null>(null);

    const request = async (url: string, options: FetchOptions = {}): Promise<T> => {
        loading.value = true;
        error.value = null;

        try {
            const { method = 'GET', body, ...rest } = options;

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    ...(rest.headers || {}),
                },
                body: body ? JSON.stringify(body) : undefined,
                ...rest,
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || 'Fetch error');
            }

            const result = await res.json();
            data.value = result;
            return result;
        } catch (err: any) {
            error.value = err.message || 'Unknown error';
            throw err;
        } finally {
            loading.value = false;
        }
    };

    return {
        data,
        error,
        loading,
        request, // call request(url, { method, body }) to make GET/POST
    };
}