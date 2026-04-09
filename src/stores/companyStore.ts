import { defineStore } from 'pinia';
import type { Company } from "~/features/company/interfaces/company.interfaces.ts";

export const useCompanyStore = defineStore('company', {
    state: () => ({
        updatePayload: null as Company | null
    }),

    actions: {
        setUpdatePayload(payload: Company) {
            this.updatePayload = payload;
        },

        clear() {
            this.updatePayload = null;
        }
    }
});
