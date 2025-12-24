<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import {useApi} from "~/composables/useApi";
import {computed, onMounted} from "vue";
import {mapUserFromApi, useUserForm, type UserPayload} from "~/features/user/hooks/forms/useUserForm";
import {useRoute} from "vue-router";
import { useUserSchema } from "~/features/user/hooks/schemas/user.schemas";
import {ErrorMessage, Field, Form} from "vee-validate";

const { t } = useI18n();
const { data, loading, get, post } = useApi();
const { data: companyData, get: getCompany } = useApi();
const { data: departmentData, get: getDepartment } = useApi();
const route = useRoute();
const userScheme = useUserSchema();
const { handleSubmit, setValues, userName, userNameAttrs, userEmail, userEmailAttrs, userPhone, userPhoneAttrs, userStatus, userStatusAttrs, userIsVerified, userIsVerifiedAttrs, userNote, userNoteAttrs, companyId, companyIdAttrs, departmentId, departmentIdAttrs } = useUserForm();

const isEdit = computed(() => !!route.params.id);
const { id, companyIdParam, departmentIdParam } = route.params;

onMounted(async () => {
  if (isEdit.value) {

    await get("/api/v0/user/detail/" + id);

    setValues(mapUserFromApi(data.value));
  }

  await getCompany("/api/v0/user/organization/company/list/" + companyIdParam );

  await getDepartment('/api/v0/user/organization/department/list/' + departmentIdParam);

});

const submitForm = handleSubmit( async (values: UserPayload) => {
        if (isEdit.value) {
          post("/api/v0/user/update", values)
        } else {
          post("/api/v0/user/add", values)
        }

    }
)

</script>

<template>
  <section class="pt-2 pb-2">
    <div class="container">
      <ol class="breadcrumb ms-4">
        <li class="breadcrumb-item"><router-link to="/dashboard"><span>Home</span></router-link></li>
        <li class="breadcrumb-item"><router-link to="/company"><span>{{ t('textLabel.company', 2) }}</span></router-link></li>
        <li class="breadcrumb-item">
          <router-link :to="{ name: 'companydepartment', params: { companyId: companyIdParam } }">
            <span>{{ t('textLabel.department', 2) }}</span>
          </router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link :to="{ name: 'departmentusers', params: { companyId: companyIdParam, departmentId: departmentIdParam } }">
            <span>{{ t('textLabel.user', 2) }}</span>
          </router-link>
        </li>
        <li class="breadcrumb-item active"><span>{{ isEdit ? t('button.edit') : t('button.add') }}</span></li>
      </ol>
      <div class="card mb-3 bg-gradient-dark">
        <div class="card-body ms-0 ps-0 me-0 pe-0 mt-0 pt-0 pb-0">
          <Form :validation-schema="userScheme" id="idform" v-slot="{ meta }" class="text-center py-4" >
            <h4 class="text-start ms-2">User Edit</h4>
            <div class="input-group mb-2">
              <span class="d-flex w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.company') }}</span>
              <select v-model="companyId" v-bind="companyIdAttrs" class="form-control d-flex ms-0 ps-2 me-2 pe-4" type="text">
                <option v-for="company in companyData" :value="company.companyId">{{ company.companyName }}</option>
              </select>
            </div>
            <div class="input-group mb-2">
              <span class="d-flex w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.department') }}</span>
              <select v-model="departmentId" v-bind="departmentIdAttrs" class="form-control d-flex ms-0 ps-2 me-2 pe-4" type="text">
                <option v-for="department in departmentData" :value="department.departmentId">{{ department.departmentName }}</option>
              </select>
            </div>
            <div class="input-group mb-2">
              <span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.user') }}</span>
              <Field as="input" type="text" name="userName" v-model="userName" v-bind="userNameAttrs"  class="form-control d-flex ms-0 ps-2 me-2 pe-4" ></Field>
              <ErrorMessage name="userName" class="text-start text-danger d-flex ms-0 ps-2 me-2 pe-4" />
            </div>
            <div class="input-group mb-2">
              <span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.email') }}</span>
              <Field as="input" type="text" name="userEmail" v-model="userEmail" v-bind="userEmailAttrs"  class="form-control d-flex ms-0 ps-2 me-2 pe-4" ></Field>
              <ErrorMessage name="userEmail" class="text-start text-danger d-flex ms-0 ps-2 me-2 pe-4" />
            </div>
            <div class="input-group mb-2">
              <span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.phone') }}</span>
              <Field as="input" type="tel" name="userPhone" v-model="userPhone" v-bind="userPhoneAttrs"  class="form-control d-flex ms-0 ps-2 me-2 pe-4" ></Field>
              <ErrorMessage name="userPhone" class="text-start text-danger d-flex ms-0 ps-2 me-2 pe-4" />
            </div>
            <div class="text-start">
              <div class="text-start d-flex"><span class="d-flex w-25 ms-2 ps-3 me-2 mb-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.status') }}</span>
                <div class="form-check form-check-inline text-start">
                  <Field  type="radio" name="userStatus" v-model="userStatus" v-bind="userStatusAttrs" value="ENABLED" class="form-check-input" ></Field>
                  <label class="form-check-label" for="formCheck-4">{{ t('button.enable') }}</label>
                </div>
                <div class="form-check form-check-inline text-start">
                  <Field  type="radio" name="userStatus" v-model="userStatus" v-bind="userStatusAttrs" value="DISABLED" class="form-check-input" ></Field>
                  <label class="form-check-label" for="formCheck-4">{{ t('button.disable') }}</label>
                </div>
              </div>
              <div class="text-start d-flex"><span class="d-flex w-25 ms-2 ps-3 me-2 mb-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.status') }}</span>
                <div class="form-check form-check-inline text-start">
                  <Field  type="radio" name="userIsVerified" v-model="userIsVerified" v-bind="userIsVerifiedAttrs" :value="true" class="form-check-input" ></Field>
                  <label class="form-check-label" for="formCheck-4">{{ t('textLabel.true').toUpperCase() }}</label>
                </div>
                <div class="form-check form-check-inline text-start">
                  <Field  type="radio" name="userIsVerified" v-model="userIsVerified" v-bind="userIsVerifiedAttrs" :value="false" class="form-check-input" ></Field>
                  <label class="form-check-label" for="formCheck-4">{{ t('textLabel.false').toUpperCase() }}</label>
                </div>
              </div>
              <div class="input-group mb-2">
                <span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.note') }}</span>
                <Field as="textarea" name="userNote" class="form-control" aria-label="With textarea" v-model="userNote" v-bind="userNoteAttrs"></Field>
                <ErrorMessage name="userNote" class="text-start text-danger" />
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