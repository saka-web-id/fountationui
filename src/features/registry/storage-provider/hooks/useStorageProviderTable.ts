import { ref, computed, watch, h } from 'vue';
import { createColumnHelper } from '@tanstack/vue-table';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '~/stores/auth';
import { objectStorageProviderService } from '~/services/registry/objectStorageProviderService';
import { useDataTable } from '~/composables/useDataTable';
import type { ObjectStorageProviderDTO } from '~/types/registry';

export function useStorageProviderTable(onEdit?: (provider: ObjectStorageProviderDTO) => void) {
    const { t } = useI18n();
    const authStore = useAuthStore();
    
    const data = ref<ObjectStorageProviderDTO[]>([]);
    const totalItems = ref(0);
    const searchName = ref("");
    
    const pagination = ref({
        pageIndex: 0,
        pageSize: 100, // Default 100
    });

    const sorting = ref([{ id: 'objectStorageProviderCode', desc: false }]);

    const fetchStorageProviders = async () => {
        const companyId = authStore.user?.company?.companyId;
        const userId = authStore.user?.id;
        if (!companyId || !userId) return;

        try {
            const response = await objectStorageProviderService.getStorageProviders(companyId, userId, {
                name: searchName.value,
                page: pagination.value.pageIndex,
                size: pagination.value.pageSize
            });

            if (response.data) {
                data.value = response.data.objectStorageProviderData || [];
                totalItems.value = response.data.objectStorageProviderTotalItems || 0;
            }
        } catch (error) {
            console.error("Failed to fetch storage providers", error);
        }
    };

    const columnHelper = createColumnHelper<ObjectStorageProviderDTO>();
    const columns = [
        columnHelper.accessor('objectStorageProviderCode', {
            header: () => t('registry.code'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('objectStorageProviderType', {
            header: () => t('registry.type'),
            cell: info => info.getValue(),
            meta: { className: 'd-none d-md-table-cell' }
        }),
        columnHelper.accessor('objectStorageProviderEndpoint', {
            header: () => t('registry.endpoint'),
            cell: info => info.getValue(),
            meta: { className: 'd-none d-md-table-cell' }
        }),
        columnHelper.accessor('objectStorageProviderRegion', {
            header: () => t('registry.region'),
            cell: info => info.getValue(),
            meta: { className: 'd-none d-lg-table-cell' }
        }),
        columnHelper.accessor('objectStorageProviderIsActive', {
            header: () => t('registry.active'),
            cell: info => info.getValue() ? t('textLabel.true') : t('textLabel.false'),
        }),
        columnHelper.display({
            id: 'actions',
            header: () => t('textLabel.action'),
            cell: info => h('button', {
                class: 'btn btn-sm btn-outline-primary',
                onClick: () => onEdit?.(info.row.original)
            }, t('button.edit'))
        }),
    ];

    const pageCount = computed(() => Math.ceil(totalItems.value / pagination.value.pageSize));

    const { table, globalFilter } = useDataTable(data, columns, {
        manualPagination: true,
        get pageCount() { return pageCount.value },
        pagination,
        state: {
            get sorting() { return sorting.value },
        },
        onSortingChange: (updater) => {
            if (typeof updater === 'function') {
                sorting.value = updater(sorting.value);
            } else {
                sorting.value = updater;
            }
            fetchStorageProviders();
        },
        onPaginationChange: (updater) => {
            if (typeof updater === 'function') {
                pagination.value = updater(pagination.value);
            } else {
                pagination.value = updater;
            }
            fetchStorageProviders();
        }
    });

    // Watch for search changes
    watch(searchName, () => {
        pagination.value.pageIndex = 0;
        fetchStorageProviders();
    });

    return {
        table,
        globalFilter,
        searchName,
        pagination,
        fetchStorageProviders,
        t
    };
}
