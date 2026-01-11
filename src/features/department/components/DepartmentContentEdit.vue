<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import {useApi} from "~/composables/useApi";
import {useDepartmentSchema} from "~/features/department/hooks/schemas/department.schema";
import {useRoute} from "vue-router";
import {computed, onMounted} from "vue";
import {  useDepartmentForm,  mapDepartmentFromApi,  type DepartmentPayload } from "~/features/department/hooks/forms/useDepartmentForm"
import {ErrorMessage, Field, Form} from "vee-validate";
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
const { t } = useI18n();
const { data: companyData, get: getCompany } = useApi();
const { data, loading, get, post } = useApi();
const route = useRoute();
const departmentScheme = useDepartmentSchema();
const { handleSubmit, setValues, departmentId, departmentIdAttrs, companyId, companyIdAttrs, departmentName, departmentNameAttrs, departmentStatus, departmentStatusAttrs, departmentDescription, departmentDescriptionAttrs } = useDepartmentForm();

const isEdit = computed(() => !!route.params.paramDepartmentId);
const { paramCompanyId, paramDepartmentId } = route.params;

onMounted(async () => {
  if (isEdit.value) {
    await get("/api/v0/user/organization/department/detail/companyId/" + paramCompanyId + "/userId/" + auth.user?.id + "/" + paramDepartmentId);

    console.log("Data =", data.value);

    setValues(mapDepartmentFromApi(data.value));
  }

  await getCompany("/api/v0/user/organization/company/list/companyId/" + auth.user?.company.companyId + "/userId/" + auth.user?.id + "/valueCompanyId/" + paramCompanyId);

  console.log("Data =", companyData.value);

  setValues({ companyId: Number(paramCompanyId) })

});

const submitForm = handleSubmit( async (values: DepartmentPayload) => {
      if (isEdit.value) {
        console.log("RUNNING EDIT" + values.departmentStatus);

        post("/api/v0/user/organization/department/update/companyId/" + auth.user?.company.companyId + "/userId/" + auth.user?.id, values)
      } else {
        console.log("RUNNING ADD" + values);

        post("/api/v0/user/organization/department/add/companyId/" + auth.user?.company.companyId + "/userId/" + auth.user?.id, values)
      }
    }
)

</script>

<template>
  <section class="pt-2 pb-2">
    <div class="container">
      <ol class="breadcrumb ms-4 me-4">
        <li class="breadcrumb-item"><router-link to="/dashboard"><span>{{ t('textLabel.dashboard') }}</span></router-link></li>
        <li class="breadcrumb-item"><router-link to="/company"><span>{{ t('textLabel.company', 2) }}</span></router-link></li>
        <li class="breadcrumb-item">
          <router-link :to="{ name: 'companydepartment', params: { companyId } }">
            <span>{{ t('textLabel.department', 2) }}</span>
          </router-link>
        </li>
        <li class="breadcrumb-item active"><span>{{ isEdit ? t('button.edit') : t('button.add') }}</span></li>
      </ol>
      <div class="card mb-3 bg-gradient-dark">
        <div class="card-body ms-0 ps-0 me-0 pe-0 mt-0 pt-0 pb-0">
          <Form :validation-schema="departmentScheme" id="idform" v-slot="{ meta }" class="text-center py-4" >
              <h4 class="text-start ms-2">{{ t('textLabel.departmentEdit') }}</h4>
              <input type="hidden" v-model="departmentId" v-bind="departmentIdAttrs" >
              <div class="input-group mb-2">
                <span class="d-flex w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.company') }}</span>
                <select v-model="companyId" v-bind="companyIdAttrs" class="form-control d-flex ms-0 ps-2 me-2 pe-4" type="text">
                  <option v-for="company in companyData" :value="company.companyId">{{ company.companyName }}</option>
                </select>
              </div>
              <div class="input-group mb-2">
                <span class="d-flex w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.name') }}</span>
                <Field as="input" type="text" name="departmentName" v-model="departmentName" v-bind="departmentNameAttrs"  class="form-control d-flex ms-0 ps-2 me-2 pe-4" ></Field>
                <ErrorMessage name="departmentName" class="text-start text-danger d-flex ms-0 ps-2 me-2 pe-4" />
              </div>
              <div class="input-group mb-2">
                <span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.description', 1) }}</span>
                <Field as="input" type="text" name="departmentDescription" v-model="departmentDescription" v-bind="departmentDescriptionAttrs"  class="form-control d-flex ms-0 ps-2 me-2 pe-4" ></Field>
                <ErrorMessage name="departmentDescription" class="text-start text-danger d-flex ms-0 ps-2 me-2 pe-4" />
              </div>
              <div class="text-start">
                <div class="input-group mb-2"></div>
                <div class="text-start d-flex">
                  <span class="d-flex w-25 ms-2 ps-3 me-2 mb-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.status') }}</span>
                  <div class="form-check form-check-inline text-start">
                    <Field  type="radio" name="departmentStatus" v-model="departmentStatus" v-bind="departmentStatusAttrs" value="ENABLED" class="form-check-input" ></Field>
                    <label class="form-check-label" for="formCheck-4">{{ t('button.enable') }}</label>
                  </div>
                  <div class="form-check form-check-inline text-start">
                    <Field  type="radio" name="departmentStatus" v-model="departmentStatus" v-bind="departmentStatusAttrs" value="DISABLED" class="form-check-input" ></Field>
                    <label class="form-check-label" for="formCheck-5">{{ t('button.disable') }}</label>
                  </div>
                  <ErrorMessage name="departmentStatus" class="text-start text-danger" />
                </div>
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