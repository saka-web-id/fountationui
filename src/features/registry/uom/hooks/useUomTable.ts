import { ref, computed, watch } from 'vue';
import { createColumnHelper } from '@tanstack/vue-table';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '~/stores/auth';
import { uomService } from '~/services/registry/uomService';
import { useDataTable } from '~/composables/useDataTable';
import type { UoMDTO } from '~/types/registry';

export function useUomTable() {
    const { t } = useI18n();
    const authStore = useAuthStore();
    
    const data = ref<UoMDTO[]>([]);
    const totalItems = ref(0);
    const uomNameSearch = ref("");
    
    const pagination = ref({
        pageIndex: 0,
        pageSize: 100, // Default 100
    });

    const fetchUoms = async () => {
        const companyId = authStore.user?.company?.companyId;
        const userId = authStore.user?.id;
        if (!companyId || !userId) return;

        try {
            const response = await uomService.getUoms(companyId, userId, {
                name: uomNameSearch.value,
                page: pagination.value.pageIndex,
                size: pagination.value.pageSize
            });

            if (response.data) {
                data.value = response.data.repoUomData || [];
                totalItems.value = response.data.repoUomTotalItems || 0;
            }
        } catch (error) {
            console.error("Failed to fetch UOMs", error);
        }
    };

    const columnHelper = createColumnHelper<UoMDTO>();
    const columns = [
        columnHelper.accessor('registryUomId', {
            header: () => t('textLabel.number'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('registryUomCategoryId', {
            header: () => t('registry.uomCategoryId'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('registryUomName', {
            header: () => t('registry.uomName'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('registryUomType', {
            header: () => t('registry.uomType'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('registryUomFactor', {
            header: () => t('registry.uomFactor'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('registryUomActive', {
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
            fetchUoms();
        }
    });

    // Watch for search changes
    watch(uomNameSearch, () => {
        pagination.value.pageIndex = 0;
        fetchUoms();
    });

    return {
        table,
        globalFilter,
        uomNameSearch,
        pagination,
        fetchUoms,
        t
    };
}
