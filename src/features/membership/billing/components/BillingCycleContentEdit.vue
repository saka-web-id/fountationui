<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate';
import { useApi } from "~/composables/useApi";
import { onMounted, computed } from "vue";
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/auth'
import { useBillingCycleSchema } from "~/features/membership/billing/hooks/schemas/billingcycle.schema";
import {  useBillingCycleForm,  mapBillingCycleFromApi,  type BillingCyclePayload } from "~/features/membership/billing/hooks/forms/useBillingCycleForm";

const { handleSubmit, setValues, billingCycleName, billingCycleNameAttrs, billingCycleDuration, billingCycleDurationAttrs } = useBillingCycleForm();
const billingCycleSchema = useBillingCycleSchema();
const auth = useAuthStore()
const { data, loading, get, post } = useApi();
const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const { companyIdParam, billingCycleIdParam } = route.params;

const isEdit = computed(() => !!route.params.billingCycleIdParam)

onMounted(async () => {
  if (isEdit.value) {
    await get("/v0/account/membership/billing/cycle/detail/companyId/" + companyIdParam + "/userId/" + auth.user?.id + "/valueBillingCycleId/" + billingCycleIdParam);

    console.log("Data =", data.value);

    setValues(mapBillingCycleFromApi(data.value));
  } else {

    setValues({ billingCycleCompanyId: Number(companyIdParam) });
  }
});

const submitForm = handleSubmit( async (values: BillingCyclePayload) => {
      if (isEdit.value) {
        post("/v0/account/membership/billing/cycle/update/companyId/" + auth.user?.company.companyId + "/userId/" + auth.user?.id , values)
      } else {
        // force ID to null before sending
        const sanitizedValues = {...values, billingCycleId: null };

        console.log("RUNNING ADD" + sanitizedValues);
        post("/v0/account/membership/billing/cycle/add/companyId/" + auth.user?.company.companyId + "/userId/" + auth.user?.id , sanitizedValues)
      }
    }
)

function goBack() {
  router.back();   // equivalent to $router.back()
}


</script>

<template>
  <section class="pt-2 pb-2">

    <div class="container">
      <ol class="breadcrumb ms-4 me-4">
        <li class="breadcrumb-item"><router-link to="/dashboard"><span>{{ t('textLabel.home') }}</span></router-link></li>
        <li class="breadcrumb-item"><router-link :to="'/membership/' + companyIdParam"><span>{{ t('textLabel.membership', 2) }}</span></router-link></li>
        <li class="breadcrumb-item">
          <a href="javascript:void(0)" @click="goBack">
            <span>{{ t('textLabel.membership', 1) }}</span>
          </a>
        </li>
        <li class="breadcrumb-item active"><span>{{ isEdit ? t('button.edit') : t('button.add') }} {{ t('textLabel.billingCycle', 1) }}</span></li>
      </ol>
      <div class="card mb-3 bg-gradient-dark">
        <div class="card-body ms-0 ps-0 me-0 pe-0 mt-0 pt-0 pb-0">
          <div class="row d-flex justify-content-between align-items-center me-2 mt-2 mb-2">
            <div class="col-auto">
              <h4 class="ps-3">{{ t('textLabel.billingCycle', 1) }}</h4>
            </div>
          </div>

          <Form :validationSchema="billingCycleSchema" v-slot="{ meta }" class="text-center py-4">
            <h4 class="text-start ms-2">{{ isEdit ? t('button.edit') : t('button.add')  }}</h4>
            <div class="input-group mb-2">
              <span class="d-flex w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.name') }}</span>
              <Field as="input" type="text" name="billingCycleName" v-model="billingCycleName" v-bind="billingCycleNameAttrs"  class="form-control d-flex ms-0 ps-2 me-2 pe-4" ></Field>
              <ErrorMessage name="billingCycleName" class="text-start text-danger d-flex ms-0 ps-2 me-2 pe-4" />
            </div>
            <div class="input-group mb-2">
              <span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.duration') }}</span>
              <Field as="input" type="number" name="billingCycleDuration" v-model="billingCycleDuration" v-bind="billingCycleDurationAttrs" class="form-control me-2 pe-2" ></Field>
              <ErrorMessage name="billingCycleDuration" class="text-start text-danger d-flex ms-0 ps-2 me-2 pe-4" />
            </div>
            <div class="text-start">
              <button :disabled="!meta.valid || loading"  class="btn btn-outline-primary ms-2 me-2" @click="submitForm" type="button">{{ loading ? t('button.saving') : t('button.save') }}</button>
            </div>
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
