import { ref } from "vue";

export const globalSuccess = ref<string | null>(null);

export function setGlobalSuccess(message: string | null) {
    globalSuccess.value = message;
}

export function useGlobalSuccess() {
    return { globalSuccess };
}