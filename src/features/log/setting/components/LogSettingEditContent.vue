<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate';
import { useApi } from "~/composables/useApi.ts";
import { onMounted, ref } from "vue";
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/auth'
import { useLogSettingSchema } from "~/features/log/setting/hooks/schemas/logsetting.schema.ts";
import {
  type LogSettingPayload,
  mapLogSettingFromApi,
  useLogSettingForm
} from "~/features/log/setting/hooks/forms/useLogSettingForm.ts";

const auth = useAuthStore()
const { data, loading, get, post } = useApi();
const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const logSettingSchema = useLogSettingSchema();
const { handleSubmit, setValues, logSettingEndpoint, logSettingMethod, logSettingLogFormat, logSettingEnabled } = useLogSettingForm();
const { companyIdParam, logSettingIdParam } = route.params as { companyIdParam: string, logSettingIdParam: string };
const isEdit = ref(false);

onMounted(async () => {
  
  if (logSettingIdParam) {
    isEdit.value = true;
    await get("/v0/logs/setting/detail/companyId/" + auth.user?.company.companyId + "/userId/" + auth.user?.id + "/valueLogSettingId/" + logSettingIdParam );

    console.log("Data value ", data.value);

    if (data.value) {
      setValues(mapLogSettingFromApi(data.value));
    }

  } else {
    isEdit.value = false;
    setValues({
      logSettingId: 0,
      logSettingEndpoint: "",
      logSettingMethod: "GET",
      logSettingLogFormat: "URI_ONLY",
      logSettingEnabled: true,
      logSettingCompanyId: Number(companyIdParam),
      logSettingCreatedAt: "",
      logSettingUpdatedAt: ""
    });
  }
});

const submitForm = handleSubmit(async (values: LogSettingPayload) => {
  const companyIdParam = route.params.companyIdParam;
  const url = isEdit.value 
    ? "/v0/logs/setting/update/companyId/" + companyIdParam + "/userId/" + auth.user?.id
    : "/v0/logs/setting/add/companyId/" + companyIdParam + "/userId/" + auth.user?.id;
  
  await post(url, values);
  router.push({ name: 'logsettinglist', params: { companyIdParam } });
});

</script>

<template>
  <section class="pt-2 pb-2">
    <div class="container">
      <ol class="breadcrumb ms-2 me-2">
        <li class="breadcrumb-item"><router-link to="/dashboard"><span>{{ t('textLabel.dashboard') }}</span></router-link></li>
        <li class="breadcrumb-item"><router-link to="/logsetting"><span>{{ t('textLabel.logSetting', 2) }}</span></router-link></li>
        <li class="breadcrumb-item">
          <router-link :to="{ name: 'logsettinglist', params: { companyIdParam: companyIdParam } }">
            <span>List</span>
          </router-link>
        </li>
        <li class="breadcrumb-item active"><span>{{ isEdit ? t('button.edit') : t('button.add') }}</span></li>
      </ol>
      <div class="card mb-3 bg-gradient-dark">
        <div class="card-body py-4">
          <Form :validationSchema="logSettingSchema" id="idform" v-slot="{ meta }" >
            <h4 class="ps-0 ps-md-3 fs-5 fs-md-3">{{ isEdit ? 'Edit Log Setting' : 'Add Log Setting' }}</h4>
            
            <div class="input-group mb-3">
              <span class="input-group-text w-25">{{ t('textLabel.endpoint') }}</span>
              <Field name="logSettingEndpoint" v-model="logSettingEndpoint" class="form-control bg-light" placeholder="/api/v0/..." readonly />
              <ErrorMessage name="logSettingEndpoint" class="d-block w-100 text-start text-danger small mt-1" />
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text w-25">{{ t('textLabel.method') }}</span>
              <Field name="logSettingMethod" v-model="logSettingMethod" class="form-control bg-light" placeholder="GET/POST/..." readonly />
              <ErrorMessage name="logSettingMethod" class="d-block w-100 text-start text-danger small mt-1" />
            </div>

            <div class="row mb-3 align-items-center">
              <div class="col-md-3">
                <label class="form-label mb-0 ms-2">{{ t('textLabel.logFormat') }}</label>
              </div>
              <div class="col-md-9">
                <div class="form-check form-check-inline">
                  <Field type="radio" name="logSettingLogFormat" value="URI_ONLY" v-model="logSettingLogFormat" class="form-check-input" />
                  <label class="form-check-label">URI Only</label>
                </div>
                <div class="form-check form-check-inline">
                  <Field type="radio" name="logSettingLogFormat" value="PARTIAL_BODY" v-model="logSettingLogFormat" class="form-check-input" />
                  <label class="form-check-label">Partial Body</label>
                </div>
                <div class="form-check form-check-inline">
                  <Field type="radio" name="logSettingLogFormat" value="FULL_BODY" v-model="logSettingLogFormat" class="form-check-input" />
                  <label class="form-check-label">Full Body</label>
                </div>
                <ErrorMessage name="logSettingLogFormat" class="d-block text-danger small mt-1" />
              </div>
            </div>

            <div class="row mb-4 align-items-center">
              <div class="col-md-3">
                <label class="form-label mb-0 ms-2">{{ t('textLabel.enabled') }}</label>
              </div>
              <div class="col-md-9">
                <div class="form-check form-check-inline">
                  <Field type="radio" name="logSettingEnabled" :value="true" v-model="logSettingEnabled" class="form-check-input" />
                  <label class="form-check-label">{{ t('button.enable') }}</label>
                </div>
                <div class="form-check form-check-inline">
                  <Field type="radio" name="logSettingEnabled" :value="false" v-model="logSettingEnabled" class="form-check-input" />
                  <label class="form-check-label">{{ t('button.disable') }}</label>
                </div>
                <ErrorMessage name="logSettingEnabled" class="d-block text-danger small mt-1" />
              </div>
            </div>

            <div class="text-start ms-2">
              <button :disabled="!meta.valid || loading" class="btn btn-primary px-4" @click="submitForm" type="submit">
                <span v-if="loading" class="spinner-border spinner-border-sm me-1"></span>
                {{ loading ? t('button.saving') : t('button.save') }}
              </button>
              <button class="btn btn-outline-secondary ms-2" type="button" @click="router.back()">{{ t('button.close') }}</button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.input-group-text {
  background-color: var(--bs-gray-200);
  font-weight: 500;
}
</style>
