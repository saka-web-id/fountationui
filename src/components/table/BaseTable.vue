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
  <div class="table-responsive">
    <table class="table">
      <thead>
      <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
        <th
            v-for="header in headerGroup.headers"
            :key="header.id"
            :colSpan="header.colSpan"
            :style="{ width: header.getSize() + 'px' }"
            @click="header.column.getToggleSortingHandler()?.($event)"
        :class="[
        (header.column.columnDef.meta as any)?.className,
        { 'cursor-pointer select-none': header.column.getCanSort() }
        ]"
        >
        <div class="d-flex align-items-center">
          <template v-if="!header.isPlaceholder">
            <FlexRender
                :render="header.column.columnDef.header"
                :props="header.getContext()"
            />
            <span class="ms-1">
                  {{
                header.column.getIsSorted() === 'asc'
                    ? ' 🔼'
                    : header.column.getIsSorted() === 'desc'
                        ? ' 🔽'
                        : ''
              }}
                </span>
          </template>
        </div>
        <div
            v-if="header.column.getCanResize()"
            @mousedown="header.getResizeHandler()?.($event)"
            @touchstart="header.getResizeHandler()?.($event)"
            class="resizer"
            :class="{ isResizing: header.column.getIsResizing() }"
        />
      </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="row in table.getRowModel().rows" :key="row.id">
        <td
            v-for="cell in row.getVisibleCells()"
            :key="cell.id"
            :style="{ width: cell.column.getSize() + 'px' }"
        :class="(cell.column.columnDef.meta as any)?.className"
        >
        <FlexRender
            :render="cell.column.columnDef.cell"
            :props="cell.getContext()"
        />
      </td>
      </tr>
      </tbody>
    </table>

    <div class="d-flex justify-content-between align-items-center mt-3 px-3 pb-3 flex-wrap">
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
        <span class="me-2">
          {{ t('textLabel.page') || 'Page' }}
          <strong>
            {{ table.getState().pagination.pageIndex + 1 }} {{ t('textLabel.of') || 'of' }} {{ table.getPageCount() }}
          </strong>
        </span>
        <select
            class="form-select form-select-sm w-auto"
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
.cursor-pointer {
  cursor: pointer;
}
.select-none {
  user-select: none;
}
.resizer {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 5px;
  background: rgba(0, 0, 0, 0.1);
  cursor: col-resize;
  user-select: none;
  touch-action: none;
}
.resizer.isResizing {
  background: #0d6efd;
  opacity: 1;
}
th {
  position: relative;
}
.table {
  /* Hapus table-layout: fixed jika Anda ingin lebar kolom menyesuaikan otomatis saat kolom lain hilang */
  table-layout: auto;
}
</style>