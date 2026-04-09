<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '~/stores/auth'
import {useUserSimpleSchema} from "~/features/user/hooks/schemas/user.schemas.ts";
import {mapUserFromApi, useUserForm} from "~/features/user/hooks/forms/useUserForm";
import type { UserPayload } from "~/features/user/interfaces/user.interfaces.ts";
import {ErrorMessage, Field, Form} from "vee-validate";
import {useApi} from "~/composables/useApi.ts";
import {onMounted} from "vue";

const auth = useAuthStore()
const { data, loading, get, post } = useApi();
const { t } = useI18n();
const userSimpleScheme = useUserSimpleSchema();
const { handleSubmit, setValues, userName, userNameAttrs, userEmail, userEmailAttrs, userPhone, userPhoneAttrs, userStatus, userCreatedAt, userUpdatedAt, userStatusAttrs, userIsVerified, userIsVerifiedAttrs, userNote, userNoteAttrs } = useUserForm();


onMounted(async () => {
  await get("/v0/user/detail/" + auth.user?.id);

  setValues(mapUserFromApi(data.value));

});

const submitForm = handleSubmit( async (values: UserPayload) => {

      console.log("Values UserPayload : ", values);

      post("/v0/user/update/companyId/" + auth.user?.company.companyId + "/userId/" + auth.user?.id , values)
  }
)

</script>

<template>
  <section class="py-4">
    <div class="container">
      <ol class="breadcrumb ms-2 me-2">
        <li class="breadcrumb-item"><router-link to="/dashboard"><span>{{ t('textLabel.home') }}</span></router-link></li>
        <li class="breadcrumb-item active"><span>{{ t('textLabel.profile') }}</span></li>
      </ol>

      <div class="card ms-2 me-2 bg-gradient-dark">
        <div class="card-body ms-2 ps-0 me-2 pe-0">
          <div class="p-lg-4 ps-0 pe-0 py-3">
            <div class="row gy-4 gy-md-0 mx-auto">
              <div class="col-12 col-md-6 col-lg-5 col-xxl-4 ms-0 ps-0 pe-1">
                <h5 class="text-start ms-2">{{ userName }}</h5>
                <div class="mb-0 form-floating">
                  <label class="form-label" for="idinputemail">{{ t('textLabel.email') }} :</label>
                  <input class="mt-0 pt-4 mb-0 form-control-plaintext" type="email" v-model="userEmail">
                </div>
                <div class="mb-0 form-floating">
                  <label class="form-label" for="idinputemail-1">{{ t('textLabel.phone') }} :</label>
                  <input class="mt-0 pt-4 mb-0 form-control-plaintext" type="email" v-model="userPhone">
                </div>
                <ul class="nav nav-pills flex-column ms-2 me-2 mt-2 pt-0">
                  <li class="nav-item mt-2 mb-0 active"><router-link to="/profileinformation" class="nav-link text-center active">{{ t('textLabel.personalInformation') }}</router-link> </li>
                  <!--
                  <li class="nav-item mt-2 active"><router-link to="/profilepassword" class="nav-link text-center" style="background: #2f3337;">Change Password</router-link></li>
                  <li class="nav-item mt-2"><router-link to="/profile2fa" class="nav-link text-center" style="background: #2f3337;">2FA Authentification</router-link></li>
                  -->
                </ul>
              </div>
              <div class="col">
                <div class="card mb-3 bg-gradient-dark">
                  <div class="card-body ms-0 ps-0 me-0 pe-0 mt-0 pt-0 pb-0">
                    <Form :validation-schema="userSimpleScheme" id="idform" v-slot="{ meta }" class="text-center py-4" >
                      <div class="text-center py-4" id="idform">
                        <h4 class="text-start ms-2">{{ t('textLabel.personalInformation') }}</h4>
                        <div class="input-group mb-2">
                          <span class="d-flex w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.name') }}</span>
                          <input class="form-control d-flex ms-0 ps-2 me-2 pe-4" type="text" v-model="userName" v-bind="userNameAttrs" readonly >
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
                        <div class="input-group mb-2">
                          <span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.status') }}</span>
                          <input class="form-control me-2 pe-2" type="text" v-model="userStatus" v-bind="userStatusAttrs" readonly >
                        </div>
                        <div class="input-group mb-2">
                          <span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.verified') }}</span>
                          <input class="form-control me-2 pe-2" type="number" v-model="userIsVerified" v-bind="userIsVerifiedAttrs" readonly >
                        </div>
                        <div class="input-group mb-2">
                          <span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.dateCreated') }}</span>
                          <input class="form-control me-2 pe-2" type="text" v-model="userCreatedAt" readonly >
                        </div>
                        <div class="input-group mb-2">
                          <span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.dateUpdated') }}</span>
                          <input class="form-control me-2 pe-2" type="text" v-model="userUpdatedAt" readonly >
                        </div>
                        <div class="input-group mb-2">
                            <span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.note') }}</span>
                            <Field as="textarea"  name="userNote" v-model="userNote" v-bind="userNoteAttrs" class="form-control d-flex ms-0 ps-2 me-2 pe-4" rows="4" placeholder="Enter your notes here..." ></Field>
                            <ErrorMessage name="userNote" class="text-start text-danger d-flex ms-0 ps-2 me-2 pe-4" />

                        </div>
                        <button :disabled="!meta.valid || loading"  class="btn btn-outline-primary ms-2 me-2" @click="submitForm" type="button">{{ loading ? t('button.saving') : t('button.save') }}</button>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  </section>
</template>

<style scoped>

</style>