import { ref, computed, watch } from 'vue';
import { createColumnHelper } from '@tanstack/vue-table';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '~/stores/auth';
import { currencyService } from '~/services/registry/currencyService';
import { useDataTable } from '~/composables/useDataTable';
import type { CurrencyDTO } from '~/types/registry';

export function useCurrencyTable() {
    const { t } = useI18n();
    const authStore = useAuthStore();
    
    const data = ref<CurrencyDTO[]>([]);
    const totalItems = ref(0);
    const currencyNameSearch = ref("");
    
    const pagination = ref({
        pageIndex: 0,
        pageSize: 100, // Default 100
    });

    const fetchCurrencies = async () => {
        const companyId = authStore.user?.company?.companyId;
        const userId = authStore.user?.id;
        if (!companyId || !userId) return;

        try {
            const response = await currencyService.getCurrencies(companyId, userId, {
                name: currencyNameSearch.value,
                page: pagination.value.pageIndex,
                size: pagination.value.pageSize
            });

            if (response.data) {
                data.value = response.data.repoCurrencyData || [];
                totalItems.value = response.data.repoCurrencyTotalItems || 0;
            }
        } catch (error) {
            console.error("Failed to fetch currencies", error);
        }
    };

    const columnHelper = createColumnHelper<CurrencyDTO>();
    const columns = [
        columnHelper.accessor('repoCurrencyId', {
            header: () => t('textLabel.number'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('repoCurrencyName', {
            header: () => t('registry.name'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('repoCurrencySymbol', {
            header: () => t('registry.symbol'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('repoCurrencyPosition', {
            header: () => t('registry.position'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('repoCurrencyActive', {
            header: () => t('registry.active'),
            cell: info => info.getValue() ? t('textLabel.true') : t('textLabel.false'),
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
            fetchCurrencies();
        }
    });

    // Watch for search changes
    watch(currencyNameSearch, () => {
        pagination.value.pageIndex = 0;
        fetchCurrencies();
    });

    return {
        table,
        globalFilter,
        currencyNameSearch,
        pagination,
        fetchCurrencies,
        t
    };
}
