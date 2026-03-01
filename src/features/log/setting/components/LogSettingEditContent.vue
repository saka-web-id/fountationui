<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate';
import {useApi} from "~/composables/useApi.ts";
import { onMounted } from "vue";
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
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
const { t } = useI18n();
const logSettingSchema = useLogSettingSchema();
const { handleSubmit, setValues, logSettingEndpoint, logSettingMethod, logSettingLogFormat, logSettingLogFormatAttrs, logSettingEnabled, logSettingEnabledAttrs } = useLogSettingForm();

onMounted(async () => {
  const { logSettingIdParam } = route.params;

  await get("/v0/logs/setting/detail/companyId/" + auth.user?.company.companyId + "/userId/" + auth.user?.id + "/valueLogSettingId/" + logSettingIdParam );

  setValues(mapLogSettingFromApi(data.value));

});

const submitForm = handleSubmit( async (values: LogSettingPayload) => {
      post("/v0/logs/setting/update/companyId/" + auth.user?.company.companyId + "/userId/" + auth.user?.id , values)
    }
)

</script>

<template>
  <section class="pt-2 pb-2">

    <div class="container">
      <ol class="breadcrumb ms-4 me-4">
        <li class="breadcrumb-item"><router-link to="/dashboard"><span>{{ t('textLabel.home') }}</span></router-link></li>
        <li class="breadcrumb-item"><router-link to="/company"><span>{{ t('textLabel.setting', 2) }}</span></router-link></li>
        <li class="breadcrumb-item active"><span>{{ t('textLabel.logSetting') }}</span></li>
      </ol>
      <div class="card mb-3 bg-gradient-dark">
        <div class="card-body ms-0 ps-0 me-0 pe-0 mt-0 pt-0 pb-0">
          <Form :validationSchema="logSettingSchema" class="text-center py-4" id="idform" v-slot="{ meta }" >
            <form @submit="submitForm" >
              <h4 class="text-start ms-2">{{ t('textLabel.companyAdd')  }}</h4>
              <div class="input-group mb-2">
                <span class="d-flex w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.name') }}</span>
                <Field as="input" type="text" name="logSettingEndpoint" v-model="logSettingEndpoint" class="form-control d-flex ms-0 ps-2 me-2 pe-4" readonly ></Field>
              </div>
              <div class="input-group mb-2">
                <span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.email') }}</span>
                <Field as="input" type="text" name="logSettingMethod" v-model="logSettingMethod" class="form-control me-2 pe-2" readonly ></Field>
              </div>
              <div class="input-group mb-2"></div>
                <div class="text-start d-flex">
                  <span class="d-flex w-25 ms-2 ps-3 me-2 mb-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.status') }}</span>
                  <div class="form-check form-check-inline">
                    <Field  type="radio" name="logSettingLogFormat" v-model="logSettingLogFormat" v-bind="logSettingLogFormatAttrs" value="URI_ONLY" class="form-check-input" ></Field>
                    <label class="form-check-label" for="statusEnabled">URI Only</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <Field type="radio" name="logSettingLogFormat" v-model="logSettingLogFormat" v-bind="logSettingLogFormatAttrs" value="PARTIAL_BODY"  class="form-check-input" ></Field>
                    <label class="form-check-label" for="statusDisabled">Partial Body</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <Field type="radio" name="logSettingLogFormat" v-model="logSettingLogFormat" v-bind="logSettingLogFormatAttrs" value="FULL_BODY"  class="form-check-input" ></Field>
                    <label class="form-check-label" for="statusDisabled">Full Body</label>
                  </div>
                  <ErrorMessage name="logSettingLogFormat" class="text-start text-danger" />
              </div>
              <div class="text-start">
                <div class="input-group mb-2"></div>
                <div class="text-start d-flex">
                  <span class="d-flex w-25 ms-2 ps-3 me-2 mb-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.status') }}</span>
                  <div class="form-check form-check-inline">
                    <Field  type="radio" name="logSettingEnabled" v-model="logSettingEnabled" v-bind="logSettingEnabledAttrs" :value="true" class="form-check-input" ></Field>
                    <label class="form-check-label" for="statusEnabled">{{ t('button.enable') }}</label>
                  </div>

                  <div class="form-check form-check-inline">
                    <Field type="radio" name="logSettingEnabled" v-model="logSettingEnabled" v-bind="logSettingEnabledAttrs" :value="false"  class="form-check-input" ></Field>
                    <label class="form-check-label" for="statusDisabled"> {{ t('button.disable') }} </label>
                  </div>
                  <ErrorMessage name="logSettingEnabled" class="text-start text-danger" />
                </div>
                <button :disabled="!meta.valid || loading"  class="btn btn-outline-primary ms-2 me-2" @click="submitForm" type="button">{{ loading ? t('button.saving') : t('button.save') }}</button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <div class="card bg-gradient-dark">
        <div class="card-body ms-0 ps-0 me-0 pe-0 mt-0 pt-0 pb-0"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
