<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate';
import {useApi} from "~/composables/useApi.ts";
import { onMounted, computed } from "vue";
import { useCompanySchema  } from "~/features/company/hooks/schemas/company.schema";
import {type CompanyPayload, mapCompanyFromApi, useCompanyForm} from "~/features/company/hooks/forms/useCompanyForm";
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
const { data, loading, get, post } = useApi();
const route = useRoute();
const { t } = useI18n();
const companySchema = useCompanySchema();
const { handleSubmit, setValues, companyId, companyIdAttrs, companyName, companyNameAttrs, companyAddress, companyAddressAttrs, companyPhone, companyPhoneAttrs, companyEmail, companyEmailAttrs, companyWebsite, companyWebsiteAttrs, companyDescription, companyDescriptionAttrs, companyLogoUrl, companyLogoUrlAttrs, companyTaxId, companyTaxIdAttrs, companyRegistrationId, companyRegistrationIdAttrs, companyStatus, companyStatusAttrs, companyIndustry, companyIndustryAttrs, companyType, companyTypeAttrs } = useCompanyForm();

const isEdit = computed(() => !!route.params.companyIdParam)

onMounted(async () => {
  if (isEdit.value) {
    const { companyIdParam } = route.params;

    await get("/api/v0/user/organization/company/detail/companyId/" + companyIdParam + "/userId/" + auth.user?.id);

    setValues(mapCompanyFromApi(data.value));
  }
});


const submitForm = handleSubmit( async (values: CompanyPayload) => {
        if (isEdit.value) {
          post("/api/v0/user/organization/company/update/companyId/" + auth.user?.company.companyId + "/userId/" + auth.user?.id , values)
        } else {
          post("/api/v0/user/organization/company/add/companyId/" + auth.user?.company.companyId + "/userId/" + auth.user?.id, values)
        }
    }
)

</script>

<template>
  <section class="pt-2 pb-2">

    <div class="container">
      <ol class="breadcrumb ms-4 me-4">
        <li class="breadcrumb-item"><router-link to="/dashboard"><span>{{ t('textLabel.home') }}</span></router-link></li>
        <li class="breadcrumb-item"><router-link to="/company"><span>{{ t('textLabel.company', 2) }}</span></router-link></li>
        <li class="breadcrumb-item active"><span>{{ isEdit ? t('button.edit') : t('button.add') }}</span></li>
      </ol>
      <div class="card mb-3 bg-gradient-dark">
        <div class="card-body ms-0 ps-0 me-0 pe-0 mt-0 pt-0 pb-0">
          <Form :validationSchema="companySchema" class="text-center py-4" id="idform" v-slot="{ meta }" >
            <form @submit="submitForm" >
              <h4 class="text-start ms-2">{{ isEdit ? t('textLabel.companyEdit') : t('textLabel.companyAdd')  }}</h4>
              <input type="hidden" v-model="companyId" v-bind="companyIdAttrs" >
              <div class="input-group mb-2">
                <span class="d-flex w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.name') }}</span>
                <Field as="input" type="text" name="companyName" v-model="companyName" v-bind="companyNameAttrs"  class="form-control d-flex ms-0 ps-2 me-2 pe-4" ></Field>
                <ErrorMessage name="companyName" class="text-start text-danger d-flex ms-0 ps-2 me-2 pe-4" />
              </div>
              <div class="input-group mb-2">
                <span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.email') }}</span>
                <Field as="input" type="email" name="companyEmail" v-model="companyEmail" v-bind="companyEmailAttrs" class="form-control me-2 pe-2" ></Field>
                <ErrorMessage name="companyEmail" class="text-start text-danger d-flex ms-0 ps-2 me-2 pe-4" />
              </div>
              <div class="input-group mb-2">
                <span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.phone') }}</span>
                <Field as="input" type="tel" name="companyPhone" v-model="companyPhone" v-bind="companyPhoneAttrs" class="form-control me-2 pe-2" ></Field>
                <ErrorMessage name="companyPhone" class="text-start text-danger d-flex ms-0 ps-2 me-2 pe-4" />
              </div>
              <div class="input-group mb-2">
                <span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.website') }}</span>
                <Field as="input" type="url" name="companyWebsite" v-model="companyWebsite" v-bind="companyWebsiteAttrs" class="form-control me-2 pe-2" ></Field>
                <ErrorMessage name="companyWebsite" class="text-start text-danger d-flex ms-0 ps-2 me-2 pe-4" />
              </div>
              <div class="input-group mb-2">
                <span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.logo') }} URL</span>
                <Field as="input" type="url" name="companyLogoUrl" v-model="companyLogoUrl" v-bind="companyLogoUrlAttrs" class="form-control me-2 pe-2" ></Field>
                <ErrorMessage name="companyLogoUrl" class="text-start text-danger d-flex ms-0 ps-2 me-2 pe-4" />
              </div>
              <div class="input-group mb-2">
                <span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.type') }}</span>
                <Field as="input" type="text" name="companyType" v-model="companyType" v-bind="companyTypeAttrs" class="form-control me-2 pe-2" ></Field>
                <ErrorMessage name="companyType" class="text-start text-danger d-flex ms-0 ps-2 me-2 pe-4" />
              </div>
              <div class="input-group mb-2">
                <span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.industry') }}</span>
                <Field as="input" type="text" name="companyIndustry" v-model="companyIndustry" v-bind="companyIndustryAttrs" class="form-control me-2 pe-2" ></Field>
                <ErrorMessage name="companyIndustry" class="text-start text-danger d-flex ms-0 ps-2 me-2 pe-4" />
              </div>
              <div class="input-group mb-2">
                <span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.taxId') }}</span>
                <Field as="input" type="text" name="companyTaxId" v-model="companyTaxId" v-bind="companyTaxIdAttrs" class="form-control me-2 pe-2" ></Field>
                <ErrorMessage name="companyTaxId" class="text-start text-danger d-flex ms-0 ps-2 me-2 pe-4" />
              </div>
              <div class="input-group mb-2">
                <span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.registrationNumber') }}</span>
                <Field as="input" type="text" name="companyRegistrationId" v-model="companyRegistrationId" v-bind="companyRegistrationIdAttrs" class="form-control me-2 pe-2" ></Field>
                <ErrorMessage name="companyRegistrationId" class="text-start text-danger d-flex ms-0 ps-2 me-2 pe-4" />
              </div>
              <div class="text-start">
                <div class="input-group mb-2"></div>
                <div class="text-start d-flex">
                  <span class="d-flex w-25 ms-2 ps-3 me-2 mb-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">Status</span>
                  <div class="form-check form-check-inline">
                    <!--<input class="form-check-input" type="radio" id="statusEnabled" value="enabled" v-model="companyStatus" v-bind="companyStatusAttrs"  />-->
                    <Field  type="radio" name="companyStatus" v-model="companyStatus" v-bind="companyStatusAttrs" value="ENABLED" class="form-check-input" ></Field>
                    <label class="form-check-label" for="statusEnabled">{{ t('button.enable') }}</label>
                  </div>

                  <div class="form-check form-check-inline">
                    <!-- <input class="form-check-input" type="radio" id="statusDisabled" value="disabled" v-model="companyStatus" />-->
                    <Field type="radio" name="companyStatus" v-model="companyStatus" v-bind="companyStatusAttrs" value="DISABLED"  class="form-check-input" ></Field>
                    <label class="form-check-label" for="statusDisabled"> {{ t('button.disable') }} </label>
                  </div>

                  <ErrorMessage name="companyStatus" class="text-start text-danger" />
                </div>
                <div class="input-group mb-2">
                  <span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.address') }}</span>
                  <!--<textarea class="form-control" aria-label="With textarea" v-model="companyAddress" v-bind="companyAddressAttrs"></textarea>-->
                  <Field as="textarea" name="companyAddress" class="form-control" aria-label="With textarea" v-model="companyAddress" v-bind="companyAddressAttrs"></Field>
                  <ErrorMessage name="companyAddress" class="text-start text-danger" />
                </div>
                <div class="input-group mb-2">
                  <span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.description') }}</span>
                  <!--<textarea class="form-control" aria-label="With textarea" v-model="companyDescription" v-bind="companyDescriptionAttrs"></textarea>-->
                  <Field as="textarea" name="companyDescription" class="form-control" aria-label="With textarea" v-model="companyDescription" v-bind="companyDescriptionAttrs"></Field>
                  <ErrorMessage name="companyDescription" class="text-start text-danger" />
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
