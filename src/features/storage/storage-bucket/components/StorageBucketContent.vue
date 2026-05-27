<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useStorageBucketTable } from '../hooks/useStorageBucketTable';
import { useStorageBucket } from '../hooks/useStorageBucket';
import { objectStorageProviderService } from '~/services/registry/objectStorageProviderService';
import { useAuthStore } from '~/stores/auth';
import BaseTable from '~/components/table/BaseTable.vue';
import BaseGridView from '~/components/table/BaseGridView.vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import type { ObjectBucketDTO, ObjectStorageProviderDTO } from "~/types/registry";
import { Offcanvas } from 'bootstrap';

const route = useRoute();
const authStore = useAuthStore();
const valueCompanyId = Number(route.params.valueCompanyId);

const { addBucket, updateBucket, loading: isSaving } = useStorageBucket();

const providers = ref<ObjectStorageProviderDTO[]>([]);
const offcanvasElement = ref<HTMLElement | null>(null);
const offcanvasInstance = ref<Offcanvas | null>(null);
const isEditing = ref(false);
const isViewing = ref(false);
const formValues = ref<ObjectBucketDTO>({
  objectBucketProviderId: 0,
  objectBucketCompanyId: valueCompanyId,
  objectBucketCode: '',
  objectBucketName: '',
  objectBucketIsExposed: false,
});

const fetchProviders = async () => {
  const companyId = authStore.user?.company?.companyId;
  const userId = authStore.user?.id;
  if (!companyId || !userId) return;

  try {
    // Use the paginated list API with a large size to get all providers for the dropdown
    const response = await objectStorageProviderService.getStorageProviders(companyId, userId, {
      page: 0,
      size: 1000 // Request a large number to ensure all are included
    });
    providers.value = response.data?.objectStorageProviderData || [];
  } catch (error) {
    console.error("Failed to fetch storage providers", error);
  }
};

const handleView = (bucket: ObjectBucketDTO) => {
  isEditing.value = false;
  isViewing.value = true;
  formValues.value = { ...bucket };
  openOffcanvas();
};

const {
  table,
  searchName,
  fetchBuckets,
  t
} = useStorageBucketTable(valueCompanyId, handleView);

const viewMode = ref<'list' | 'grid'>('list');

const toggleViewMode = (mode: 'list' | 'grid') => {
  viewMode.value = mode;
};

const schema = yup.object({
  objectBucketProviderId: yup.number().required().moreThan(0),
  objectBucketCode: yup.string().required(),
  objectBucketName: yup.string().required(),
  objectBucketIsExposed: yup.boolean().required(),
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
  isViewing.value = false;
  formValues.value = {
    objectBucketProviderId: providers.value.length > 0 ? providers.value[0].objectStorageProviderId || 0 : 0,
    objectBucketCompanyId: valueCompanyId,
    objectBucketCode: '',
    objectBucketName: '',
    objectBucketIsExposed: false,
  };
  openOffcanvas();
};

const onSubmit = async (values: any, { resetForm }: any) => {
  if (isViewing.value) return;

  const payload = { ...values, objectBucketCompanyId: valueCompanyId };
  if (isEditing.value) {
      payload.objectBucketId = formValues.value.objectBucketId;
  }

  const success = isEditing.value 
    ? await updateBucket(valueCompanyId, payload as ObjectBucketDTO)
    : await addBucket(valueCompanyId, payload as ObjectBucketDTO);

  if (success) {
    closeOffcanvas();
    resetForm();
    fetchBuckets();
  }
};

onMounted(() => {
  fetchBuckets();
  fetchProviders();
});
</script>

<template>
  <section class="pt-2 pb-2">
    <div class="container">
      <ol class="breadcrumb ms-2 me-2">
        <li class="breadcrumb-item"><router-link to="/dashboard"><span>{{ t('textLabel.dashboard') }}</span></router-link></li>
        <li class="breadcrumb-item"><router-link to="/object/storage/setting"><span>{{ t('registry.storageSetting') }}</span></router-link></li>
        <li class="breadcrumb-item"><router-link to="/object/storage/bucket"><span>{{ t('registry.storageBucket') }}</span></router-link></li>
        <li class="breadcrumb-item active"><span class="active">{{ t('textLabel.list') }}</span></li>
      </ol>

      <div class="card mb-3 bg-gradient-dark">
        <div class="card-body ms-0 ps-0 me-0 pe-0 mt-0 pt-0 pb-0">
          <div class="row d-flex justify-content-between align-items-center me-2 mt-2 mb-2">
            <div class="col-auto">
              <h4 class="ps-0 ps-md-3 fs-5 fs-md-3 ms-2 text-white">{{ t('registry.storageBucket', 2) }}</h4>
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
    <div ref="offcanvasElement" class="offcanvas offcanvas-start bg-dark text-white border-end border-secondary" tabindex="-1" id="offcanvasStorageBucket" aria-labelledby="offcanvasStorageBucketLabel">
      <div class="offcanvas-header border-bottom border-secondary">
        <h5 class="offcanvas-title" id="offcanvasStorageBucketLabel">
          {{ isViewing ? t('button.view') : (isEditing ? t('button.edit') : t('button.add')) }} {{ t('registry.storageBucket') }}
        </h5>
        <button type="button" class="btn-close btn-close-white" @click="closeOffcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <Form :key="isViewing ? formValues.objectBucketId : (isEditing ? formValues.objectBucketId : 'new')" :validation-schema="schema" :initial-values="formValues" @submit="onSubmit">
          <div class="mb-3">
            <label class="form-label text-secondary small">{{ t('provider.name') }}</label>
            <Field name="objectBucketProviderId" as="select" class="form-select bg-dark text-white border-secondary" :disabled="isViewing">
              <option value="0" disabled>{{ t('button.search') }} {{ t('provider.name') }}...</option>
              <option v-for="provider in providers" :key="provider.objectStorageProviderId" :value="provider.objectStorageProviderId">
                {{ provider.objectStorageProviderCode }}
              </option>
            </Field>
            <ErrorMessage name="objectBucketProviderId" class="text-danger small" />
          </div>
          <div class="mb-3">
            <label class="form-label text-secondary small">{{ t('registry.code') }}</label>
            <Field name="objectBucketCode" type="text" class="form-control bg-dark text-white border-secondary" :disabled="isViewing" />
            <ErrorMessage name="objectBucketCode" class="text-danger small" />
          </div>
          <div class="mb-3">
            <label class="form-label text-secondary small">{{ t('registry.name') }}</label>
            <Field name="objectBucketName" type="text" class="form-control bg-dark text-white border-secondary" :disabled="isViewing" />
            <ErrorMessage name="objectBucketName" class="text-danger small" />
          </div>
          <div class="mb-3">
             <div class="form-check">
              <Field name="objectBucketIsExposed" type="checkbox" :value="true" class="form-check-input" id="isExposedCheck" :disabled="isViewing" />
              <label class="form-check-label text-white" for="isExposedCheck">{{ t('registry.active') }} (Exposed)</label>
            </div>
            <ErrorMessage name="objectBucketIsExposed" class="text-danger small" />
          </div>
          
          <div class="mt-4 d-flex gap-2">
            <button v-if="!isViewing" type="submit" class="btn btn-primary flex-grow-1" :disabled="isSaving">
              {{ isSaving ? t('button.saving') : t('button.save') }}
            </button>
            <button type="button" class="btn btn-outline-secondary flex-grow-1" @click="closeOffcanvas">{{ isViewing ? t('button.close') : t('button.cancel') }}</button>
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
