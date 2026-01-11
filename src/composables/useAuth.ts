import { useApi } from "~/composables/useApi.ts";
import { useAuthStore } from '~/stores/auth'

export function useAuth() {
    return useAuthStore()
}

export async function fetchUser() {
    const auth = useAuthStore()   // ✅ called inside function
    const { data, get } = useApi()

    try {
        await get('/api/v0/user/detail/')
        console.log("User Detail Login : " + JSON.stringify(data.value))

        auth.user = data.value
        auth.isAuthenticated = !!auth.user
    } catch (err) {
        auth.user = null
        auth.isAuthenticated = false
    }
}

export function hasRole(role: string): boolean {
    const auth = useAuthStore()   // ✅ called inside function
    if (!auth.user || !auth.user.authority || !auth.user.authority.roleName) return false
    return auth.user.authority.roleName.includes(role.toUpperCase())
}