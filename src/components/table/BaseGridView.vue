<script setup lang="ts" generic="TData">
import {
  FlexRender,
  type Table,
} from '@tanstack/vue-table'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps<{
  table: Table<TData>
}>()
</script>

<template>
  <div class="grid-view">
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <div v-for="row in table.getRowModel().rows" :key="row.id" class="col">
        <slot name="item" :row="row">
          <!-- Default Card Layout if slot is not provided -->
          <div class="card h-100 bg-dark text-white border-secondary">
            <div class="card-body">
              <div v-for="cell in row.getVisibleCells()" :key="cell.id" class="mb-2">
                <label class="text-secondary small d-block">
                  <FlexRender :render="cell.column.columnDef.header" :props="cell.getContext()" />
                </label>
                <div>
                  <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                </div>
              </div>
            </div>
          </div>
        </slot>
      </div>
    </div>

    <!-- Pagination (copied from BaseTable.vue for consistency) -->
    <div class="d-flex justify-content-between align-items-center mt-4 px-3 pb-3 flex-wrap">
      <div class="d-flex align-items-center gap-2 mb-2">
        <button
            class="btn btn-sm btn-outline-primary"
            @click="table.setPageIndex(0)"
            :disabled="!table.getCanPreviousPage()"
        >
          &lt;&lt;
        </button>
        <button
            class="btn btn-sm btn-outline-primary"
            @click="table.previousPage()"
            :disabled="!table.getCanPreviousPage()"
        >
          {{ t('textLabel.previous') }}
        </button>
        <button
            class="btn btn-sm btn-outline-primary"
            @click="table.nextPage()"
            :disabled="!table.getCanNextPage()"
        >
          {{ t('textLabel.next') }}
        </button>
        <button
            class="btn btn-sm btn-outline-primary"
            @click="table.setPageIndex(table.getPageCount() - 1)"
            :disabled="!table.getCanNextPage()"
        >
          &gt;&gt;
        </button>
      </div>

      <div class="d-flex align-items-center gap-2 mb-2">
        <span class="me-2 text-white">
          {{ t('textLabel.page') || 'Page' }}
          <strong>
            {{ table.getState().pagination.pageIndex + 1 }} {{ t('textLabel.of') || 'of' }} {{ table.getPageCount() }}
          </strong>
        </span>
        <select
            class="form-select form-select-sm w-auto bg-dark text-white border-secondary"
            :value="table.getState().pagination.pageSize"
            @change="e => table.setPageSize(Number((e.target as HTMLSelectElement).value))"
        >
          <option v-for="pageSize in [10, 20, 30, 40, 50]" :key="pageSize" :value="pageSize">
            {{ t('textLabel.show') || 'Show' }} {{ pageSize }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid-view {
  width: 100%;
}
</style>
