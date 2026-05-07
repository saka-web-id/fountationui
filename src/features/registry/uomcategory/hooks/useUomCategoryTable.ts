import { ref, computed, watch } from 'vue';
import { createColumnHelper } from '@tanstack/vue-table';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '~/stores/auth';
import { uomCategoryService } from '~/services/registry/uomCategoryService';
import { useDataTable } from '~/composables/useDataTable';
import type { UoMCategoryDTO } from '~/types/registry';

export function useUomCategoryTable() {
    const { t } = useI18n();
    const authStore = useAuthStore();
    
    const data = ref<UoMCategoryDTO[]>([]);
    const totalItems = ref(0);
    const categoryNameSearch = ref("");
    
    const pagination = ref({
        pageIndex: 0,
        pageSize: 100, // Default 100 as per requirement
    });

    const fetchUomCategories = async () => {
        const companyId = authStore.user?.company?.companyId;
        const userId = authStore.user?.id;
        if (!companyId || !userId) return;

        try {
            const response = await uomCategoryService.getUomCategories(companyId, userId, {
                name: categoryNameSearch.value,
                page: pagination.value.pageIndex,
                size: pagination.value.pageSize
            });

            if (response.data) {
                data.value = response.data.repoUomCategoryData || [];
                totalItems.value = response.data.repoUomCategoryTotalItems || 0;
            }
        } catch (error) {
            console.error("Failed to fetch UOM Categories", error);
        }
    };

    const columnHelper = createColumnHelper<UoMCategoryDTO>();
    const columns = [
        columnHelper.accessor('registryUomCategoryId', {
            header: () => t('textLabel.number'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('registryUomCategoryName', {
            header: () => t('registry.uomCategoryName'),
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
            fetchUomCategories();
        }
    });

    // Watch for search changes
    watch(categoryNameSearch, () => {
        pagination.value.pageIndex = 0;
        fetchUomCategories();
    });

    return {
        table,
        globalFilter,
        categoryNameSearch,
        pagination,
        fetchUomCategories,
        t
    };
}
