<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useAiProviderTable } from '../hooks/useAiProviderTable';
import { useAiProvider } from '../hooks/useAiProvider';
import BaseTable from '~/components/table/BaseTable.vue';
import BaseGridView from '~/components/table/BaseGridView.vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import type { AiProviderDTO } from "~/types/registry";
import { Offcanvas } from 'bootstrap';

const { addUpdateAiProvider, loading: isSaving } = useAiProvider();

const offcanvasElement = ref<HTMLElement | null>(null);
const offcanvasInstance = ref<Offcanvas | null>(null);
const isEditing = ref(false);
const formValues = ref<AiProviderDTO>({
  aiProviderName: '',
  aiProviderApiKeySecret: '',
  aiProviderApiBaseUrl: '',
  aiProviderEmbeddingModel: '',
  aiProviderChatModel: '',
  aiProviderActive: true,
});

const handleEdit = (provider: AiProviderDTO) => {
  isEditing.value = true;
  formValues.value = { ...provider };
  openOffcanvas();
};

const {
  table,
  searchName,
  fetchAiProviders,
  t
} = useAiProviderTable(handleEdit);

const viewMode = ref<'list' | 'grid'>('list');

const toggleViewMode = (mode: 'list' | 'grid') => {
  viewMode.value = mode;
};

const schema = yup.object({
  aiProviderName: yup.string().required(),
  aiProviderApiKeySecret: yup.string().required(),
  aiProviderApiBaseUrl: yup.string().url().required(),
  aiProviderEmbeddingModel: yup.string().required(),
  aiProviderChatModel: yup.string().required(),
  aiProviderActive: yup.boolean().required(),
});

const openOffcanvas = () => {
  if (!offcanvasInstance.value && offcanvasElement.value) {
    offcanvasInstance.value = new Offcanvas(offcanvasElement.value);
  }
  offcanvasInstance.value?.show();
};

const closeOffcanvas = () => {
  offcanvasInstance.value?.hide();
};

const handleAdd = () => {
  isEditing.value = false;
  formValues.value = {
    aiProviderName: '',
    aiProviderApiKeySecret: '',
    aiProviderApiBaseUrl: '',
    aiProviderEmbeddingModel: '',
    aiProviderChatModel: '',
    aiProviderActive: true,
  };
  openOffcanvas();
};

const onSubmit = async (values: any, { resetForm }: any) => {
  const payload = isEditing.value 
    ? { ...values, aiProviderId: formValues.value.aiProviderId }
    : values;

  const success = await addUpdateAiProvider(payload as AiProviderDTO);
  if (success) {
    closeOffcanvas();
    resetForm();
    fetchAiProviders();
  }
};

onMounted(fetchAiProviders);
</script>

<template>
  <section class="pt-2 pb-2">
    <div class="container">
      <ol class="breadcrumb ms-2 me-2">
        <li class="breadcrumb-item"><router-link to="/dashboard"><span>{{ t('textLabel.dashboard') }}</span></router-link></li>
        <li class="breadcrumb-item"><router-link to="/cognitive/ai/settings"><span>{{ t('cognitive.title') }}</span></router-link></li>
        <li class="breadcrumb-item active"><span class="active">{{ t('cognitive.aiProvider', 2) }}</span></li>
      </ol>

      <div class="card mb-3 bg-gradient-dark">
        <div class="card-body ms-0 ps-0 me-0 pe-0 mt-0 pt-0 pb-0">
          <div class="row d-flex justify-content-between align-items-center me-2 mt-2 mb-2">
            <div class="col-auto">
              <h4 class="ps-0 ps-md-3 fs-5 fs-md-3 ms-2 text-white">{{ t('cognitive.aiProvider', 2) }}</h4>
            </div>
            <div class="col-auto d-flex gap-2 ms-2">
              <div class="btn-group me-2" role="group">
                <button
                    type="button"
                    class="btn btn-outline-primary"
                    :class="{ active: viewMode === 'list' }"
                    @click="toggleViewMode('list')"
                >
                  <i class="fa fa-list"></i>
                </button>
                <button
                    type="button"
                    class="btn btn-outline-primary"
                    :class="{ active: viewMode === 'grid' }"
                    @click="toggleViewMode('grid')"
                >
                  <i class="fa fa-th-large"></i>
                </button>
              </div>
              <input
                  v-model="searchName"
                  type="text"
                  class="form-control bg-dark text-white border-secondary"
                  :placeholder="t('button.search') + '...'"
              />
              <button @click="handleAdd" class="btn btn-outline-primary text-nowrap" type="button">{{ t('button.add') }}</button>
            </div>
          </div>
          <div class="ms-2 me-2 mt-2 mb-2">
            <BaseTable v-if="viewMode === 'list'" :table="table" />
            <BaseGridView v-else :table="table" />
          </div>
        </div>
      </div>
      <div class="card bg-gradient-dark">
        <div class="card-body ms-0 ps-0 me-0 pe-0 mt-0 pt-0 pb-0"></div>
      </div>
    </div>

    <!-- Offcanvas Add/Update -->
    <div ref="offcanvasElement" class="offcanvas offcanvas-end bg-dark text-white border-start border-secondary" tabindex="-1" id="offcanvasAiProvider" aria-labelledby="offcanvasAiProviderLabel">
      <div class="offcanvas-header border-bottom border-secondary">
        <h5 class="offcanvas-title" id="offcanvasAiProviderLabel">
          {{ isEditing ? t('button.edit') : t('button.add') }} {{ t('cognitive.aiProvider') }}
        </h5>
        <button type="button" class="btn-close btn-close-white" @click="closeOffcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <Form :key="isEditing ? formValues.aiProviderId : 'new'" :validation-schema="schema" :initial-values="formValues" @submit="onSubmit">
          <div class="mb-3">
            <label class="form-label text-secondary small">{{ t('textLabel.name') }}</label>
            <Field name="aiProviderName" type="text" class="form-control bg-dark text-white border-secondary" />
            <ErrorMessage name="aiProviderName" class="text-danger small" />
          </div>
          <div class="mb-3">
            <label class="form-label text-secondary small">API Base URL</label>
            <Field name="aiProviderApiBaseUrl" type="text" class="form-control bg-dark text-white border-secondary" placeholder="https://api.openai.com/v1" />
            <ErrorMessage name="aiProviderApiBaseUrl" class="text-danger small" />
          </div>
          <div class="mb-3">
            <label class="form-label text-secondary small">API Key / Secret</label>
            <Field name="aiProviderApiKeySecret" type="password" class="form-control bg-dark text-white border-secondary" />
            <ErrorMessage name="aiProviderApiKeySecret" class="text-danger small" />
          </div>
          <div class="mb-3">
            <label class="form-label text-secondary small">Chat Model</label>
            <Field name="aiProviderChatModel" type="text" class="form-control bg-dark text-white border-secondary" placeholder="gpt-4" />
            <ErrorMessage name="aiProviderChatModel" class="text-danger small" />
          </div>
          <div class="mb-3">
            <label class="form-label text-secondary small">Embedding Model</label>
            <Field name="aiProviderEmbeddingModel" type="text" class="form-control bg-dark text-white border-secondary" placeholder="text-embedding-3-small" />
            <ErrorMessage name="aiProviderEmbeddingModel" class="text-danger small" />
          </div>
          <div class="mb-3">
             <div class="form-check">
              <Field name="aiProviderActive" type="checkbox" :value="true" class="form-check-input" id="aiProviderActiveCheck" />
              <label class="form-check-label text-white" for="aiProviderActiveCheck">{{ t('registry.active') }}</label>
            </div>
            <ErrorMessage name="aiProviderActive" class="text-danger small" />
          </div>
          <div class="mt-4 d-flex gap-2">
            <button type="submit" class="btn btn-primary flex-grow-1" :disabled="isSaving">
              {{ isSaving ? t('button.saving') : t('button.save') }}
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
