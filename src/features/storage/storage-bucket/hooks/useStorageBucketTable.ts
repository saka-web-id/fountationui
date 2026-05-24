import { ref, computed, watch, h } from 'vue';
import { createColumnHelper } from '@tanstack/vue-table';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '~/stores/auth';
import { objectBucketService } from '~/services/storage/objectBucketService';
import { useDataTable } from '~/composables/useDataTable';
import type { ObjectBucketDTO } from '~/types/registry';

export function useStorageBucketTable(valueCompanyId: number, onEdit?: (bucket: ObjectBucketDTO) => void) {
    const { t } = useI18n();
    const authStore = useAuthStore();
    
    const data = ref<ObjectBucketDTO[]>([]);
    const totalItems = ref(0);
    const searchName = ref("");
    
    const pagination = ref({
        pageIndex: 0,
        pageSize: 100, // Default 100
    });

    const sorting = ref([{ id: 'objectBucketCode', desc: false }]);

    const fetchBuckets = async () => {
        const companyId = authStore.user?.company?.companyId;
        const userId = authStore.user?.id;
        if (!companyId || !userId || !valueCompanyId) return;

        try {
            const response = await objectBucketService.getBuckets(companyId, userId, valueCompanyId, {
                name: searchName.value,
                page: pagination.value.pageIndex,
                size: pagination.value.pageSize
            });

            if (response.data) {
                data.value = response.data.objectBucketData || [];
                totalItems.value = response.data.objectBucketTotalItems || 0;
            }
        } catch (error) {
            console.error("Failed to fetch storage buckets", error);
        }
    };

    const columnHelper = createColumnHelper<ObjectBucketDTO>();
    const columns = [
        columnHelper.accessor('objectBucketCode', {
            header: () => t('registry.code'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('objectBucketName', {
            header: () => t('registry.name'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('objectBucketProviderId', {
            header: () => t('provider.name'),
            cell: info => info.getValue(),
            meta: { className: 'd-none d-md-table-cell' }
        }),
        columnHelper.accessor('objectBucketIsExposed', {
            header: () => t('registry.active'), // Using active as label for exposed status
            cell: info => info.getValue() ? t('textLabel.true') : t('textLabel.false'),
        }),
        columnHelper.display({
            id: 'actions',
            header: () => t('textLabel.action'),
            cell: info => h('button', {
                class: 'btn btn-sm btn-outline-primary',
                onClick: () => onEdit?.(info.row.original)
            }, t('button.view'))
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
            fetchBuckets();
        },
        onPaginationChange: (updater) => {
            if (typeof updater === 'function') {
                pagination.value = updater(pagination.value);
            } else {
                pagination.value = updater;
            }
            fetchBuckets();
        }
    });

    // Watch for search changes
    watch(searchName, () => {
        pagination.value.pageIndex = 0;
        fetchBuckets();
    });

    return {
        table,
        globalFilter,
        searchName,
        pagination,
        fetchBuckets,
        t
    };
}
