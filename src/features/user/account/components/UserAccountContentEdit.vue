<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import {useApi} from "~/composables/useApi";
import {computed, onMounted} from "vue";
import {mapUserAccountFromApi, useUserAccountForm, type UserAccountPayload} from "~/features/user/account/hooks/forms/useUserAccountForm";
import {useRoute} from "vue-router";
import { useUserAccountSchema } from "~/features/user/account/hooks/schemas/useraccount.schemas";
import {ErrorMessage, Field, Form} from "vee-validate";
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
const { t } = useI18n();
const { data, loading, get, post } = useApi();
const { data: companyData, get: getCompany } = useApi();
const { data: departmentData, get: getDepartment } = useApi();
const { data: rolesData, get: getRoles } = useApi();
const route = useRoute();
const { handleSubmit, setValues, name, nameAttrs, email, emailAttrs, phone, phoneAttrs, note, noteAttrs, isVerified, isVerifiedAttrs, accountStatus, accountStatusAttrs, membershipStatus, membershipStatusAttrs, membershipType, membershipTypeAttrs, roleId, roleIdAttrs, companyId, companyIdAttrs, departmentId, departmentIdAttrs } = useUserAccountForm();

const isEdit = computed(() => !!route.params.userId);
const { userId, companyIdParam, departmentIdParam } = route.params;

onMounted(async () => {
  if (isEdit.value) {

    console.log("URL Get User Account", "/api/v0/user/account/detail/companyId/" + auth.user?.company.companyId + "/userId/" + auth.user?.id + "/valueUserId/" + userId);

    await get("/api/v0/user/account/detail/companyId/" + auth.user?.company.companyId + "/userId/" + auth.user?.id + "/valueUserId/" + userId);

    console.log("Data User Account : ", data.value);

    setValues(mapUserAccountFromApi(data.value));
  }

  await getCompany("/api/v0/user/organization/company/list/companyId/" + auth.user?.company.companyId + "/userId/" + auth.user?.id + "/valueCompanyId/" + companyIdParam);

  await getDepartment('/api/v0/user/organization/department/list/companyId/' + companyIdParam + "/userId/" + auth.user?.id);

  setValues({ department: { departmentId: Number(departmentIdParam) }, company: { companyId: Number(companyIdParam) }  });

  await getRoles('/api/v0/authorization/company/role/list/companyId/' + auth.user?.company.companyId + '/userId/'+ auth.user?.id +'/valueCompanyId/'+ companyIdParam)

});

const submitForm = handleSubmit( async (values: UserAccountPayload) => {

      console.log("UserAccountPayload : ", values);

        if (isEdit.value) {
          post("/api/v0/user/account/update/companyId/" + auth.user?.company.companyId + "/userId/" + auth.user?.id + "/valueUserId/" + userId, values)
        } else {
          post("/api/v0/user/account/add/companyId/" + auth.user?.company.companyId + "/userId/" + auth.user?.id , values)
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
          <Form :validation-schema="useUserAccountSchema" id="idform" v-slot="{ meta }" class="text-center py-4" >
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
              <Field as="input" type="text" name="userName" v-model="name" v-bind="nameAttrs"  class="form-control d-flex ms-0 ps-2 me-2 pe-4" ></Field>
              <ErrorMessage name="name" class="text-start text-danger d-flex ms-0 ps-2 me-2 pe-4" />
            </div>
            <div class="input-group mb-2">
              <span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.email') }}</span>
              <Field as="input" type="text" name="userEmail" v-model="email" v-bind="emailAttrs"  class="form-control d-flex ms-0 ps-2 me-2 pe-4" ></Field>
              <ErrorMessage name="email" class="text-start text-danger d-flex ms-0 ps-2 me-2 pe-4" />
            </div>
            <div class="input-group mb-2">
              <span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.phone') }}</span>
              <Field as="input" type="tel" name="userPhone" v-model="phone" v-bind="phoneAttrs"  class="form-control d-flex ms-0 ps-2 me-2 pe-4" ></Field>
              <ErrorMessage name="phone" class="text-start text-danger d-flex ms-0 ps-2 me-2 pe-4" />
            </div>
            <div class="input-group mb-2">
              <span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.role') }}</span>
              <select v-model="roleId" v-bind="roleIdAttrs" class="form-control d-flex ms-0 ps-2 me-2 pe-4" type="text">
                <option v-for="role in rolesData" :value="role.roleId">{{ role.roleName }}</option>
              </select>
              <ErrorMessage name="userPhone" class="text-start text-danger d-flex ms-0 ps-2 me-2 pe-4" />
            </div>
            <div class="text-start">
              <div class="text-start d-flex"><span class="d-flex w-25 ms-2 ps-3 me-2 mb-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.userVerification') }}</span>
                <div class="form-check form-check-inline text-start">
                  <Field  type="radio" name="isVerified" v-model="isVerified" v-bind="isVerifiedAttrs" :value="true" class="form-check-input" ></Field>
                  <label class="form-check-label" for="formCheck-4">{{ t('textLabel.true') }}</label>
                </div>
                <div class="form-check form-check-inline text-start">
                  <Field  type="radio" name="isVerified" v-model="isVerified" v-bind="isVerifiedAttrs" :value="false" class="form-check-input" ></Field>
                  <label class="form-check-label" for="formCheck-4">{{ t('textLabel.false') }}</label>
                </div>
              </div>
              <div class="text-start d-flex"><span class="d-flex w-25 ms-2 ps-3 me-2 mb-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.accountStatus') }}</span>
                <div class="form-check form-check-inline text-start">
                  <Field  type="radio" name="accountStatus" v-model="accountStatus" v-bind="accountStatusAttrs" value="ACTIVE" class="form-check-input" ></Field>
                  <label class="form-check-label" for="formCheck-4">{{ t('textLabel.active') }}</label>
                </div>
                <div class="form-check form-check-inline text-start">
                  <Field  type="radio" name="accountStatus" v-model="accountStatus" v-bind="accountStatusAttrs" value="INACTIVE" class="form-check-input" ></Field>
                  <label class="form-check-label" for="formCheck-4">{{ t('textLabel.inactive') }}</label>
                </div>
              </div>
              <div class="text-start d-flex"><span class="d-flex w-25 ms-2 ps-3 me-2 mb-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.membershipStatus') }}</span>
                <div class="form-check form-check-inline text-start">
                  <Field  type="radio" name="membershipStatus" v-model="membershipStatus" v-bind="membershipStatusAttrs" value="ACTIVE" class="form-check-input" ></Field>
                  <label class="form-check-label" for="formCheck-4">{{ t('textLabel.active') }}</label>
                </div>
                <div class="form-check form-check-inline text-start">
                  <Field  type="radio" name="membershipStatus" v-model="membershipStatus" v-bind="membershipStatusAttrs" value="INACTIVE" class="form-check-input" ></Field>
                  <label class="form-check-label" for="formCheck-4">{{ t('textLabel.inactive') }}</label>
                </div>
              </div>
              <div class="input-group mb-2">
                <span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.membershipType') }}</span>
                <Field as="input" type="tel" name="membershipType" v-model="membershipType" v-bind="membershipTypeAttrs"  class="form-control d-flex ms-0 ps-2 me-2 pe-4" ></Field>
              </div>
              <div class="input-group mb-2">
                <span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.note') }}</span>
                <Field as="textarea" name="userNote" class="form-control" aria-label="With textarea" v-model="note" v-bind="noteAttrs"></Field>
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