import { defineStore } from 'pinia';
import type { CompanyPayload } from '~/features/company/hooks/forms/useCompanyForm.ts';

export const useCompanyStore = defineStore('company', {
    state: () => ({
        updatePayload: null as CompanyPayload | null
    }),

    actions: {
        setUpdatePayload(payload: CompanyPayload) {
            this.updatePayload = payload;
        },

        clear() {
            this.updatePayload = null;
        }
    }
});
