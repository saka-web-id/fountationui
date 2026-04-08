<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useTemplateTable } from '../hooks/tables/useTemplateTable';
import { useApi } from '~/composables/useApi';
import { useAuthStore } from '~/stores/auth';
import TemplateOffcanvas from './TemplateOffcanvas.vue';
import { mapTemplateToForm } from '../api/template.mapper';
import type { TemplateSimpleDTO, TemplateDTO } from '../interfaces/template.interface';
import { FlexRender } from '@tanstack/vue-table';
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  companyId: number;
}>();

const selectedTemplate = ref<any>(null);
const auth = useAuthStore();
const { get: getTemplateDetail } = useApi<TemplateDTO>();
const { t } = useI18n()

const onEdit = async (template: TemplateSimpleDTO) => {
  const detail = await getTemplateDetail(`/v0/notification/templates/detail/companyId/${auth.user?.company.companyId}/userId/${auth.user?.id}/templateId/${template.notiTemplateId}`);
  if (detail) {
    selectedTemplate.value = mapTemplateToForm(detail);
    const offcanvasElement = document.getElementById('templateOffcanvas');
    if (offcanvasElement) {
        // @ts-ignore
      const bsOffcanvas = new bootstrap.Offcanvas(offcanvasElement);
      bsOffcanvas.show();
    }
  }
};

const onAdd = () => {
  selectedTemplate.value = null;
  const offcanvasElement = document.getElementById('templateOffcanvas');
  if (offcanvasElement) {
    // @ts-ignore
    const bsOffcanvas = new bootstrap.Offcanvas(offcanvasElement);
    bsOffcanvas.show();
  }
};

const { table, globalFilter, fetchData } = useTemplateTable(props.companyId, onEdit);

onMounted(() => {
  fetchData();
});

const handleSuccess = () => {
  fetchData();
  const offcanvasElement = document.getElementById('templateOffcanvas');
  if (offcanvasElement) {
     // @ts-ignore
    const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
    bsOffcanvas?.hide();
  }
};
</script>

<template>
  <div class="card">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h5 class="mb-0">{{ t('textLabel.template') }} List</h5>
      <button class="btn btn-primary" @click="onAdd">
        <i class="fas fa-plus"></i> {{ t('button.add') }} {{ t('textLabel.template') }}
      </button>
    </div>
    <div class="card-body">
      <div class="mb-3">
        <input v-model="globalFilter" type="text" class="form-control" :placeholder="t('button.search')" />
      </div>
      
      <div class="table-responsive">
        <table class="table table-hover table-striped">
          <thead>
            <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
              <th v-for="header in headerGroup.headers" :key="header.id" :class="(header.column.columnDef.meta as any)?.className">
                <FlexRender :render="header.column.columnDef.header" :props="header.getContext()" />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in table.getRowModel().rows" :key="row.id">
              <td v-for="cell in row.getVisibleCells()" :key="cell.id" :class="(cell.column.columnDef.meta as any)?.className">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination -->
      <div class="d-flex justify-content-between align-items-center mt-3">
        <div>
          Showing {{ table.getRowModel().rows.length }} of {{ table.getPrePaginationRowModel().rows.length }} entries
        </div>
        <div class="btn-group">
          <button class="btn btn-outline-secondary btn-sm" :disabled="!table.getCanPreviousPage()" @click="table.previousPage()">Previous</button>
          <button class="btn btn-outline-secondary btn-sm" :disabled="!table.getCanNextPage()" @click="table.nextPage()">Next</button>
        </div>
      </div>
    </div>
  </div>

  <TemplateOffcanvas 
    :company-id="companyId" 
    :template-data="selectedTemplate" 
    @success="handleSuccess" 
  />
</template>
