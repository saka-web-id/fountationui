import { ref } from 'vue'

export const globalError = ref<string | null>(null)

export function setGlobalError(message: string | null) {
    globalError.value = message
}
