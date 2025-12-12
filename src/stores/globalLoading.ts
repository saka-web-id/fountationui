import { ref } from 'vue'

export const globalLoading = ref(false)

export function setGlobalLoading(value: boolean) {
    globalLoading.value = value
}