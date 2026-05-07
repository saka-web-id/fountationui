import { ref, computed, watch, h } from 'vue';
import { createColumnHelper } from '@tanstack/vue-table';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '~/stores/auth';
import { configParameterService } from '~/services/registry/configParameterService';
import { useDataTable } from '~/composables/useDataTable';
import type { ConfigParameterDTO } from '~/types/registry';

export function useConfigParameterTable() {
    const { t } = useI18n();
    const authStore = useAuthStore();
    
    const data = ref<ConfigParameterDTO[]>([]);
    const totalItems = ref(0);
    const configKeySearch = ref("");
    
    const pagination = ref({
        pageIndex: 0,
        pageSize: 100,
    });

    const selectedConfigParameter = ref<ConfigParameterDTO | null>(null);

    const fetchConfigParameters = async () => {
        const companyId = authStore.user?.company?.companyId;
        const userId = authStore.user?.id;
        if (!companyId || !userId) return;

        try {
            const response = await configParameterService.getConfigParameters(companyId, userId, {
                key: configKeySearch.value,
                page: pagination.value.pageIndex,
                size: pagination.value.pageSize
            });

            if (response.data) {
                data.value = response.data.repoConfigParamData || [];
                totalItems.value = response.data.repoConfigParamTotalItems || 0;
            }
        } catch (error) {
            console.error("Failed to fetch config parameters", error);
        }
    };

    const editConfigParameter = (item: ConfigParameterDTO) => {
        selectedConfigParameter.value = { ...item };
    };

    const clearSelection = () => {
        selectedConfigParameter.value = null;
    };

    const columnHelper = createColumnHelper<ConfigParameterDTO>();
    const columns = [
        columnHelper.accessor('configParamId', {
            header: () => t('textLabel.number'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('configParamKey', {
            header: () => t('registry.key'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('configParamValue', {
            header: () => t('registry.value'),
            cell: info => info.getValue(),
        }),
        columnHelper.display({
            id: 'actions',
            header: () => t('textLabel.action'),
            cell: info => h('button', {
                class: 'btn btn-outline-primary btn-sm',
                'data-bs-toggle': 'modal',
                'data-bs-target': '#configParameterModal',
                onClick: () => editConfigParameter(info.row.original)
            }, [
                h('i', { class: 'bi bi-pencil me-1' }),
                t('button.edit')
            ])
        })
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
            fetchConfigParameters();
        }
    });

    watch(configKeySearch, () => {
        pagination.value.pageIndex = 0;
        fetchConfigParameters();
    });

    return {
        table,
        globalFilter,
        configKeySearch,
        pagination,
        fetchConfigParameters,
        selectedConfigParameter,
        clearSelection,
        t
    };
}
