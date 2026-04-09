<script setup lang="ts">
import {onMounted} from "vue";
import { useI18n } from 'vue-i18n';
import { useMultiStepForm } from '../hooks/useMultistepForm';
import { useUserRegisterForm } from "../hooks/forms/useUserRegisterForm"
import type { UserRegisterPayload } from "~/features/user/interfaces/user.interfaces.ts";
import {useApi} from "~/composables/useApi.ts";

const {  loading, post } = useApi();
const { next, previous, init } = useMultiStepForm();
const { t } = useI18n();
const {
  handleSubmit,
  meta,
  userEmail, userEmailAttrs,
  userName, userNameAttrs,
  userPassword, userPasswordAttrs,
  confirmPassword, confirmPasswordAttrs,
  userPhone, userPhoneAttrs,
  membershipType, membershipTypeAttrs,
  companyName, companyNameAttrs,
  companyEmail, companyEmailAttrs,
  companyWebsite, companyWebsiteAttrs,
  companyAddress, companyAddressAttrs,
  companyPhone, companyPhoneAttrs,
  companyLogoUrl, companyLogoUrlAttrs,
  companyTaxId, companyTaxIdAttrs,
  companyRegistrationId, companyRegistrationIdAttrs,
  companyIndustry, companyIndustryAttrs,
  companyType, companyTypeAttrs,
  companyDescription, companyDescriptionAttrs,
  departmentName, departmentNameAttrs,
} = useUserRegisterForm()



onMounted(() => {
  init();
});

const submitForm = handleSubmit( async (values: UserRegisterPayload) => {
        console.log("RUNNING ADD", values);

        post("/v0/user/registration" , values)
    }
)


</script>

<template>
  <div class="row">
    <div class="col col-lg-10 mx-auto">
      <div class="card bg-gradient-dark">
        <div class="card-body">
          <div class="p-lg-4 py-3">
            <div class="row gy-4 gy-md-0 mx-auto">
              <div class="col-12 col-md-6 col-lg-5 align-self-center">
                <img class="rounded img-fluid aspect-ratio-1x1 object-fit-cover shadow w-100" alt="" width="1024" height="1024" src="/src/assets/img/notepad.jpeg">
              </div>
              <div class="col d-flex align-items-md-center">
                <div id="idform" class="card-body bg-gradient-body">

                <form id="msform" @submit.prevent="submitForm">
                  <ul class="list-inline" id="progressMSForm">
                    <li class="list-inline-item active" id="personal">{{ t('textLabel.user', 1) }}</li>
                    <li class="list-inline-item" id="account">{{ t('textField.company') }}</li>
                    <li class="list-inline-item" id="confirm">{{ t('textField.account') }}</li>
                  </ul>
                  <fieldset class="form-card">
                    <h4 class="ps-2 pe-2 pt-2" style="text-align: left;">{{ t('textLabel.userProfile') }}</h4>
                    <legend class="text-start ps-2 pe-2" style="font-size: 12px;">
                      *this account will be Super Admin from organization
                    </legend>
                    <div class="text-center mt-2">
                      <div class="d-inline-flex ps-2 pe-2 input-group-sm input-group">
                        <span>{{ t('textField.username') }}</span>
                        <input class="form-control" type="text" v-model="userName" v-bind="userNameAttrs" />
                        <span class="text-danger small">{{ userNameAttrs.errorMessage }}</span>
                      </div>
                      <div class="d-inline-flex ps-2 pe-2 input-group-sm input-group">
                        <span>{{ t('textField.password') }}</span>
                        <input class="form-control" type="password" v-model="userPassword" v-bind="userPasswordAttrs" />
                        <span class="text-danger small">{{ userPasswordAttrs.errorMessage }}</span>
                      </div>
                      <div class="d-inline-flex ps-2 pe-2 input-group-sm input-group">
                        <span>{{ t('textField.passwordConfirmation') }}</span>
                        <input class="form-control" type="password" v-model="confirmPassword" v-bind="confirmPasswordAttrs" />
                        <span class="text-danger small">{{ confirmPasswordAttrs.errorMessage }}</span>
                      </div>
                      <div class="d-inline-flex ps-2 pe-2 input-group-sm input-group">
                        <span>{{ t('textField.email') }}</span>
                        <input class="form-control" type="email" v-model="userEmail" v-bind="userEmailAttrs" />
                        <span class="text-danger small">{{ userEmailAttrs.errorMessage }}</span>
                      </div>
                      <div class="d-inline-flex ps-2 pe-2 input-group-sm input-group">
                        <span>{{ t('textField.phone') }}</span>
                        <input class="form-control" type="tel" v-model="userPhone" v-bind="userPhoneAttrs" />
                      </div>
                      <div class="d-inline-flex ps-2 pe-2 input-group-sm input-group">
                        <span>Membership Type</span>
                        <select class="form-select" v-model="membershipType" v-bind="membershipTypeAttrs">
                          <option value="FREE">FREE</option>
                          <option value="BASIC">BASIC</option>
                          <option value="PREMIUM">PREMIUM</option>
                          <option value="ENTERPRISE">ENTERPRISE</option>
                        </select>
                        <span class="text-danger small">{{ membershipTypeAttrs.errorMessage }}</span>
                      </div>
                    </div>
                    <button class="btn btn-primary next" id="next" @click="next" type="button">{{ t('button.next') }}</button>
                  </fieldset>
                  <fieldset class="form-card">
                    <h4 class="ps-2 pe-2 pt-2" style="text-align: left;">{{ t('textLabel.companyProfile') }}</h4>
                    <legend class="text-start ps-2 pe-2" style="font-size: 12px;">
                      <span>*Company at least have 1 department name</span>
                    </legend>
                    <div class="text-center mt-2">

                      <div class="d-inline-flex ps-2 pe-2 input-group-sm input-group">
                        <span>{{ t('textField.company') }}</span>
                        <input class="form-control" type="text" v-model="companyName" v-bind="companyNameAttrs" />
                        <span class="text-danger small">{{ companyNameAttrs.errorMessage }}</span>
                      </div>
                      <div class="d-inline-flex ps-2 pe-2 input-group-sm input-group">
                        <span>{{ t('textField.email') }}</span>
                        <input class="form-control" type="email" v-model="companyEmail" v-bind="companyEmailAttrs" />
                      </div>
                      <div class="d-inline-flex ps-2 pe-2 input-group-sm input-group">
                        <span>{{ t('textField.website') }}</span>
                        <input class="form-control" type="text" v-model="companyWebsite" v-bind="companyWebsiteAttrs" />
                        <span class="text-danger small">{{ companyWebsiteAttrs.errorMessage }}</span>
                      </div>

                      <div class="d-inline-flex ps-2 pe-2 input-group-sm input-group">
                        <span>{{ t('textField.phone') }}</span>
                        <input class="form-control" type="tel" v-model="companyPhone" v-bind="companyPhoneAttrs" />
                      </div>
                      <div class="d-inline-flex ps-2 pe-2 input-group-sm input-group">
                        <span>{{ t('textField.department') }}</span>
                        <input class="form-control" type="text" v-model="departmentName" v-bind="departmentNameAttrs" />
                        <span class="text-danger small">{{ departmentNameAttrs.errorMessage }}</span>
                      </div>
                      <div class="d-inline-flex ps-2 pe-2 input-group-sm input-group">
                        <span>{{ t('textField.address') }}</span>
                        <input class="form-control" type="text" v-model="companyAddress" v-bind="companyAddressAttrs" />
                      </div>
                      <div class="d-inline-flex ps-2 pe-2 input-group-sm input-group">
                        <span>Logo URL</span>
                        <input class="form-control" type="text" v-model="companyLogoUrl" v-bind="companyLogoUrlAttrs" />
                        <span class="text-danger small">{{ companyLogoUrlAttrs.errorMessage }}</span>
                      </div>
                      <div class="d-inline-flex ps-2 pe-2 input-group-sm input-group">
                        <span>Company Registration</span>
                        <input class="form-control" type="text" v-model="companyRegistrationId" v-bind="companyRegistrationIdAttrs" />
                      </div>
                      <div class="d-inline-flex ps-2 pe-2 input-group-sm input-group">
                        <span>Company Tax ID</span>
                        <input class="form-control" type="text" v-model="companyTaxId" v-bind="companyTaxIdAttrs" />
                      </div>
                      <div class="d-inline-flex ps-2 pe-2 input-group-sm input-group">
                        <span>Industry</span>
                        <input class="form-control" type="text" v-model="companyIndustry" v-bind="companyIndustryAttrs" />
                      </div>
                      <div class="d-inline-flex ps-2 pe-2 input-group-sm input-group">
                        <span>Company Type</span>
                        <input class="form-control" type="text" v-model="companyType" v-bind="companyTypeAttrs" />
                      </div>
                      <div class="d-inline-flex ps-2 pe-2 input-group-sm input-group">
                        <span>Description</span>
                        <textarea class="form-control" v-model="companyDescription" v-bind="companyDescriptionAttrs"></textarea>
                      </div>
                    </div>
                    <button class="btn btn-secondary previous" id="previous" @click="previous" type="button">{{ t('button.back') }}</button>
                    <button class="btn btn-primary next" id="next-1" @click="next" type="button">{{ t('button.next') }}</button>
                  </fieldset>
                  <fieldset class="form-card">
                    <div class="text-center mt-2">
                      <h4 class="ps-2 pe-2" style="text-align: left;">Confirmation</h4>
                      <legend class="text-start ps-2 pe-2" style="font-size: 12px;">
                        <span>*Please confirmation the data before submit</span>
                      </legend>
                      <div class="border p-1 mt-1">
                        <h6 class="mb-3" style="text-align: left;">User Information</h6>
                        <div class="d-inline-flex ps-2 pe-2 input-group-sm input-group">
                          <span>{{ t('textField.username') }}</span><input class="form-control" type="text" v-model="userName" disabled>
                        </div>
                        <div class="d-inline-flex ps-2 pe-2 input-group-sm input-group">
                          <span>{{ t('textField.email') }}</span><input class="form-control" type="text" v-model="userEmail" disabled>
                        </div>
                        <div class="d-inline-flex ps-2 pe-2 input-group-sm input-group">
                          <span>{{ t('textField.phone') }}</span><input class="form-control" type="text" v-model="userPhone" disabled>
                        </div>
                        <div class="d-inline-flex ps-2 pe-2 input-group-sm input-group">
                          <span>Membership Type</span><input class="form-control" type="text" v-model="membershipType" disabled>
                        </div>
                      </div>
                      <div class="border p-1 mt-1">
                        <h6 class="mb-3" style="text-align: left;">Company Information</h6>
                        <div class="d-inline-flex ps-2 pe-2 input-group-sm input-group">
                          <span>{{ t('textField.company') }}</span><input class="form-control" type="text" v-model="companyName" disabled>
                        </div>
                        <div class="d-inline-flex ps-2 pe-2 input-group-sm input-group">
                          <span>{{ t('textField.email') }}</span><input class="form-control" type="text" v-model="companyEmail" disabled>
                        </div>
                        <div class="d-inline-flex ps-2 pe-2 input-group-sm input-group">
                          <span>{{ t('textField.website') }}</span><input class="form-control" type="text" v-model="companyWebsite" disabled>
                        </div>
                        <div class="d-inline-flex ps-2 pe-2 input-group-sm input-group">
                          <span>{{ t('textField.phone') }}</span><input class="form-control" type="text" v-model="companyPhone" disabled>
                        </div>
                        <div class="d-inline-flex ps-2 pe-2 input-group-sm input-group">
                          <span>{{ t('textField.department') }}</span><input class="form-control" type="text" v-model="departmentName" disabled>
                        </div>
                        <div class="d-inline-flex ps-2 pe-2 input-group-sm input-group">
                          <span>{{ t('textField.address') }}</span><input class="form-control" type="text" v-model="companyAddress" disabled>
                        </div>
                        <div class="d-inline-flex ps-2 pe-2 input-group-sm input-group">
                          <span>Logo URL</span><input class="form-control" type="text" v-model="companyLogoUrl" disabled>
                        </div>
                        <div class="d-inline-flex ps-2 pe-2 input-group-sm input-group">
                          <span>Tax ID</span><input class="form-control" type="text" v-model="companyRegistrationId" disabled>
                        </div>
                        <div class="d-inline-flex ps-2 pe-2 input-group-sm input-group">
                          <span>Industry</span><input class="form-control" type="text" v-model="companyIndustry" disabled>
                        </div>
                        <div class="d-inline-flex ps-2 pe-2 input-group-sm input-group">
                          <span>Company Type</span><input class="form-control" type="text" v-model="companyType" disabled>
                        </div>
                        <div class="d-inline-flex ps-2 pe-2 input-group-sm input-group">
                          <span>Description</span><textarea class="form-control" v-model="companyDescription" disabled></textarea>
                        </div>
                      </div>
                    </div>
                    <button class="btn btn-secondary previous" id="previous"  @click="previous" type="button">{{ t('button.back') }}</button>
                    <button :disabled="!meta.valid || loading"  class="btn btn-outline-primary" type="submit">{{ loading ? t('button.saving') : t('button.save') }}</button>

                  </fieldset>
                </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>