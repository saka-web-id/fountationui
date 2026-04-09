import { defineStore } from 'pinia'
import { type UserAuth } from "~/features/user/interfaces/user.interfaces.ts";


interface AuthState {
    user: UserAuth | null;
    isAuthenticated: boolean;
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        user: null,
        isAuthenticated: false,
    }),
    persist: true, // 👈 requires pinia-plugin-persistedstate
})
