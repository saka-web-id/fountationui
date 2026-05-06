import { ref, computed, watch } from 'vue';
import { createColumnHelper } from '@tanstack/vue-table';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '~/stores/auth';
import { countryService } from '~/services/registry/countryService';
import { useDataTable } from '~/composables/useDataTable';
import type { CountryDTO } from '~/types/registry';

export function useCountryTable() {
    const { t } = useI18n();
    const authStore = useAuthStore();
    
    const data = ref<CountryDTO[]>([]);
    const totalItems = ref(0);
    const countryNameSearch = ref("");
    
    const pagination = ref({
        pageIndex: 0,
        pageSize: 100, // Default 100
    });

    const fetchCountries = async () => {
        const companyId = authStore.user?.company?.companyId;
        const userId = authStore.user?.id;
        if (!companyId || !userId) return;

        try {
            const response = await countryService.getCountries(companyId, userId, {
                name: countryNameSearch.value,
                page: pagination.value.pageIndex,
                size: pagination.value.pageSize
            });

            if (response.data) {
                data.value = response.data.repoCountryData || [];
                totalItems.value = response.data.repoCountryTotalItems || 0;
            }
        } catch (error) {
            console.error("Failed to fetch countries", error);
        }
    };

    const columnHelper = createColumnHelper<CountryDTO>();
    const columns = [
        columnHelper.accessor('repoCountryId', {
            header: () => t('textLabel.number'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('repoCountryCode', {
            header: () => t('registry.code'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('repoCountryName', {
            header: () => t('registry.name'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('repoCountryPhoneCode', {
            header: () => t('registry.phoneCode'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('repoCountryActive', {
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
            fetchCountries();
        }
    });

    // Watch for search changes
    watch(countryNameSearch, () => {
        pagination.value.pageIndex = 0;
        fetchCountries();
    });

    return {
        table,
        globalFilter,
        countryNameSearch,
        pagination,
        fetchCountries,
        t
    };
}
