import { computed, h } from "vue";
import { useI18n } from "vue-i18n";
import { useApi } from "~/composables/useApi.ts";
import { useAuthStore } from "~/stores/auth.ts";
import { createColumnHelper } from "@tanstack/vue-table";
import { useDataTable } from "~/composables/useDataTable.ts";
import type { NotificationCategorySimple, NotificationCategorySimplePayload } from "~/features/notification/settings/category/interfaces/notificationCategory.interfaces.ts";
import { toNotificationCategorySimple } from "~/features/notification/settings/category/api/notificationCategory.mapper.ts";

export function useNotificationCategoryTable(companyIdParam: number, onEdit: (id: number) => void) {
    const { t } = useI18n();
    const auth = useAuthStore();
    const { data, get, loading } = useApi<NotificationCategorySimplePayload[]>();

    const categories = computed(() => (data.value || []).map(toNotificationCategorySimple));

    const columnHelper = createColumnHelper<NotificationCategorySimple>();

    const columns = [
        columnHelper.accessor('id', {
            header: () => t('textLabel.number'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('name', {
            header: () => t('textLabel.name'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('priority', {
            header: () => t('textLabel.priority'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('createdAt', {
            header: () => t('textLabel.createdAt'),
            cell: info => info.getValue(),
        }),
        columnHelper.display({
            id: 'actions',
            header: () => t('textLabel.action'),
            cell: info => h('button', {
                class: 'btn btn-sm btn-primary',
                onClick: () => onEdit(info.row.original.id)
            }, t('button.view')),
        }),
    ];

    const { table, globalFilter } = useDataTable(categories, columns);

    const fetchData = async () => {
        await get(`/v0/notification/category/list/companyId/${auth.user?.company.companyId}/userId/${auth.user?.id}/valueCompanyId/${companyIdParam}`);
    };

    return {
        table,
        globalFilter,
        fetchData,
        loading,
        t
    };
}
