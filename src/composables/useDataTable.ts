import {
  useVueTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type PaginationState,
  type TableOptions,
  /*type OnChangeFn,*/
} from '@tanstack/vue-table'
import { ref, type Ref } from 'vue'

export function useDataTable<TData>(
  data: Ref<TData[]>,
  columns: ColumnDef<TData, any>[],
  options?: Partial<TableOptions<TData>>
) {
  const sorting = ref<SortingState>(options?.state?.sorting || [])
  const globalFilter = ref(options?.state?.globalFilter || '')
  const columnFilters = ref<ColumnFiltersState>(options?.state?.columnFilters || [])
  const pagination = ref<PaginationState>(options?.state?.pagination || {
    pageIndex: 0,
    pageSize: 10,
  })

  const table = useVueTable({
    get data() { return data.value },
    columns,
    state: {
      get sorting() { return sorting.value },
      get globalFilter() { return globalFilter.value },
      get columnFilters() { return columnFilters.value },
      get pagination() { return pagination.value },
    },
    onSortingChange: updater => {
      if (typeof updater === 'function') {
        sorting.value = updater(sorting.value)
      } else {
        sorting.value = updater
      }
      options?.onSortingChange?.(updater)
    },
    onGlobalFilterChange: updater => {
      if (typeof updater === 'function') {
        globalFilter.value = updater(globalFilter.value)
      } else {
        globalFilter.value = updater
      }
      options?.onGlobalFilterChange?.(updater)
    },
    onColumnFiltersChange: updater => {
      if (typeof updater === 'function') {
        columnFilters.value = updater(columnFilters.value)
      } else {
        columnFilters.value = updater
      }
      options?.onColumnFiltersChange?.(updater)
    },
    onPaginationChange: updater => {
      if (typeof updater === 'function') {
        pagination.value = updater(pagination.value)
      } else {
        pagination.value = updater
      }
      options?.onPaginationChange?.(updater)
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    columnResizeMode: 'onChange',
    manualPagination: options?.manualPagination,
    manualSorting: options?.manualSorting,
    manualFiltering: options?.manualFiltering,
    pageCount: options?.pageCount,
    ...options,
  })

  return {
    table,
    sorting,
    globalFilter,
    columnFilters,
    pagination,
  }
}
