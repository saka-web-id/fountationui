import { ref, watch, onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { 
    getCompanies, 
    getProviders 
} from '../../api/notificationProvider.service';
import type { 
    Company, 
    Provider, 
    NotificationType 
} from '../../interfaces/notificationProvider.interface';

export function useNotificationProviderForm() {
    const auth = useAuthStore();
    
    const notificationTypes: NotificationType[] = ['SMS', 'EMAIL', 'WHATAPPS'];
    
    const companies = ref<Company[]>([]);
    const providers = ref<Provider[]>([]);
    
    const filters = ref({
        notificationType: 'SMS' as NotificationType,
        companyId: auth.user?.company.companyId || null,
        providerId: null as number | null,
        dateFrom: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Last 7 days
        dateTo: new Date().toISOString().split('T')[0],
        size: 10
    });

    const fetchCompanies = async () => {
        if (!auth.user) return;
        try {
            const data = await getCompanies(auth.user.company.companyId ?? 0, auth.user.id ?? 0);
            companies.value = data;
            
            // If the current company is in the list, keep it, otherwise set to null or first
            if (filters.value.companyId && !data.find(c => c.companyId === filters.value.companyId)) {
                filters.value.companyId = data.length > 0 ? data[0].companyId : null;
            }
        } catch (error) {
            console.error("Failed to fetch companies:", error);
        }
    };

    const fetchProviders = async () => {
        if (!auth.user || !filters.value.companyId) {
            providers.value = [];
            filters.value.providerId = null;
            return;
        }
        try {
            const data = await getProviders(
                auth.user.company.companyId ?? 0,
                auth.user.id ?? 0,
                filters.value.companyId,
                filters.value.notificationType
            );
            providers.value = data;
            
            // Reset providerId if not in the new list
            if (filters.value.providerId && !data.find(p => p.providerId === filters.value.providerId)) {
                filters.value.providerId = null;
            } else if (data.length > 0 && !filters.value.providerId) {
                // Optionally select the first provider
                filters.value.providerId = data[0].providerId;
            } else if (data.length === 0) {
                filters.value.providerId = null;
            }
        } catch (error) {
            console.error("Failed to fetch providers:", error);
            providers.value = [];
            filters.value.providerId = null;
        }
    };

    // When company or notification type changes, refresh providers
    watch(() => [filters.value.companyId, filters.value.notificationType], async () => {
        await fetchProviders();
    });

    onMounted(async () => {
        await fetchCompanies();
        await fetchProviders();
    });

    return {
        filters,
        companies,
        providers,
        notificationTypes,
        fetchCompanies,
        fetchProviders
    };
}
