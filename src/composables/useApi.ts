import { ref } from "vue";
import api from "~/services/api";
import { setGlobalSuccess } from "~/stores/globalSuccess";
import { setGlobalError } from "~/stores/globalError";
import { setGlobalLoading } from "~/stores/globalLoading";

export function useApi<T = any>() {
    const data = ref<T | null>(null);
    const error = ref<string | null>(null);
    const loading = ref(false);

    async function request<R = T>(
        url: string,
        method: "GET" | "POST",
        body?: any
    ): Promise<R | null> {
        loading.value = true;
        setGlobalLoading(true);
        error.value = null;
        setGlobalError(null);
        setGlobalSuccess(null);


        try {
            const response = await api.request<R>({
                url,
                method,
                data: body ?? undefined,
            });

            data.value = response.data as unknown as T;

            // ✅ Set global success
            if (method === "POST") {
                setGlobalSuccess("Operation completed successfully");
            }

            return response.data;

        } catch (err: any) {
            error.value = err.message;
            setGlobalError(err.message);
            return null;

        } finally {
            loading.value = false;
            setGlobalLoading(false);
        }
    }

    const get = <R = T>(url: string) => request<R>(url, "GET");
    const post = <R = T>(url: string, body: any) => request<R>(url, "POST", body);

    return {
        data,
        error,
        loading,
        get,
        post,
    };
}