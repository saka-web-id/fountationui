import { computed, h } from 'vue';
import { createColumnHelper } from '@tanstack/vue-table';
import { useI18n } from 'vue-i18n';
import { useApi } from "~/composables/useApi";
import { useDataTable } from '~/composables/useDataTable';
import { useAuthStore } from '~/stores/auth';
import type { NotificationCampaignSimpleDTO } from "~/features/notification/campaign/interfaces/types.ts";

export function useCampaignTable(companyIdParam: string) {
    const { t } = useI18n();
    const auth = useAuthStore();
    const { data, get, put } = useApi<NotificationCampaignSimpleDTO[]>();

    const campaigns = computed(() => data.value || []);
    const columnHelper = createColumnHelper<NotificationCampaignSimpleDTO>();

    const onStartNow = async (campaignId: number) => {
        const userId = auth.user?.id;
        try {
            await put(`/v0/notification/campaign/startnow/companyId/${companyIdParam}/userId/${userId}`, { notiCampaignId: campaignId });
            await fetchData();
        } catch (e) {
            console.error("Failed to start campaign", e);
        }
    };

    const columns = [
        columnHelper.accessor('notiCampaignId', {
            header: () => h('span', { class: 'd-none d-md-inline' }, t('textLabel.number')),
            cell: info => h('span', { class: 'd-none d-md-inline' }, info.getValue()),
            meta: { className: 'd-none d-md-table-cell' }
        }),
        columnHelper.accessor('notiCampaignTitle', {
            header: () => t('campaign.title'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('notiCampaignStatus', {
            header: () => t('textLabel.status'),
            cell: info => h('span', { class: `badge ${getStatusBadgeClass(info.getValue())}` }, t(`status.${info.getValue().toLowerCase()}`)),
        }),
        columnHelper.accessor('notiCampaignScheduledAt', {
            header: () => t('campaign.scheduledAt'),
            cell: info => info.getValue() ? new Date(info.getValue()).toLocaleString() : '-',
        }),
        columnHelper.display({
            id: 'actions',
            header: () => t('textLabel.action'),
            cell: info => h('div', { class: 'btn-group' }, [
                h('button', {
                    class: 'btn btn-success btn-sm me-1',
                    onClick: () => onStartNow(info.row.original.notiCampaignId),
                    disabled: info.row.original.notiCampaignStatus !== 'SCHEDULED'
                }, t('button.start')),
                h('button', {
                    class: 'btn btn-primary btn-sm',
                    onClick: () => emitEdit(info.row.original.notiCampaignId)
                }, t('button.edit'))
            ]),
        }),
    ];

    const getStatusBadgeClass = (status: string) => {
        switch (status) {
            case 'SENT': return 'bg-success';
            case 'FAILED': return 'bg-danger';
            case 'SCHEDULED': return 'bg-info text-white';
            case 'STARTING': return 'bg-primary';
            case 'CANCELLED': return 'bg-secondary';
            default: return 'bg-light text-dark';
        }
    };

    const { table, globalFilter } = useDataTable(campaigns, columns);

    const fetchData = async () => {
        const userId = auth.user?.id;
        await get(`/v0/notification/campaign/list/companyId/${companyIdParam}/userId/${userId}`);
    };

    // We'll use an event emitter pattern or a callback for edit
    let editCallback: (id: number) => void = () => {};
    const onEdit = (cb: (id: number) => void) => {
        editCallback = cb;
    };
    const emitEdit = (id: number) => {
        editCallback(id);
    };

    return {
        table,
        globalFilter,
        fetchData,
        onEdit,
        t
    };
}
