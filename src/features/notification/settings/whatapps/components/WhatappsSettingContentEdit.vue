<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useApi } from "~/composables/useApi";
import {computed, nextTick, onMounted, ref} from "vue";
import { useRoute } from 'vue-router';
import { ErrorMessage, Field, Form } from "vee-validate";
import { useProviderConfigSchema } from '../hooks/schemas/providerConfig.schema';
import {
  useWhatappsSettingForm,
  mapProviderFormFromApi, type NotificationProviderConfigPayload
} from "../hooks/forms/useWhatappsSettingForm";
import { useWhatappsSettingContentEditTable } from '../hooks/tables/useWhatappsSettingContentEditTable';
import BaseTable from '~/components/table/BaseTable.vue'
import { Offcanvas } from "bootstrap";
import { useAuthStore } from "~/stores/auth.ts";
import dayjs from "dayjs";

const { t } = useI18n();
const route = useRoute();
const auth = useAuthStore();
const { providerIdParam, companyIdParam } = route.params;
const isEdit = computed(() => !!providerIdParam);
const { data, loading, get, post, put } = useApi();

// Form Manager from useWhatappsSettingForm
const {
  setValues: setValuesProvider,
  handleSubmit,
  meta,
  errors: formErrors,
  configs,
  addConfig,
  updateConfig,
  removeConfig,
  providerName,
  providerSlug,
  providerPriority,
  providerIsActive,
  providerType,
  providerEngine
} = useWhatappsSettingForm();

const notificationProviderConfigSelected = ref<Partial<NotificationProviderConfigPayload> | null>(null)
const isEditConfig = ref(false)
const selectedIndex = ref<number | null>(null)
const tableRefreshTrigger = ref(0);

// TanStack Table Refactoring
const { table, globalFilter } = useWhatappsSettingContentEditTable(
  configs,
  (item, index) => prepareEditConfig(item, index),
  (index) => removeConfig(index)
);

onMounted(async () => {
  if (isEdit.value) {
    await get(`/v0/notification/provider/config/detail/companyId/${auth.user?.company.companyId}/userId/${auth.user?.id}/providerId/${providerIdParam}`);
    if (data.value) {
      const mappedData = mapProviderFormFromApi(data.value);
      setValuesProvider(mappedData);
    }
  }
});

// FUNGSI UNTUK MODAL/OFFCANVAS
const prepareAddNewConfig = () => {
  selectedIndex.value = null; // WAJIB NULL
  isEditConfig.value = false;
  notificationProviderConfigSelected.value = {
    providerConfigKey: '',
    providerConfigValue: '',
    providerConfigSecret: false,
  };
};

const prepareEditConfig = async (item: any, index: number) => {
  // 1. Reset dulu agar key berubah dan form lama hancur
  notificationProviderConfigSelected.value = null;
  selectedIndex.value = null;

  await nextTick(); // Tunggu sebentar agar Vue memproses reset

  // 2. Isi dengan data baru
  selectedIndex.value = index;
  isEditConfig.value = true;
  notificationProviderConfigSelected.value = { ...item };

  const element = document.getElementById('notificationProviderConfigDetailOffcanvas');
  if (element) {
    const instance = Offcanvas.getOrCreateInstance(element);
    instance.show();
  }
};

const onSubmitOffCanvas = (configValues: any) => {
  // Pastikan kita mengirim data yang bersih
  const cleanValues = { ...configValues };

  if (isEditConfig.value && selectedIndex.value !== null) {
    console.log("Updating index:", selectedIndex.value, cleanValues);
    updateConfig(selectedIndex.value, cleanValues);
  } else {
    console.log("Adding new config", cleanValues);
    addConfig({
      ...cleanValues,
      providerConfigId: Date.now(), // ID sementara untuk key di tabel
      providerId: Number(providerIdParam) || 0
    });
  }
  tableRefreshTrigger.value++;
  closeOffcanvas();
};

const closeOffcanvas = () => {
  const element = document.getElementById('notificationProviderConfigDetailOffcanvas');
  if (element) {
    const instance = Offcanvas.getInstance(element);
    instance?.hide();
  }
};

// Fungsi murni logika pengiriman data
const executeSubmit = async (finalValues: any) => {
  const companyId = auth.user?.company.companyId;
  const userId = auth.user?.id;

  // Pastikan tanggal valid, jika tidak ada (Add mode), gunakan waktu sekarang
  const createdAtRaw = finalValues.providerCreatedAt || new Date().toISOString();
  const formattedCreatedAt = dayjs(createdAtRaw).format('YYYY-MM-DD HH:mm:ssZ');

  // Susun payload sesuai struktur ProviderConfigRequestDTO
  const payload = {
    providerId: Number(providerIdParam) || 0,
    providerCompanyId: Number(companyId) || 0,
    providerName: finalValues.providerName,
    providerType: finalValues.providerType,
    providerEngine: finalValues.providerEngine,
    providerSlug: finalValues.providerSlug,
    providerIsActive: !!finalValues.providerIsActive,
    providerPriority: Number(finalValues.providerPriority) || 100,
    providerCreatedAt: formattedCreatedAt,

    // Kirim SEMUA array config
    providerConfigs: (finalValues.providerConfigs || []).map((cfg: any) => ({
      ...cfg,
      providerId: Number(providerIdParam) || 0,
      // Pastikan ID sementara (Date.now()) dikonversi ke Number agar jadi Long
      providerConfigId: 0
    }))
  };

  // Tentukan URL
  const url = isEdit.value
      ? `/v0/notification/provider/config/update/companyId/${companyId}/userId/${userId}/providerId/${providerIdParam}`
      : `/v0/notification/provider/config/add/companyId/${companyId}/userId/${userId}`;

  try {
    console.log("Submitting payload to backend:", payload);

    if (isEdit.value) {
      await put(url, payload);
    } else {
      await post(url, payload);
    }

    // Opsional: Tambahkan notifikasi sukses atau redirect
    // router.push({ name: 'notificationlistwhatapps' })

  } catch (error: any) {
    console.error("Failed to submit form:", error.response?.data || error.message);
  }
};

const submitForm = handleSubmit((values) => {
  console.log("Handle Submit Running", values);
  return executeSubmit(values);
});
</script>

<template>
  <section class="pt-2 pb-2">
    <div class="container">
      <ol class="breadcrumb ms-4">
        <li class="breadcrumb-item"><router-link to="/dashboard"><span>{{ t('textLabel.dashboard') }}</span></router-link></li>
        <li class="breadcrumb-item"><span>{{ t('textLabel.setting') }}</span></li>
        <li class="breadcrumb-item"><router-link to="/notification/whatapps"><span class="active">{{ t('textLabel.whatappsSetting') }}</span></router-link></li>
        <li class="breadcrumb-item">
          <router-link :to="{ name: 'notificationlistwhatapps', params: { companyIdParam: companyIdParam } }">
            {{ t('textLabel.provider', 2) }}
          </router-link>
        </li>
        <li class="breadcrumb-item active">{{ isEdit ? t('button.edit') : t('button.add') }}</li>
      </ol>

      <div class="card mb-3 bg-gradient-dark">
        <div class="card-body p-4">
          <div id="idform">
            <h4 class="mb-4">{{ isEdit ? 'Edit Provider' : 'Add New Provider' }}</h4>

            <div class="row mb-3">
              <div class="col-md-6">
                <div class="input-group mb-2">
                  <span class="input-group-text w-25">Name</span>
                  <input v-model="providerName" class="form-control" />
                </div>
                <div v-if="formErrors.providerName" class="text-danger small">{{ formErrors.providerName }}</div>
              </div>

              <div class="col-md-6">
                <div class="input-group mb-2">
                  <span class="input-group-text w-25">Slug</span>
                  <input v-model="providerSlug" class="form-control" />
                </div>
                <div v-if="formErrors.providerSlug" class="text-danger small">{{ formErrors.providerSlug }}</div>
              </div>

              <div class="col-md-6">
                <div class="input-group mb-2">
                  <span class="input-group-text w-25">Priority</span>
                  <input
                      v-model="providerPriority"
                      type="number"
                      class="form-control"
                      placeholder="0"
                      min="1"
                  />
                </div>
                <div v-if="formErrors.providerPriority" class="text-danger small">{{ formErrors.providerPriority }}</div>
              </div>

              <div class="col-md-6">
                <div class="input-group mb-2">
                  <span class="input-group-text w-25">Type</span>
                  <select v-model="providerType" class="form-select">
                    <option value="EMAIL">Email</option>
                    <option value="WHATSAPP">WhatsApp</option>
                    <option value="SMS">SMS</option>
                  </select>
                </div>
              </div>

              <div class="col-md-6">
                <div class="input-group mb-2">
                  <span class="input-group-text w-25">Type</span>
                  <select v-model="providerEngine" class="form-select">
                    <option value="API_WHATSAPP_SENDER">API Whatapps Sender</option>
                  </select>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-check form-switch mt-2">
                  <input
                      v-model="providerIsActive"
                      type="checkbox"
                      class="form-check-input"
                      id="isActive"
                  />
                  <label class="form-check-label ms-2" for="isActive">Is Active</label>
                </div>
                <div v-if="formErrors.providerIsActive" class="text-danger small">{{ formErrors.providerIsActive }}</div>
              </div>
            </div>

            <div class="mt-4">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <h5>Configurations</h5>
                <input v-model="globalFilter" type="text" class="form-control w-25" :placeholder="t('button.search')" />

                <button
                    type="button"
                    class="btn btn-success btn-sm d-flex align-items-center"
                    @click="prepareAddNewConfig"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#notificationProviderConfigDetailOffcanvas"
                >
                  <i class="bi bi-plus-lg me-1"></i> Add Config
                </button>
              </div>
              <BaseTable :table="table" :key="`table-${tableRefreshTrigger}`" />
            </div>

            <div class="mt-4">
              <button :disabled="!meta.valid || loading"  class="btn btn-outline-primary ms-2 me-2" @click="submitForm" type="button">
                {{ loading ? t('button.saving') : t('button.save') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Detail Offcanvas -->
    <div class="offcanvas offcanvas-end w-50" tabindex="-1" id="notificationProviderConfigDetailOffcanvas">
      <div class="offcanvas-header bg-light border-bottom">
        <h5 class="offcanvas-title">{{ isEditConfig ? 'Edit Config' : 'Add New Config' }}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
      </div>

      <div class="offcanvas-body">
        <!-- Force re-render with key to refresh initial-values -->
        <Form
            :key="notificationProviderConfigSelected ? 'edit-' + selectedIndex : 'new'"
            @submit="onSubmitOffCanvas"
            :validation-schema="useProviderConfigSchema"
            :initial-values="notificationProviderConfigSelected ?? undefined"
        >
          <div class="mb-3">
            <label class="form-label fw-bold">Provider Key</label>
            <Field name="providerConfigKey" class="form-control" />
            <ErrorMessage name="providerConfigKey" class="text-danger small" />
          </div>

          <div class="mb-3">
            <label class="form-label fw-bold">Value</label>
            <Field name="providerConfigValue" class="form-control" />
            <ErrorMessage name="providerConfigValue" class="text-danger small" />
          </div>

          <div class="row">
            <div class="col-md-12 mb-3">
              <div class="form-check form-switch">
                <Field name="providerConfigSecret" type="checkbox" :value="true" :unchecked-value="false" class="form-check-input" id="secretCheck" />
                <label class="form-check-label" for="secretCheck">Is Secret Content?</label>
              </div>
            </div>
          </div>

          <div class="mt-4 d-flex gap-2">
            <button type="submit" class="btn btn-primary w-100">
              <i class="bi bi-save me-1"></i> {{ isEditConfig ? 'Update Config' : 'Add to List' }}
            </button>
            <button type="button" class="btn btn-outline-secondary w-100" data-bs-dismiss="offcanvas">
              Cancel
            </button>
          </div>
        </Form>
      </div>
    </div>

  </section>
</template>
