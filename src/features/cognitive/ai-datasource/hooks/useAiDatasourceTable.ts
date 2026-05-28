import { ref, computed, watch, h } from 'vue';
import { createColumnHelper } from '@tanstack/vue-table';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '~/stores/auth';
import { aiDatasourceService } from '~/services/cognitive/aiDatasourceService';
import { useDataTable } from '~/composables/useDataTable';
import type { AiDatasourceDTO } from '~/types/cognitive-datasource';

export function useAiDatasourceTable(valueCompanyId: string, onEdit: (row: AiDatasourceDTO) => void) {
    const { t } = useI18n();
    const authStore = useAuthStore();
    
    const data = ref<AiDatasourceDTO[]>([]);
    const totalItems = ref(0);
    const searchName = ref("");
    
    const pagination = ref({
        pageIndex: 0,
        pageSize: 100, // Default 100 as requested
    });

    const sorting = ref([{ id: 'aiDatasourceCompanyCode', desc: false }]); // Sort by code as requested

    const fetchAiDatasources = async () => {
        const companyId = authStore.user?.company?.companyId;
        const userId = authStore.user?.id;
        if (!companyId || !userId || !valueCompanyId) return;

        try {
            const response = await aiDatasourceService.getAiDatasources(companyId, userId, valueCompanyId, {
                name: searchName.value,
                page: pagination.value.pageIndex,
                size: pagination.value.pageSize
            });

            if (response.data) {
                data.value = response.data.aiDatasourceData || [];
                totalItems.value = response.data.aiDatasourceTotalItems || 0;
            }
        } catch (error) {
            console.error("Failed to fetch AI datasources", error);
        }
    };

    const columnHelper = createColumnHelper<AiDatasourceDTO>();
    const columns = [
        columnHelper.accessor('aiDatasourceCompanyCode', {
            header: () => t('cognitive.companyCode'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('aiDatasourceName', {
            header: () => t('cognitive.datasourceName'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('aiDatasourceSourceService', {
            header: () => t('cognitive.sourceService'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('aiDatasourceKafkaTopic', {
            header: () => t('cognitive.kafkaTopic'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('aiDatasourceIsActive', {
            header: () => t('cognitive.active'),
            cell: info => info.getValue() ? t('textLabel.true') : t('textLabel.false'),
        }),
        columnHelper.accessor('aiDatasourceTotalIngestedRecords', {
            header: () => t('cognitive.ingestedRecords'),
            cell: info => info.getValue().toLocaleString(),
        }),
        columnHelper.display({
            id: 'actions',
            header: () => t('textLabel.action'),
            cell: info => h('button', {
                class: 'btn btn-outline-primary btn-sm',
                onClick: () => onEdit(info.row.original)
            }, [
                h('i', { class: 'bi bi-pencil-square me-1' }),
                t('button.edit')
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
            fetchAiDatasources();
        },
        onPaginationChange: (updater) => {
            if (typeof updater === 'function') {
                pagination.value = updater(pagination.value);
            } else {
                pagination.value = updater;
            }
            fetchAiDatasources();
        }
    });

    // Watch for search changes
    watch(searchName, () => {
        pagination.value.pageIndex = 0;
        fetchAiDatasources();
    });

    return {
        table,
        globalFilter,
        searchName,
        pagination,
        fetchAiDatasources,
        t
    };
}
