<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useApi } from "~/composables/useApi";
import {computed, nextTick, onMounted, ref} from "vue";
import { useRoute } from 'vue-router';
import { ErrorMessage, Field, Form } from "vee-validate";
import { useProviderConfigSchema } from '../hooks/schemas/providerConfig.schema';
import {
  useProviderPayload,
  mapProviderFormFromApi, type NotificationProviderConfigPayload
} from "../hooks/forms/useEmailSettingForm";
import { useEmailSettingContentEditTable } from '../hooks/tables/useEmailSettingContentEditTable';
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

// Form Manager from useProviderPayload
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
} = useProviderPayload();

const notificationProviderConfigSelected = ref<Partial<NotificationProviderConfigPayload> | null>(null)
const isEditConfig = ref(false)
const selectedIndex = ref<number | null>(null)
const tableRefreshTrigger = ref(0);

// 2. Gunakan computed agar tabel selalu sinkron dengan state form VeeValidate
//const configsData = computed(() => values.providerConfigs || []);

// TanStack Table Refactoring
const { table, globalFilter } = useEmailSettingContentEditTable(
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

// Helper untuk deteksi apakah string adalah JSON valid
const isJson = (val: any) => {
  if (!val || typeof val !== 'string') return false;
  try {
    const parsed = JSON.parse(val);
    return typeof parsed === 'object' && parsed !== null;
  } catch {
    return false;
  }
};

// Fungsi untuk merapikan JSON di dalam Field VeeValidate
const beautifyField = (currentValue: string, setFieldValue: any) => {
  try {
    const formatted = JSON.stringify(JSON.parse(currentValue), null, 2);
    // Kita panggil setFieldValue untuk mengupdate state form secara reaktif
    setFieldValue('providerConfigValue', formatted);
  } catch (e) {
    console.warn("Format JSON tidak valid");
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

  } catch (error: any) {
    // Sangat penting untuk melihat detail error dari Axios jika 400 terjadi lagi
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
        <li class="breadcrumb-item"><router-link to="/notification/email"><span class="active">{{ t('textLabel.emailSetting') }}</span></router-link></li>
        <li class="breadcrumb-item">
          <router-link :to="{ name: 'notificationlistemail', params: { companyIdParam: companyIdParam } }">
            {{ t('textLabel.provider', 2) }}
          </router-link>
        </li>
        <li class="breadcrumb-item active">{{ isEdit ? t('button.edit') : t('button.add') }}</li>
      </ol>

      <div class="card mb-3 bg-gradient-dark">
        <div class="card-body p-4">
          <div id="idform">
            <h4 class="mb-4">{{ isEdit ? t('button.edit') : t('button.add') }}</h4>

            <div class="row mb-3">
              <div class="col-md-6">
                <div class="input-group mb-2">
                  <span class="input-group-text w-25">{{ t('textLabel.name') }}</span>
                  <input v-model="providerName" class="form-control" />
                </div>
                <div v-if="formErrors.providerName" class="text-danger small">{{ formErrors.providerName }}</div>
              </div>

              <div class="col-md-6">
                <div class="input-group mb-2">
                  <span class="input-group-text w-25">{{ t('textLabel.slug') }}</span>
                  <input v-model="providerSlug" class="form-control" />
                </div>
                <div v-if="formErrors.providerSlug" class="text-danger small">{{ formErrors.providerSlug }}</div>
              </div>

              <div class="col-md-6">
                <div class="input-group mb-2">
                  <span class="input-group-text w-25">{{ t('textLabel.priority') }}</span>
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
                  <span class="input-group-text w-25">{{ t('textLabel.type') }}</span>
                  <select v-model="providerType" class="form-select">
                    <option value="EMAIL">Email</option>
                    <option value="WHATSAPP">WhatsApp</option>
                    <option value="SMS">SMS</option>
                  </select>
                </div>
              </div>

              <div class="col-md-6">
                <div class="input-group mb-2">
                  <span class="input-group-text w-25">{{ t('textLabel.engine') }}</span>
                  <select v-model="providerEngine" class="form-select">
                    <option value="SMTP_EMAIL_SENDER">SMTP Email Sender</option>
                    <option value="API_EMAIL_SENDER">API Email Sender</option>
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
                  <label class="form-check-label ms-2" for="isActive">{{ t('textLabel.isActive') }}</label>
                </div>
                <div v-if="formErrors.providerIsActive" class="text-danger small">{{ formErrors.providerIsActive }}</div>
              </div>
            </div>

            <div class="mt-4">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <h5>{{ t('textLabel.configuration', 2) }}</h5>
                <input v-model="globalFilter" type="text" class="form-control w-25" :placeholder="t('button.search')" />

                <button
                    type="button"
                    class="btn btn-success btn-sm d-flex align-items-center"
                    @click="prepareAddNewConfig"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#notificationProviderConfigDetailOffcanvas"
                >
                  <i class="bi bi-plus-lg me-1"></i> {{ t('button.add') }}
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
        <h5 class="offcanvas-title">{{ isEditConfig ? t('button.edit') : t('button.add') }}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
      </div>

      <div class="offcanvas-body">
        <!-- Force re-render with key to refresh initial-values -->
        <Form
            :key="notificationProviderConfigSelected ? 'edit-' + selectedIndex : 'new'"
            @submit="onSubmitOffCanvas"
            :validation-schema="useProviderConfigSchema"
            :initial-values="notificationProviderConfigSelected ?? undefined"
            v-slot="{ setFieldValue }"
        >
          <div class="mb-3">
            <label class="form-label fw-bold">{{ t('textLabel.key') }}</label>
            <Field name="providerConfigKey" class="form-control" />
            <ErrorMessage name="providerConfigKey" class="text-danger small" />
          </div>

          <div class="mb-3">
            <Field name="providerConfigValue" v-slot="{ field, value, errorMessage }">
              <div class="d-flex justify-content-between align-items-end mb-1">
                <label class="form-label fw-bold small text-uppercase text-muted mb-0">{{ t('textLabel.value') }}</label>

                <button
                    v-if="isJson(value)"
                    type="button"
                    class="btn btn-link btn-sm p-0 text-decoration-none shadow-none"
                    @click="beautifyField(value, setFieldValue)"
                >
                  <i class="bi bi-magic me-1"></i>{{ t('button.adjust') }}
                </button>
              </div>

              <textarea
                  v-bind="field"
                  class="form-control font-monospace"
                  :class="{
              'is-invalid': errorMessage,
              'border-info shadow-sm': isJson(value)
            }"
                  rows="6"
                  placeholder="Enter configuration value or paste JSON template..."
              ></textarea>

              <div v-if="errorMessage" class="invalid-feedback">{{ errorMessage }}</div>
              <div v-if="isJson(value)" class="text-info small mt-1" style="font-size: 0.75rem;">
                <i class="bi bi-info-circle me-1"></i>{{ t('textLabel.validJson') }}
              </div>
            </Field>
            <ErrorMessage name="providerConfigValue" class="text-danger small" />
          </div>

          <div class="row">
            <div class="col-md-12 mb-3">
              <div class="form-check form-switch">
                <Field name="providerConfigSecret" type="checkbox" :value="true" :unchecked-value="false" class="form-check-input" id="secretCheck" />
                <label class="form-check-label" for="secretCheck">{{ t('textLabel.isSecret') }} ?</label>
              </div>
            </div>
          </div>

          <div class="mt-4 d-flex gap-2">
            <button type="submit" class="btn btn-primary w-100">
              <i class="bi bi-save me-1"></i> {{ isEditConfig ? t('button.update') : t('button.add') }}
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
