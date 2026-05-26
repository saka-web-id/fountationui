import { ref, computed, watch, h } from 'vue';
import { createColumnHelper } from '@tanstack/vue-table';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '~/stores/auth';
import { aiProviderService } from '~/services/cognitive/aiProviderService';
import { useDataTable } from '~/composables/useDataTable';
import type { AiProviderDTO } from '~/types/registry';

export function useAiProviderTable(onEdit?: (provider: AiProviderDTO) => void) {
    const { t } = useI18n();
    const authStore = useAuthStore();
    
    const data = ref<AiProviderDTO[]>([]);
    const totalItems = ref(0);
    const searchName = ref("");
    
    const pagination = ref({
        pageIndex: 0,
        pageSize: 100, // Default 100
    });

    const sorting = ref([{ id: 'aiProviderName', desc: false }]);

    const fetchAiProviders = async () => {
        const companyId = authStore.user?.company?.companyId;
        const userId = authStore.user?.id;
        if (!companyId || !userId) return;

        try {
            const response = await aiProviderService.getAiProviders(companyId, userId, {
                name: searchName.value,
                page: pagination.value.pageIndex,
                size: pagination.value.pageSize
            });

            if (response.data) {
                data.value = response.data.aiProviderData || [];
                totalItems.value = response.data.aiProviderTotalItems || 0;
            }
        } catch (error) {
            console.error("Failed to fetch AI providers", error);
        }
    };

    const columnHelper = createColumnHelper<AiProviderDTO>();
    const columns = [
        columnHelper.accessor('aiProviderName', {
            header: () => t('textLabel.name'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('aiProviderApiBaseUrl', {
            header: () => 'API Base URL',
            cell: info => info.getValue(),
            meta: { className: 'd-none d-md-table-cell' }
        }),
        columnHelper.accessor('aiProviderChatModel', {
            header: () => 'Chat Model',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('aiProviderActive', {
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
            fetchAiProviders();
        },
        onPaginationChange: (updater) => {
            if (typeof updater === 'function') {
                pagination.value = updater(pagination.value);
            } else {
                pagination.value = updater;
            }
            fetchAiProviders();
        }
    });

    // Watch for search changes
    watch(searchName, () => {
        pagination.value.pageIndex = 0;
        fetchAiProviders();
    });

    return {
        table,
        globalFilter,
        searchName,
        pagination,
        fetchAiProviders,
        t
    };
}
