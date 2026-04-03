import { createColumnHelper } from '@tanstack/vue-table'
import { useDataTable } from '~/composables/useDataTable'
import { h, type ComputedRef } from 'vue'
import { useI18n } from 'vue-i18n'

export function useSmsSettingContentEditTable(
  configsData: ComputedRef<any[]>,
  onEdit: (item: any, index: number) => void,
  onRemove: (index: number) => void
) {
  const { t } = useI18n()
  const columnHelper = createColumnHelper<any>()

  const columns = [
    columnHelper.accessor('providerConfigKey', {
      header: () => t('textLabel.key'),
      cell: info => h('span', info.getValue()),
    }),
    columnHelper.accessor('providerConfigValue', {
      header: () => t('textLabel.value'),
      cell: info => h('span', info.getValue()),
    }),
    columnHelper.accessor('providerConfigSecret', {
      header: () => t('textLabel.secret'),
      cell: info => h('input', {
        type: 'checkbox',
        checked: info.getValue(),
        disabled: true
      }),
    }),
    columnHelper.display({
      id: 'actions',
      header: () => t('textLabel.action'),
      cell: info => h('div', { class: 'd-flex gap-2' }, [
        h('button', {
          class: 'btn btn-warning btn-sm',
          onClick: () => onEdit(info.row.original, info.row.index)
        }, [
            h('i', { class: 'bi bi-pencil me-1' }),
            t('button.view')
        ]),

        h('button', {
          class: 'btn btn-danger btn-sm',
          onClick: () => onRemove(info.row.index)
        }, [
            h('i', { class: 'bi bi-trash me-1' }),
            t('button.delete')
        ])
      ]),
    }),
  ]

  const { table, globalFilter } = useDataTable(configsData, columns)

  return {
    table,
    globalFilter
  }
}
