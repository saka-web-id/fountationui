import { ref, computed, watch } from 'vue';
import { createColumnHelper } from '@tanstack/vue-table';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '~/stores/auth';
import { countryStateService } from '~/services/registry/countryStateService';
import { useDataTable } from '~/composables/useDataTable';
import type { CountryStateDTO } from '~/types/registry';

export function useCountryStateTable() {
    const { t } = useI18n();
    const authStore = useAuthStore();
    
    const data = ref<CountryStateDTO[]>([]);
    const totalItems = ref(0);
    const countryId = ref(1); // Default countryId = 1
    const countryNameSearch = ref(""); // The search bar mentioned "by Country name"
    
    const pagination = ref({
        pageIndex: 0,
        pageSize: 100, // User mentioned "default data is 100 data"
    });

    const fetchCountryStates = async () => {
        const companyId = authStore.user?.company?.companyId;
        const userId = authStore.user?.id;
        if (!companyId || !userId) return;

        try {
            const response = await countryStateService.getCountryStates(companyId, userId, countryId.value, {
                name: countryNameSearch.value,
                page: pagination.value.pageIndex,
                size: pagination.value.pageSize
            });

            if (response.data) {
                data.value = response.data.repoCountryStateData || [];
                totalItems.value = response.data.repoCountryStateTotalItems || 0;
            }
        } catch (error) {
            console.error("Failed to fetch country states", error);
        }
    };

    const columnHelper = createColumnHelper<CountryStateDTO>();
    const columns = [
        columnHelper.accessor('registryCountryStateId', {
            header: () => t('textLabel.number'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('registryCountryId', {
            header: () => t('registry.country'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('registryCountryStateCode', {
            header: () => t('registry.code'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('registryCountryStateName', {
            header: () => t('registry.name'),
            cell: info => info.getValue(),
        }),
    ];

    const pageCount = computed(() => Math.ceil(totalItems.value / pagination.value.pageSize));

    const { table, globalFilter } = useDataTable(data, columns, {
        manualPagination: true,
        get pageCount() { return pageCount.value },
        pagination,
        onPaginationChange: (updater) => {
            if (typeof updater === 'function') {
                pagination.value = updater(pagination.value);
            } else {
                pagination.value = updater;
            }
            fetchCountryStates();
        }
    });

    // Watch for search or countryId changes
    watch([countryNameSearch, countryId], () => {
        pagination.value.pageIndex = 0;
        fetchCountryStates();
    });

    return {
        table,
        globalFilter,
        countryId,
        countryNameSearch,
        pagination,
        fetchCountryStates,
        t
    };
}
