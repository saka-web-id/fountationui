<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useAiDatasourceTable } from '../hooks/useAiDatasourceTable';
import { useAiDatasource } from '../hooks/useAiDatasource';
import BaseTable from '~/components/table/BaseTable.vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { Offcanvas } from 'bootstrap';
import type { AiDatasourceDTO } from '~/types/cognitive-datasource';

const props = defineProps<{
  valueCompanyId: string
}>();

const isEditing = ref(false);
const currentDatasourceId = ref<number | null>(null);

const { 
  table, 
  searchName, 
  fetchAiDatasources, 
  t 
} = useAiDatasourceTable(props.valueCompanyId, (row) => {
    handleEdit(row);
});

const { addAiDatasource, updateAiDatasource, loading: isSaving } = useAiDatasource();

const offcanvasElement = ref<HTMLElement | null>(null);
const offcanvas = ref<Offcanvas | null>(null);

const schema = yup.object({
  aiDatasourceCompanyCode: yup.string().required(),
  aiDatasourceName: yup.string().required(),
  aiDatasourceSourceService: yup.string().required(),
  aiDatasourceKafkaTopic: yup.string().required(),
  aiDatasourceIsActive: yup.boolean().required(),
});

const formValues = ref<AiDatasourceDTO>({
  aiDatasourceCompanyId: props.valueCompanyId,
  aiDatasourceCompanyCode: '',
  aiDatasourceName: '',
  aiDatasourceSourceService: '',
  aiDatasourceKafkaTopic: '',
  aiDatasourceIsActive: true,
  aiDatasourceTotalIngestedRecords: 0
});

const openOffcanvas = () => {
  if (offcanvasElement.value && !offcanvas.value) {
    offcanvas.value = new Offcanvas(offcanvasElement.value);
  }
  offcanvas.value?.show();
};

const closeOffcanvas = () => {
  offcanvas.value?.hide();
};

const handleAdd = () => {
    isEditing.value = false;
    currentDatasourceId.value = null;
    formValues.value = {
        aiDatasourceCompanyId: props.valueCompanyId,
        aiDatasourceCompanyCode: '',
        aiDatasourceName: '',
        aiDatasourceSourceService: '',
        aiDatasourceKafkaTopic: '',
        aiDatasourceIsActive: true,
        aiDatasourceTotalIngestedRecords: 0
    };
    openOffcanvas();
};

const handleEdit = (row: AiDatasourceDTO) => {
    isEditing.value = true;
    currentDatasourceId.value = row.aiDatasourceId || null;
    formValues.value = { ...row };
    openOffcanvas();
};

const onSubmit = async (values: any, { resetForm }: any) => {
  if (isEditing.value && currentDatasourceId.value) {
      // Focus update only to update "active" status only
      const payload: AiDatasourceDTO = {
          ...formValues.value,
          aiDatasourceIsActive: values.aiDatasourceIsActive
      };
      const success = await updateAiDatasource(currentDatasourceId.value, payload);
      if (success) {
          closeOffcanvas();
          resetForm();
          fetchAiDatasources();
      }
  } else {
      const payload: AiDatasourceDTO = {
          ...values,
          aiDatasourceCompanyId: props.valueCompanyId,
          aiDatasourceTotalIngestedRecords: 0
      };

      const success = await addAiDatasource(payload);
      if (success) {
          closeOffcanvas();
          resetForm();
          fetchAiDatasources();
      }
  }
};

onMounted(fetchAiDatasources);
</script>

<template>
  <section class="pt-2 pb-2">
    <div class="container">
      <ol class="breadcrumb ms-4">
        <li class="breadcrumb-item"><router-link to="/dashboard"><span>{{ t('textLabel.dashboard') }}</span></router-link></li>
        <li class="breadcrumb-item active"><span class="active">{{ t('cognitive.aiDatasource', 1) }}</span></li>
      </ol>
      
      <div class="card mb-3 bg-gradient-dark border-secondary shadow-lg">
        <div class="card-body p-4">
          <div class="row d-flex justify-content-between align-items-center mb-4">
            <div class="col-auto">
              <h3 class="fw-bold text-white mb-0">{{ t('cognitive.aiDatasourceManagement') }}</h3>
              <p class="text-muted small mb-0">{{ t('cognitive.monitorDescription') }}</p>
            </div>
            <div class="col-12 col-md-6 mt-3 mt-md-0 d-flex gap-2">
              <div class="input-group flex-grow-1">
                <span class="input-group-text bg-dark border-secondary text-secondary">
                  <i class="bi bi-search"></i>
                </span>
                <input v-model="searchName" type="text" class="form-control bg-dark text-white border-secondary" :placeholder="t('cognitive.searchByName')"/>
              </div>
              <button @click="handleAdd" class="btn btn-primary text-nowrap">
                <i class="bi bi-plus-lg me-1"></i> {{ t('cognitive.addDatasource') }}
              </button>
            </div>
          </div>

          <div class="table-responsive">
            <BaseTable :table="table" />
          </div>
        </div>
      </div>
    </div>

    <!-- Offcanvas Add/Edit -->
    <div ref="offcanvasElement" class="offcanvas offcanvas-start bg-dark text-white border-end border-secondary" tabindex="-1" id="offcanvasAiDatasource" aria-labelledby="offcanvasAiDatasourceLabel">
      <div class="offcanvas-header border-bottom border-secondary">
        <h5 class="offcanvas-title" id="offcanvasAiDatasourceLabel">
          {{ isEditing ? t('button.edit') : t('cognitive.addDatasource') }}
        </h5>
        <button type="button" class="btn-close btn-close-white" @click="closeOffcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <Form :key="isEditing ? 'edit-' + currentDatasourceId : 'add'" :validation-schema="schema" :initial-values="formValues" @submit="onSubmit">
          <div class="mb-3">
            <label class="form-label small text-muted">{{ t('cognitive.companyCode') }}</label>
            <Field name="aiDatasourceCompanyCode" type="text" class="form-control bg-dark text-white border-secondary" :placeholder="t('cognitive.companyCode')" :disabled="isEditing" />
            <ErrorMessage name="aiDatasourceCompanyCode" class="text-danger small" />
          </div>

          <div class="mb-3">
            <label class="form-label small text-muted">{{ t('cognitive.datasourceName') }}</label>
            <Field name="aiDatasourceName" type="text" class="form-control bg-dark text-white border-secondary" placeholder="e.g. Customer Feedback" :disabled="isEditing" />
            <ErrorMessage name="aiDatasourceName" class="text-danger small" />
          </div>

          <div class="mb-3">
            <label class="form-label small text-muted">{{ t('cognitive.sourceService') }}</label>
            <Field name="aiDatasourceSourceService" type="text" class="form-control bg-dark text-white border-secondary" placeholder="e.g. feedback-api" :disabled="isEditing" />
            <ErrorMessage name="aiDatasourceSourceService" class="text-danger small" />
          </div>

          <div class="mb-3">
            <label class="form-label small text-muted">{{ t('cognitive.kafkaTopic') }}</label>
            <Field name="aiDatasourceKafkaTopic" type="text" class="form-control bg-dark text-white border-secondary" placeholder="e.g. cognitive.datasource.feedback" :disabled="isEditing" />
            <ErrorMessage name="aiDatasourceKafkaTopic" class="text-danger small" />
          </div>

          <div class="mb-4">
            <div class="form-check form-switch">
              <Field name="aiDatasourceIsActive" type="checkbox" :value="true" unchecked-value="false" class="form-check-input" id="isActive" />
              <label class="form-check-label small text-muted" for="isActive">{{ t('cognitive.active') }}</label>
            </div>
            <ErrorMessage name="aiDatasourceIsActive" class="text-danger small" />
          </div>

          <div class="d-grid gap-2">
            <button type="submit" class="btn btn-primary" :disabled="isSaving">
              <span v-if="isSaving" class="spinner-border spinner-border-sm me-1"></span>
              {{ isEditing ? t('button.save') : t('cognitive.saveDatasource') }}
            </button>
            <button type="button" class="btn btn-outline-secondary" @click="closeOffcanvas">{{ t('button.cancel') }}</button>
          </div>
        </Form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bg-gradient-dark {
  background: linear-gradient(145deg, #1a1a1a, #2a2a2a);
}
</style>
