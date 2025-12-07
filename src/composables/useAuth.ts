import { ref } from 'vue'
import axios from 'axios'
import type { AxiosResponse } from 'axios'

export interface UserInfo {
    username: string
    roles: { authority: string }[]
}

const user = ref<string | null>(null)
const roles = ref<string[]>([])

export function useAuth() {
    const fetchUser = async (): Promise<void> => {
        try {
            const res: AxiosResponse<UserInfo> = await axios.get('http://www.myproject.local:8080/user/detail', { withCredentials: true })
            user.value = res.data.username
            roles.value = res.data.roles.map(r => r.authority)
        } catch (e) {
            user.value = null
            roles.value = []
        }
    }

    const hasRole = (role: string): boolean => roles.value.includes(role)

    const logout = async (): Promise<void> => {
        await axios.post('http://www.myproject.local:8080/user/logout', {}, { withCredentials: true })
        user.value = null
        roles.value = []
    }

    return {
        user,
        roles,
        fetchUser,
        hasRole,
        logout
    }
}