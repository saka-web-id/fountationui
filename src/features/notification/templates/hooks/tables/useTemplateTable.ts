import { computed, h } from 'vue'
import { createColumnHelper } from '@tanstack/vue-table'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useApi } from "~/composables/useApi"
import { useDataTable } from '~/composables/useDataTable'
import { useAuthStore } from '~/stores/auth'
import type { TemplateSimpleDTO } from '../../interfaces/template.interface'

export function useTemplateTable(companyIdParam: number, onEdit: (template: TemplateSimpleDTO) => void) {
    const { t } = useI18n()
    const router = useRouter()
    const auth = useAuthStore()

    // API State
    const { data, get } = useApi<TemplateSimpleDTO[]>()

    const templates = computed(() => data.value || [])
    const columnHelper = createColumnHelper<TemplateSimpleDTO>()

    // Helper functions for navigation
    const goToDesigner = (templateId: number) => {
        if (window.innerWidth < 768) {
            alert(t('textError.desktopOnly'));
            return;
        }
        router.push({ name: 'notificationTemplateDesigner', params: { companyId: companyIdParam, templateId } });
    };

    // Column Definitions
    const columns = [
        columnHelper.accessor('notiTemplateId', {
            header: () => t('textLabel.number'),
            cell: info => info.getValue(),
            meta: { className: 'd-none d-md-table-cell' }
        }),
        columnHelper.accessor('notiTemplateName', {
            header: () => t('textLabel.name'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('notiTemplateType', {
            header: () => t('textLabel.type'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('notiTemplateSubject', {
            header: () => t('textLabel.subject'),
            cell: info => info.getValue(),
            meta: { className: 'd-none d-md-table-cell' }
        }),
        columnHelper.display({
            id: 'actions',
            header: () => t('textLabel.action'),
            cell: info => {
                const row = info.row.original;
                const buttons = [
                    h('button', {
                        class: 'btn btn-primary btn-sm me-1',
                        onClick: () => onEdit(row)
                    }, t('button.edit'))
                ];

                if (row.notiTemplateType === 'EMAIL') {
                    buttons.push(h('button', {
                        class: 'btn btn-info btn-sm',
                        onClick: () => goToDesigner(row.notiTemplateId)
                    }, t('button.view')));
                }

                return h('div', { class: 'btn-group' }, buttons);
            }
        }),
    ]

    const { table, globalFilter } = useDataTable(templates, columns)

    const fetchData = async () => {
        const url = `/v0/notification/templates/list/companyId/${auth.user?.company.companyId}/userId/${auth.user?.id}/valueCompanyId/${companyIdParam}`;
        await get(url)
    }

    return {
        table,
        globalFilter,
        fetchData,
        t
    }
}
