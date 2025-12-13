<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate';
import {useApi} from "~/composables/useApi.ts";

const { data, loading, post } = useApi();

data.value = { companyId: 0, companyName: "None", companyAddress: "None", companyPhone: "None", companyEmail: "None", companyWebsite: "None", companyDescription: "None", companyLogoUrl:"None",  companyTaxId:"None", companyRegistrationId:"None", companyStatus:"None", companyIndustry:"None", companyType:"None", companyCreatedAt:"None", companyUpdatedAt:"None" }

const submitForm = async () => {
  post("/user/company/update", data.value)
}

</script>

<template>
  <section class="pt-2 pb-2">

    <div class="container">
      <ol class="breadcrumb ms-4 me-4">
        <li class="breadcrumb-item"><router-link to="/dashboard"><span>{{ $t('textLabel.home') }}</span></router-link></li>
        <li class="breadcrumb-item"><router-link to="/company"><span>{{ $t('textLabel.company', 2) }}</span></router-link></li>
        <li class="breadcrumb-item active"><span>{{ $t('button.edit') }}</span></li>
      </ol>
      <div class="card mb-3 bg-gradient-dark">
        <div class="card-body ms-0 ps-0 me-0 pe-0 mt-0 pt-0 pb-0">
          <Form class="text-center py-4" id="idform">
            <h4 class="text-start ms-2">{{ $t('textLabel.companyEdit') }}</h4>
            <input type="hidden" v-model="data.value.companyId">
            <div class="input-group mb-2"><span class="d-flex w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ $t('textLabel.name') }}</span><input class="form-control d-flex ms-0 ps-2 me-2 pe-4" v-model="data.value.companyName" type="text"></div>
            <div class="input-group mb-2"><span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ $t('textLabel.email') }}</span><input class="form-control me-2 pe-2" type="email" v-model="data.value.companyEmail" inputmode="email"></div>
            <div class="input-group mb-2"><span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ $t('textLabel.phone') }}</span><input class="form-control me-2 pe-2" v-model="data.value.companyPhone" type="tel"></div>
            <div class="input-group mb-2"><span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ $t('textLabel.website') }}</span><input class="form-control me-2 pe-2" v-model="data.value.companyWebsite" type="url"></div>
            <div class="input-group mb-2"><span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ $t('textLabel.logo') }} URL</span><input class="form-control me-2 pe-2" v-model="data.value.companyLogoUrl" type="url"></div>
            <div class="input-group mb-2"><span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ $t('textLabel.type') }}</span><input class="form-control me-2 pe-2" v-model="data.value.companyType" type="text"></div>
            <div class="input-group mb-2"><span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ $t('textLabel.industry') }}</span><input class="form-control me-2 pe-2" v-model="data.value.companyIndustry" type="text"></div>
            <div class="input-group mb-2"><span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ $t('textLabel.taxId') }}</span><input class="form-control me-2 pe-2" v-model="data.value.companyTaxId" type="text"></div>
            <div class="input-group mb-2"><span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ $t('textLabel.registrationNumber') }}</span><input class="form-control me-2 pe-2" v-model="data.value.companyRegistrationId" type="text"></div>
            <div class="text-start">
              <div class="input-group mb-2"></div>
              <div class="text-start d-flex"><span class="d-flex w-25 ms-2 ps-3 me-2 mb-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">Status</span>
                <div class="form-check form-check-inline">
                  <input
                      class="form-check-input"
                      type="radio"
                      id="statusEnabled"
                      value="enabled"
                      v-model="data.value.companyStatus"
                  />
                  <label class="form-check-label" for="statusEnabled">
                    {{ $t('button.enable') }}
                  </label>
                </div>

                <div class="form-check form-check-inline">
                  <input
                      class="form-check-input"
                      type="radio"
                      id="statusDisabled"
                      value="disabled"
                      v-model="data.value.companyStatus"
                  />
                  <label class="form-check-label" for="statusDisabled">
                    {{ $t('button.disable') }}
                  </label>
                </div>
              </div>
              <div class="input-group mb-2">
                <span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ $t('textLabel.description') }}</span>
                <textarea class="form-control" aria-label="With textarea" v-model="data.value.companyDescription"></textarea>
              </div>
              <button class="btn btn-outline-primary ms-2 me-2" :disabled="loading" @click="submitForm" type="button">{{ loading ? $t('button.saving') : $t('button.save') }}</button>
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