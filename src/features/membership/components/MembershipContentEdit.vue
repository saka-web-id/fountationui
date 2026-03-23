<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate';
import { useApi } from "~/composables/useApi.ts";
import { onMounted, computed } from "vue";
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/auth'
import { useMembershipSchema } from "~/features/membership/hooks/schemas/membership.schema.ts";
import { useMembershipForm,  mapMembershipFromApi,  type MembershipPayload } from "~/features/membership/hooks/forms/useMembershipForm";

const { handleSubmit, setValues, membershipPlanName, membershipPlanNameAttrs, membershipPlanPrice, membershipPlanPriceAttrs, membershipPlanBillingCycle, membershipPlanBillingCycleAttrs, membershipPlanFeatures, membershipPlanFeaturesAttrs} = useMembershipForm();
const membershipSchema = useMembershipSchema();
const auth = useAuthStore()
const { data, loading, get, post } = useApi();
const { data: dataBillingCycle, get: getBillingCycle } = useApi();
const route = useRoute();
const { t } = useI18n();
const router = useRouter();

const { companyIdParam, membershipIdParam } = route.params;

const isEdit = computed(() => !!route.params.membershipIdParam)

onMounted(async () => {
  if (isEdit.value) {
    await get("/v0/account/membership/plan/detail/companyId/" + companyIdParam + "/userId/" + auth.user?.id + "/valueMembershipPlanId/" + membershipIdParam);

    console.log("Data =", data.value);

    setValues(mapMembershipFromApi(data.value));
  }

  await getBillingCycle("/v0/account/membership/billing/cycle/list/companyId/" + companyIdParam + "/userId/" + auth.user?.id + "/valueCompanyId/" + companyIdParam );


  console.log("Data Billing Cycle : " + dataBillingCycle.value);

});

const submitForm = handleSubmit( async (values: MembershipPayload) => {
      if (isEdit.value) {
        post("/v0/account/membership/plan/update/companyId/" + auth.user?.company.companyId + "/userId/" + auth.user?.id, values)
      } else {
        console.log("RUNNING ADD" + values);

        post("/v0/account/membership/plan/add/companyId/" + auth.user?.company.companyId + "/userId/" + auth.user?.id, values)
      }
    }
)

</script>

<template>
  <section class="pt-2 pb-2">

    <div class="container">
      <ol class="breadcrumb ms-2 me-2">
        <li class="breadcrumb-item"><router-link to="/dashboard"><span>{{ t('textLabel.home') }}</span></router-link></li>
        <li class="breadcrumb-item">
          <router-link :to="'/membership/' + companyIdParam">
            <span>{{ t('textLabel.membership', 2) }}</span>
          </router-link>
        </li>
        <li class="breadcrumb-item active"><span>{{ isEdit ? t('button.edit') : t('button.add') }}</span></li>
      </ol>
      <div class="card mb-3 bg-gradient-dark">
        <div class="card-body ms-0 ps-0 me-0 pe-0 mt-0 pt-0 pb-0">
          <div class="row d-flex justify-content-between align-items-center me-2 mt-2 mb-2">
            <div class="col-auto">
              <h4 class="ps-0 ps-md-3 fs-5 fs-md-3 ms-2">{{ t('textLabel.membership', 1) }}</h4>
            </div>
            <div class="col-auto">
              <button @click="router.push({ name: 'billingcycleadd' })" class="btn btn-outline-primary" type="button">{{ t('button.add') }}</button>
            </div>
          </div>

          <Form :validationSchema="membershipSchema" class="text-center py-4" id="idform"  v-slot="{ meta }" >
            <form @submit="submitForm" >
              <h4 class="text-start ms-2">{{ isEdit ? t('button.edit') : t('button.add')  }}</h4>
              <div class="input-group mb-2">
                <span class="d-flex w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.name') }}</span>
                <Field as="input" type="text" name="membershipPlanName" v-model="membershipPlanName" v-bind="membershipPlanNameAttrs"  class="form-control d-flex ms-0 ps-2 me-2 pe-4" ></Field>
                <ErrorMessage name="membershipPlanName" class="text-start text-danger d-flex ms-0 ps-2 me-2 pe-4" />
              </div>
              <div class="input-group mb-2">
                <span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.billing') }}</span>
                <Field as="input" type="number" name="membershipPlanPrice" v-model="membershipPlanPrice" v-bind="membershipPlanPriceAttrs" class="form-control me-2 pe-2" ></Field>
                <ErrorMessage name="membershipPlanPrice" class="text-start text-danger d-flex ms-0 ps-2 me-2 pe-4" />
              </div>
              <div class="input-group mb-2">
                <span class="d-flex w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.duration') }}</span>
                <select v-model="membershipPlanBillingCycle" v-bind="membershipPlanBillingCycleAttrs" class="form-control d-flex ms-0 ps-2 me-2 pe-4" type="text">
                  <option v-for="billingCycle in dataBillingCycle" :value="billingCycle.billingCycleName">{{ billingCycle.billingCycleName }}</option>
                </select>
              </div>
              <div class="input-group mb-2">
                <span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.feature', 2) }}</span>
                <Field as="textarea" type="url" name="membershipPlanFeatures" v-model="membershipPlanFeatures" v-bind="membershipPlanFeaturesAttrs" class="form-control me-2 pe-2" rows="10" style="font-family: monospace;" ></Field>
                <ErrorMessage name="membershipPlanFeatures" class="text-start text-danger d-flex ms-0 ps-2 me-2 pe-4" />
              </div>
              <div class="text-start">
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
