<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useApi } from "~/composables/useApi";
import { onMounted, ref, watch} from "vue";
import { useRoute } from 'vue-router';
import { useAuthStore } from "~/stores/auth.ts";
import {
  useNotificationRequestPayload
} from "~/features/notification/settings/whatapps/hooks/forms/useWhatappsSettingTestForm.ts";
import type { ProviderPayload } from "~/features/notification/providers/interfaces/provider.payload.ts";
import { mapProviderDataFromApi } from '~/features/notification/providers/api/provider.mapper';

const { data: providerPayload, get: getNotificationProvider } = useApi<ProviderPayload[]>();
const { t } = useI18n();
const route = useRoute();
const auth = useAuthStore();
const { providerIdParam, companyIdParam } = route.params;
const { loading, post } = useApi();
const mappedProviders = ref<ProviderPayload[]>([]);

// Form Manager from useProviderPayload
const {
  handleSubmit,
  meta,
  errors: formErrors,
  providerSlug,
  notificationSource,
  notificationDestination,
  notificationSubject,
  notificationMessage
} = useNotificationRequestPayload();

onMounted(async () => {
  await getNotificationProvider(`/v0/notification/provider/list/companyId/${auth.user?.company.companyId}/userId/${auth.user?.id}/valueCompanyId/${companyIdParam}/notificationType/WHATSAPP`);
});

// Gunakan watch untuk mapping data secara otomatis saat API selesai
watch(providerPayload, (newData) => {
  if (newData) {
    mappedProviders.value = newData.map(mapProviderDataFromApi);
  }
}, { immediate: true });

const submitForm = handleSubmit(async (values) => {
  const companyId = auth.user?.company.companyId;
  const userId = auth.user?.id;

  const url = `/v0/notification/provider/config/test/companyId/${companyId}/userId/${userId}/valueCompanyId/${companyIdParam}/providerId/${providerIdParam}`;

  try {
    console.log("Submitting payload to backend:", values);

    await post(url, values);

  } catch (error: any) {
    console.error("Failed to submit form:", error.response?.data || error.message);
  }
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
        <li class="breadcrumb-item active">{{ t('button.test') }}</li>
      </ol>

      <div class="card mb-3 bg-gradient-dark">
        <div class="card-body p-4">
          <div id="idform">
            <h4 class="mb-4">{{ t('button.test') }}</h4>

            <div class="row mb-3">

              <!--   PROVIDER SLUG   -->
              <div class="col-md-6">
                <div class="input-group mb-2">
                  <span class="input-group-text w-25">Provider</span>
                  <select class="form-select ps-2" v-model="providerSlug">
                    <option value="" disabled>Select Provider</option>
                    <option v-for="provider in mappedProviders" :key="provider.providerId" :value="provider.providerSlug">
                      {{ provider.providerName }} ({{ provider.providerSlug }})
                    </option>
                  </select>
                </div>
                <div v-if="formErrors.providerSlug" class="text-danger small">{{ formErrors.providerSlug }}</div>
              </div>

              <div class="col-md-6">
                <div class="input-group mb-2">
                  <span class="input-group-text w-25">Source</span>
                  <input v-model="notificationSource" type="text" class="form-control" placeholder="Sender Account / Number" />
                </div>
                <div v-if="formErrors.notificationSource" class="text-danger small">{{ formErrors.notificationSource }}</div>
              </div>

              <div class="col-md-6">
                <div class="input-group mb-2">
                  <span class="input-group-text w-25">Destination</span>
                  <input v-model="notificationDestination" type="text" class="form-control" placeholder="Recipient Number" />
                </div>
                <div v-if="formErrors.notificationDestination" class="text-danger small">{{ formErrors.notificationDestination }}</div>
              </div>

              <!-- Subject is usually not used in WhatsApp, but kept for payload consistency -->
              <div class="col-md-6">
                <div class="input-group mb-2">
                  <span class="input-group-text w-25">Subject</span>
                  <input v-model="notificationSubject" type="text" class="form-control" placeholder="(Optional)" />
                </div>
              </div>

              <div class="col-12 mt-2">
                <label class="form-label">Message Content</label>
                <textarea v-model="notificationMessage" class="form-control" rows="4"></textarea>
                <div v-if="formErrors.notificationMessage" class="text-danger small">{{ formErrors.notificationMessage }}</div>
              </div>

            </div>

            <div class="mt-4">
              <button :disabled="!meta.valid || loading"  class="btn btn-outline-primary ms-2 me-2" @click="submitForm" type="button">
                {{ loading ? t('button.saving') : t('button.test') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>
