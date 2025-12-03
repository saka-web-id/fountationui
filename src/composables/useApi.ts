import { ref } from 'vue'

function useApi<T = any>() {
    const data = ref<T | null>(null)
    const error = ref<string | null>(null)
    const loading = ref(false)

    async function request<R = T>(
        url: string,
        method: 'GET' | 'POST',
        body?: any
    ): Promise<R | null> {
        loading.value = true
        error.value = null

        try {
            const options: RequestInit = {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            if (body) options.body = JSON.stringify(body)

            const res = await fetch(url, options)

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`)
            }

            const result = (await res.json()) as R
            data.value = result as unknown as T

            return result
        } catch (err: any) {
            error.value = err.message
            return null
        } finally {
            loading.value = false
        }
    }

    const get = <R = T>(url: string) => request<R>(url, 'GET')
    const post = <R = T>(url: string, body: any) => request<R>(url, 'POST', body)

    return {
        data,
        error,
        loading,
        get,
        post,
    }
}

export default useApi