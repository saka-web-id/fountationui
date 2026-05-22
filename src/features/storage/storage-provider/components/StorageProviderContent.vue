<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useStorageProviderTable } from '../hooks/useStorageProviderTable.ts';
import { useStorageProvider } from '../hooks/useStorageProvider.ts';
import BaseTable from '~/components/table/BaseTable.vue';
import BaseGridView from '~/components/table/BaseGridView.vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import type { ObjectStorageProviderDTO } from "~/types/registry.ts";
import { Offcanvas } from 'bootstrap';

const { addStorageProvider, loading: isSaving } = useStorageProvider();

const offcanvasElement = ref<HTMLElement | null>(null);
const offcanvasInstance = ref<Offcanvas | null>(null);
const isEditing = ref(false);
const formValues = ref<ObjectStorageProviderDTO>({
  objectStorageProviderCode: '',
  objectStorageProviderType: '',
  objectStorageProviderEndpoint: '',
  objectStorageProviderRegion: '',
  objectStorageProviderAccessKey: '',
  objectStorageProviderSecretKey: '',
  objectStorageProviderIsActive: true,
});

const handleEdit = (provider: ObjectStorageProviderDTO) => {
  isEditing.value = true;
  formValues.value = { ...provider };
  openOffcanvas();
};

const {
  table,
  searchName,
  fetchStorageProviders,
  t
} = useStorageProviderTable(handleEdit);

const viewMode = ref<'list' | 'grid'>('list');

const toggleViewMode = (mode: 'list' | 'grid') => {
  viewMode.value = mode;
};

const schema = yup.object({
  objectStorageProviderCode: yup.string().required(),
  objectStorageProviderType: yup.string().required(),
  objectStorageProviderEndpoint: yup.string().url().required(),
  objectStorageProviderRegion: yup.string().required(),
  objectStorageProviderAccessKey: yup.string().required(),
  objectStorageProviderSecretKey: yup.string().required(),
  objectStorageProviderIsActive: yup.boolean().required(),
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
    objectStorageProviderCode: '',
    objectStorageProviderType: '',
    objectStorageProviderEndpoint: '',
    objectStorageProviderRegion: '',
    objectStorageProviderAccessKey: '',
    objectStorageProviderSecretKey: '',
    objectStorageProviderIsActive: true,
  };
  openOffcanvas();
};

const onSubmit = async (values: any, { resetForm }: any) => {
  // If editing, make sure to include the ID
  const payload = isEditing.value 
    ? { ...values, objectStorageProviderId: formValues.value.objectStorageProviderId }
    : values;

  const success = await addStorageProvider(payload as ObjectStorageProviderDTO);
  if (success) {
    closeOffcanvas();
    resetForm();
    fetchStorageProviders();
  }
};

onMounted(fetchStorageProviders);
</script>

<template>
  <section class="pt-2 pb-2">
    <div class="container">
      <ol class="breadcrumb ms-2 me-2">
        <li class="breadcrumb-item"><router-link to="/dashboard"><span>{{ t('textLabel.dashboard') }}</span></router-link></li>
        <li class="breadcrumb-item"><router-link to="/submenu/registries"><span>{{ t('textLabel.registry', 2) }}</span></router-link></li>
        <li class="breadcrumb-item active"><span class="active">{{ t('registry.storageProvider', 2) }}</span></li>
      </ol>

      <div class="card mb-3 bg-gradient-dark">
        <div class="card-body ms-0 ps-0 me-0 pe-0 mt-0 pt-0 pb-0">
          <div class="row d-flex justify-content-between align-items-center me-2 mt-2 mb-2">
            <div class="col-auto">
              <h4 class="ps-0 ps-md-3 fs-5 fs-md-3 ms-2 text-white">{{ t('registry.storageProvider', 2) }}</h4>
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
    <div ref="offcanvasElement" class="offcanvas offcanvas-end bg-dark text-white border-start border-secondary" tabindex="-1" id="offcanvasStorageProvider" aria-labelledby="offcanvasStorageProviderLabel">
      <div class="offcanvas-header border-bottom border-secondary">
        <h5 class="offcanvas-title" id="offcanvasStorageProviderLabel">
          {{ isEditing ? t('button.edit') : t('button.add') }} {{ t('registry.storageProvider') }}
        </h5>
        <button type="button" class="btn-close btn-close-white" @click="closeOffcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <Form :key="isEditing ? formValues.objectStorageProviderId : 'new'" :validation-schema="schema" :initial-values="formValues" @submit="onSubmit">
          <div class="mb-3">
            <label class="form-label text-secondary small">{{ t('registry.code') }}</label>
            <Field name="objectStorageProviderCode" type="text" class="form-control bg-dark text-white border-secondary" />
            <ErrorMessage name="objectStorageProviderCode" class="text-danger small" />
          </div>
          <div class="mb-3">
            <label class="form-label text-secondary small">{{ t('registry.type') }}</label>
            <Field name="objectStorageProviderType" type="text" class="form-control bg-dark text-white border-secondary" />
            <ErrorMessage name="objectStorageProviderType" class="text-danger small" />
          </div>
          <div class="mb-3">
            <label class="form-label text-secondary small">{{ t('registry.endpoint') }}</label>
            <Field name="objectStorageProviderEndpoint" type="text" class="form-control bg-dark text-white border-secondary" />
            <ErrorMessage name="objectStorageProviderEndpoint" class="text-danger small" />
          </div>
          <div class="mb-3">
            <label class="form-label text-secondary small">{{ t('registry.region') }}</label>
            <Field name="objectStorageProviderRegion" type="text" class="form-control bg-dark text-white border-secondary" />
            <ErrorMessage name="objectStorageProviderRegion" class="text-danger small" />
          </div>
          <div class="mb-3">
             <div class="form-check">
              <Field name="objectStorageProviderIsActive" type="checkbox" :value="true" class="form-check-input" id="isActiveCheckOff" />
              <label class="form-check-label text-white" for="isActiveCheckOff">{{ t('registry.active') }}</label>
            </div>
            <ErrorMessage name="objectStorageProviderIsActive" class="text-danger small" />
          </div>
          <div class="mb-3">
            <label class="form-label text-secondary small">{{ t('registry.accessKey') }}</label>
            <Field name="objectStorageProviderAccessKey" type="password" class="form-control bg-dark text-white border-secondary" />
            <ErrorMessage name="objectStorageProviderAccessKey" class="text-danger small" />
          </div>
          <div class="mb-3">
            <label class="form-label text-secondary small">{{ t('registry.secretKey') }}</label>
            <Field name="objectStorageProviderSecretKey" type="password" class="form-control bg-dark text-white border-secondary" />
            <ErrorMessage name="objectStorageProviderSecretKey" class="text-danger small" />
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
