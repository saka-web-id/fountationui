import { ref, computed, watch, h } from 'vue';
import { createColumnHelper } from '@tanstack/vue-table';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '~/stores/auth';
import { objectUploadService } from '~/services/storage/objectUploadService';
import { useDataTable } from '~/composables/useDataTable';
import type { ObjectsDTO } from '~/types/registry';

export function useObjectUploadTable(valueCompanyId: number, onShowMetadata?: (obj: ObjectsDTO) => void) {
    const { t } = useI18n();
    const authStore = useAuthStore();
    
    const data = ref<ObjectsDTO[]>([]);
    const totalItems = ref(0);
    const searchName = ref("");
    
    const pagination = ref({
        pageIndex: 0,
        pageSize: 100, // Default 100
    });

    const sorting = ref([{ id: 'objectCreatedAt', desc: true }]);

    const fetchObjects = async () => {
        const companyId = authStore.user?.company?.companyId;
        const userId = authStore.user?.id;
        if (!companyId || !userId || !valueCompanyId) return;

        try {
            const response = await objectUploadService.getObjects(companyId, userId, valueCompanyId, {
                name: searchName.value,
                page: pagination.value.pageIndex,
                size: pagination.value.pageSize
            });

            if (response.data) {
                data.value = response.data.objectsData || [];
                totalItems.value = response.data.objectsTotalItems || 0;
            }
        } catch (error) {
            console.error("Failed to fetch objects", error);
        }
    };

    const columnHelper = createColumnHelper<ObjectsDTO>();
    const columns = [
        columnHelper.accessor('objectOriginalName', {
            header: () => t('textLabel.name'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('objectKey', {
            header: () => t('textLabel.key'),
            cell: info => info.getValue(),
            meta: { className: 'd-none d-md-table-cell' }
        }),
        columnHelper.accessor('objectMimeType', {
            header: () => t('textLabel.type'),
            cell: info => info.getValue(),
            meta: { className: 'd-none d-lg-table-cell' }
        }),
        columnHelper.accessor('objectSizeBytes', {
            header: () => 'Size (Bytes)',
            cell: info => info.getValue()?.toLocaleString(),
            meta: { className: 'd-none d-md-table-cell' }
        }),
        columnHelper.accessor('objectStatus', {
            header: () => t('textLabel.status'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('objectCreatedAt', {
            header: () => t('textLabel.createdAt'),
            cell: info => info.getValue() ? new Date(info.getValue()!).toLocaleString() : '-',
            meta: { className: 'd-none d-lg-table-cell' }
        }),
        columnHelper.display({
            id: 'actions',
            header: () => t('textLabel.action'),
            cell: info => h('button', {
                class: 'btn btn-sm btn-outline-info',
                onClick: () => onShowMetadata?.(info.row.original)
            }, [
                h('i', { class: 'bi bi-info-circle me-1' }),
                'Metadata'
            ])
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
            fetchObjects();
        },
        onPaginationChange: (updater) => {
            if (typeof updater === 'function') {
                pagination.value = updater(pagination.value);
            } else {
                pagination.value = updater;
            }
            fetchObjects();
        }
    });

    // Watch for search changes
    watch(searchName, () => {
        pagination.value.pageIndex = 0;
        fetchObjects();
    });

    return {
        table,
        globalFilter,
        searchName,
        pagination,
        fetchObjects,
        t
    };
}
