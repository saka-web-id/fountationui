<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useObjectUploadTable } from '../hooks/useObjectUploadTable';
import { useObjectUpload } from '../hooks/useObjectUpload';
import { objectBucketService } from '~/services/storage/objectBucketService';
import { objectUploadService } from '~/services/storage/objectUploadService';
import { useAuthStore } from '~/stores/auth';
import BaseTable from '~/components/table/BaseTable.vue';
import BaseGridView from '~/components/table/BaseGridView.vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import type { ObjectBucketDTO, ObjectsDTO, ObjectMetadataDTO } from "~/types/registry";
import { Offcanvas } from 'bootstrap';

const route = useRoute();
const authStore = useAuthStore();
const valueCompanyId = Number(route.params.valueCompanyId);

const { uploadFiles, loading: isUploading, uploadProgress, uploadResults } = useObjectUpload();

const buckets = ref<ObjectBucketDTO[]>([]);
const offcanvasElement = ref<HTMLElement | null>(null);
const offcanvasInstance = ref<Offcanvas | null>(null);

const metadataOffcanvasElement = ref<HTMLElement | null>(null);
const metadataOffcanvasInstance = ref<Offcanvas | null>(null);
const selectedObject = ref<ObjectsDTO | null>(null);
const metadata = ref<ObjectMetadataDTO[]>([]);
const isMetadataLoading = ref(false);

const selectedFiles = ref<File[]>([]);

const fetchBuckets = async () => {
  const companyId = authStore.user?.company?.companyId;
  const userId = authStore.user?.id;
  if (!companyId || !userId || !valueCompanyId) return;

  try {
    const response = await objectBucketService.getBuckets(companyId, userId, valueCompanyId, {
      page: 0,
      size: 1000
    });
    buckets.value = response.data?.objectBucketData || [];
  } catch (error) {
    console.error("Failed to fetch buckets", error);
  }
};

const handleShowMetadata = async (obj: ObjectsDTO) => {
  selectedObject.value = obj;
  metadata.value = [];
  isMetadataLoading.value = true;
  
  if (!metadataOffcanvasInstance.value && metadataOffcanvasElement.value) {
    metadataOffcanvasInstance.value = new Offcanvas(metadataOffcanvasElement.value);
  }
  metadataOffcanvasInstance.value?.show();

  const companyId = authStore.user?.company?.companyId;
  const userId = authStore.user?.id;
  if (!companyId || !userId || !obj.objectId) return;

  try {
    const response = await objectUploadService.getObjectMetadata(companyId, userId, obj.objectId);
    metadata.value = response.data || [];
  } catch (error) {
    console.error("Failed to fetch object metadata", error);
  } finally {
    isMetadataLoading.value = false;
  }
};

const {
  table,
  searchName,
  fetchObjects,
  t
} = useObjectUploadTable(valueCompanyId, handleShowMetadata);

const viewMode = ref<'list' | 'grid'>('list');

const toggleViewMode = (mode: 'list' | 'grid') => {
  viewMode.value = mode;
};

const schema = yup.object({
  bucketCode: yup.string().required(),
  targetPath: yup.string().required(),
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

const onFileChange = (e: any) => {
  selectedFiles.value = Array.from(e.target.files);
};

const onSubmit = async (values: any) => {
  if (selectedFiles.value.length === 0) {
    alert("Please select at least one file");
    return;
  }

  const success = await uploadFiles(valueCompanyId, selectedFiles.value, values.bucketCode, values.targetPath);
  if (success) {
    // Only close if all success? or always show result?
    // Let's keep it open to show results if many failed, but user asked for indicator
    if (uploadResults.value.every(r => r.success)) {
        closeOffcanvas();
        fetchObjects();
    } else {
        fetchObjects();
    }
  }
};

onMounted(() => {
  fetchObjects();
  fetchBuckets();
});
</script>

<template>
  <section class="pt-2 pb-2">
    <div class="container">
      <ol class="breadcrumb ms-2 me-2">
        <li class="breadcrumb-item"><router-link to="/dashboard"><span>{{ t('textLabel.dashboard') }}</span></router-link></li>
        <li class="breadcrumb-item"><router-link to="/object/storage/setting"><span>{{ t('registry.objectStorage') }}</span></router-link></li>
        <li class="breadcrumb-item"><router-link to="/object/storage/upload"><span>{{ t('registry.objectUpload') }}</span></router-link></li>
        <li class="breadcrumb-item active"><span class="active">{{ t('textLabel.list') }}</span></li>
      </ol>

      <div class="card mb-3 bg-gradient-dark">
        <div class="card-body ms-0 ps-0 me-0 pe-0 mt-0 pt-0 pb-0">
          <div class="row d-flex justify-content-between align-items-center me-2 mt-2 mb-2">
            <div class="col-auto">
              <h4 class="ps-0 ps-md-3 fs-5 fs-md-3 ms-2 text-white">{{ t('registry.objectUpload', 2) }}</h4>
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
              <button @click="openOffcanvas" class="btn btn-outline-primary text-nowrap" type="button">
                <i class="bi bi-cloud-upload me-1"></i> {{ t('button.add') }}
              </button>
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

    <!-- Offcanvas Upload -->
    <div ref="offcanvasElement" class="offcanvas offcanvas-end bg-dark text-white border-start border-secondary" tabindex="-1" id="offcanvasObjectUpload" aria-labelledby="offcanvasObjectUploadLabel">
      <div class="offcanvas-header border-bottom border-secondary">
        <h5 class="offcanvas-title" id="offcanvasObjectUploadLabel">
          {{ t('button.add') }} {{ t('registry.objectUpload') }}
        </h5>
        <button type="button" class="btn-close btn-close-white" @click="closeOffcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <Form :validation-schema="schema" @submit="onSubmit">
          <div class="mb-3">
            <label class="form-label text-secondary small">{{ t('registry.storageBucket') }}</label>
            <Field name="bucketCode" as="select" class="form-select bg-dark text-white border-secondary">
              <option value="" disabled selected>Select {{ t('registry.storageBucket') }}...</option>
              <option v-for="bucket in buckets" :key="bucket.objectBucketId" :value="bucket.objectBucketCode">
                {{ bucket.objectBucketName }} ({{ bucket.objectBucketCode }})
              </option>
            </Field>
            <ErrorMessage name="bucketCode" class="text-danger small" />
          </div>
          
          <div class="mb-3">
            <label class="form-label text-secondary small">Target Path</label>
            <Field name="targetPath" type="text" class="form-control bg-dark text-white border-secondary" placeholder="e.g. /images/avatars" />
            <ErrorMessage name="targetPath" class="text-danger small" />
          </div>

          <div class="mb-3">
            <label class="form-label text-secondary small">Files</label>
            <input type="file" multiple class="form-control bg-dark text-white border-secondary" @change="onFileChange" />
          </div>

          <div v-if="isUploading" class="mb-3">
            <div class="progress bg-secondary" style="height: 10px;">
              <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" :style="{ width: uploadProgress + '%' }"></div>
            </div>
            <p class="text-center small mt-1">{{ uploadProgress }}%</p>
          </div>

          <div v-if="uploadResults.length > 0" class="mb-3">
            <label class="form-label text-secondary small">Upload Results:</label>
            <div class="list-group list-group-flush border-top border-bottom border-secondary overflow-auto" style="max-height: 200px;">
                <div v-for="(res, index) in uploadResults" :key="index" class="list-group-item bg-dark text-white border-secondary py-1 px-0">
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="small text-truncate me-2">{{ res.name }}</span>
                        <span v-if="res.success" class="badge bg-success small">Success</span>
                        <span v-else class="badge bg-danger small" :title="res.error">Failed</span>
                    </div>
                </div>
            </div>
          </div>

          <div class="mt-4 d-flex gap-2">
            <button type="submit" class="btn btn-primary flex-grow-1" :disabled="isUploading || selectedFiles.length === 0">
              {{ isUploading ? 'Uploading...' : t('button.add') }}
            </button>
            <button type="button" class="btn btn-outline-secondary" @click="closeOffcanvas">{{ t('button.cancel') }}</button>
          </div>
        </Form>
      </div>
    </div>

    <!-- Offcanvas Metadata -->
    <div ref="metadataOffcanvasElement" class="offcanvas offcanvas-end bg-dark text-white border-start border-secondary" tabindex="-1" id="offcanvasObjectMetadata" aria-labelledby="offcanvasObjectMetadataLabel">
      <div class="offcanvas-header border-bottom border-secondary">
        <h5 class="offcanvas-title" id="offcanvasObjectMetadataLabel">
          Object Metadata
        </h5>
        <button type="button" class="btn-close btn-close-white" @click="metadataOffcanvasInstance?.hide()" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <div v-if="selectedObject" class="mb-4">
          <label class="text-secondary small d-block">Object Name</label>
          <span class="fw-bold">{{ selectedObject.objectOriginalName }}</span>
          <label class="text-secondary small d-block mt-2">Object Key</label>
          <code class="text-info">{{ selectedObject.objectKey }}</code>
        </div>

        <div v-if="isMetadataLoading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>

        <div v-else-if="metadata.length > 0">
          <div class="list-group list-group-flush border-top border-bottom border-secondary">
            <div v-for="item in metadata" :key="item.objectMetaId" class="list-group-item bg-dark text-white border-secondary py-3 px-0">
              <div class="d-flex flex-column">
                <span class="text-secondary small mb-1">{{ item.objectMetaKey }}</span>
                <span class="text-break">{{ item.objectMetaValue }}</span>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-5">
          <i class="bi bi-info-circle fs-1 text-secondary d-block mb-2"></i>
          <p class="text-secondary">No metadata found for this object.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bg-gradient-dark {
  background: linear-gradient(145deg, #1a1a1a, #2a2a2a);
}
</style>
