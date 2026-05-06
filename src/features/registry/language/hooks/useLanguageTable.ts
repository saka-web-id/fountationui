import { ref, computed, watch } from 'vue';
import { createColumnHelper } from '@tanstack/vue-table';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '~/stores/auth';
import { languageService } from '~/services/registry/languageService';
import { useDataTable } from '~/composables/useDataTable';
import type { LanguageDTO } from '~/types/registry';

export function useLanguageTable() {
    const { t } = useI18n();
    const authStore = useAuthStore();
    
    const data = ref<LanguageDTO[]>([]);
    const totalItems = ref(0);
    const languageNameSearch = ref("");
    
    const pagination = ref({
        pageIndex: 0,
        pageSize: 100, // Default 100
    });

    const fetchLanguages = async () => {
        const companyId = authStore.user?.company?.companyId;
        const userId = authStore.user?.id;
        if (!companyId || !userId) return;

        try {
            const response = await languageService.getLanguages(companyId, userId, {
                name: languageNameSearch.value,
                page: pagination.value.pageIndex,
                size: pagination.value.pageSize
            });

            if (response.data) {
                data.value = response.data.repoLanguageData || [];
                totalItems.value = response.data.repoLanguageTotalItems || 0;
            }
        } catch (error) {
            console.error("Failed to fetch languages", error);
        }
    };

    const columnHelper = createColumnHelper<LanguageDTO>();
    const columns = [
        columnHelper.accessor('repoLanguageId', {
            header: () => t('textLabel.number'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('repoLanguageName', {
            header: () => t('registry.name'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('repoLanguageCode', {
            header: () => t('registry.code'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('repoLanguageIsoCode', {
            header: () => t('registry.isoCode'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('repoLanguageDirection', {
            header: () => t('registry.direction'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('repoLanguageActive', {
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
            fetchLanguages();
        }
    });

    // Watch for search changes
    watch(languageNameSearch, () => {
        pagination.value.pageIndex = 0;
        fetchLanguages();
    });

    return {
        table,
        globalFilter,
        languageNameSearch,
        pagination,
        fetchLanguages,
        t
    };
}
