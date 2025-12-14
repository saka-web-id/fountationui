import { defineStore } from 'pinia';
import type { CompanyUpdatePayload } from '~/features/company/hooks/forms/useCompanyUpdateForm';

export const useCompanyStore = defineStore('company', {
    state: () => ({
        updatePayload: null as CompanyUpdatePayload | null
    }),

    actions: {
        setUpdatePayload(payload: CompanyUpdatePayload) {
            this.updatePayload = payload;
        },

        clear() {
            this.updatePayload = null;
        }
    }
});
