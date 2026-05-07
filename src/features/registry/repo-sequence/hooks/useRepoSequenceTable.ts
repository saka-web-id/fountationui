import { ref, computed, watch, h } from 'vue';
import { createColumnHelper } from '@tanstack/vue-table';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '~/stores/auth';
import { repoSequenceService } from '~/services/registry/repoSequenceService';
import { useDataTable } from '~/composables/useDataTable';
import type { RepoSequenceDTO } from '~/types/registry';

export function useRepoSequenceTable(valueCompanyId: number) {
    const { t } = useI18n();
    const authStore = useAuthStore();
    
    const data = ref<RepoSequenceDTO[]>([]);
    const totalItems = ref(0);
    const repoSequenceSearch = ref("");
    
    const pagination = ref({
        pageIndex: 0,
        pageSize: 100,
    });

    const selectedRepoSequence = ref<RepoSequenceDTO | null>(null);

    const fetchRepoSequences = async () => {
        const companyId = authStore.user?.company?.companyId;
        const userId = authStore.user?.id;
        if (!companyId || !userId || !valueCompanyId) return;

        try {
            const response = await repoSequenceService.getRepoSequences(companyId, userId, valueCompanyId, {
                name: repoSequenceSearch.value,
                page: pagination.value.pageIndex,
                size: pagination.value.pageSize
            });

            if (response.data) {
                data.value = response.data.repoSequenceData || [];
                totalItems.value = response.data.repoSequenceTotalItems || 0;
            }
        } catch (error) {
            console.error("Failed to fetch repo sequences", error);
        }
    };

    const editRepoSequence = (item: RepoSequenceDTO) => {
        selectedRepoSequence.value = { ...item };
    };

    const clearSelection = () => {
        selectedRepoSequence.value = null;
    };

    const columnHelper = createColumnHelper<RepoSequenceDTO>();
    const columns = [
        columnHelper.accessor('repoSequenceId', {
            header: () => t('textLabel.number'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('repoSequenceCode', {
            header: () => t('registry.code'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('repoSequenceName', {
            header: () => t('registry.name'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('repoSequencePrefix', {
            header: () => t('registry.prefix'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('repoSequenceSuffix', {
            header: () => t('registry.suffix'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('repoSequencePadding', {
            header: () => t('registry.padding'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('repoSequenceNextNumber', {
            header: () => t('registry.nextNumber'),
            cell: info => info.getValue(),
        }),
        columnHelper.display({
            id: 'actions',
            header: () => t('textLabel.action'),
            cell: info => h('button', {
                class: 'btn btn-outline-primary btn-sm',
                'data-bs-toggle': 'modal',
                'data-bs-target': '#repoSequenceModal',
                onClick: () => editRepoSequence(info.row.original)
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
            fetchRepoSequences();
        }
    });

    watch(repoSequenceSearch, () => {
        pagination.value.pageIndex = 0;
        fetchRepoSequences();
    });

    return {
        table,
        globalFilter,
        repoSequenceSearch,
        pagination,
        fetchRepoSequences,
        selectedRepoSequence,
        clearSelection,
        t
    };
}
