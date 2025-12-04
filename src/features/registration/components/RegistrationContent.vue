<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate';
import { useLoginSchema } from '../hooks/schemas/register.schema.ts';
import {computed} from "vue";
import {useI18n} from "vue-i18n";
import { useRegisterApi } from "../api/useRegisterApi"

const { t } = useI18n();
const registerSchema = computed(() => useLoginSchema(t));
const { register, loading, error } = useRegisterApi();

const onSubmit = async (values) => {
  try {
    const res = await register(values);
    console.log('Login success:', res);
  } catch (err) {
    console.error(err);
  }
};

</script>

<template>
  <div class="row">
    <div class="col col-lg-10 mx-auto">
      <div class="card bg-gradient-dark">
        <div class="card-body">
          <div class="p-lg-4 py-3">
            <div class="row gy-4 gy-md-0 mx-auto">
              <div class="col-12 col-md-6 col-lg-5"><img class="rounded img-fluid aspect-ratio-1x1 object-fit-cover shadow w-100" width="1024" height="1024" src="/src/assets/img/notepad.jpeg"></div>
                <Form class="col d-flex align-items-md-center" :validation-schema="registerSchema" v-slot="{ meta }" @submit.prevent="onSubmit">
                  <div class="text-center text-sm-center text-md-center text-lg-start text-xl-start text-xxl-start w-100 ms-0 ps-1 me-0 pe-1">
                    <h5 class="text-uppercase fw-bold heading">Register</h5>
                    <div class="w-100 ps-0 me-0 pe-0 mt-0 pt-0 mb-0 pb-2 form-control" style="background: rgba(255,255,255,0);">
                      <Field class="border d-block w-100 me-0 pe-4 mt-2 mb-0 pb-0" type="text" :placeholder="$t('textField.company')" name="company" ></Field>
                      <ErrorMessage class="text-start text-danger d-block w-100 me-0 pe-0 mt-0 mb-0 pb-0" name="company" />
                    </div>
                    <div class="w-100 ps-0 me-0 pe-0 mt-0 pt-0 mb-0 pb-2 form-control" style="background: rgba(255,255,255,0);">
                      <Field class="border d-block w-100 me-0 pe-4 mt-2 mb-0 pb-0" type="email" :placeholder="$t('textField.email')"  name="email" inputmode="email"></Field>
                      <ErrorMessage class="text-start text-danger d-block w-100 me-0 pe-0 mt-0 mb-0 pb-0" name="email" />
                    </div>
                    <div class="w-100 ps-0 me-0 pe-0 mt-0 pt-0 mb-0 pb-2 form-control" style="background: rgba(255,255,255,0);">
                      <Field class="border d-block w-100 me-0 pe-4 mt-2 mb-0 pb-0" type="text" :placeholder="$t('textField.username')" name="username"></Field>
                      <ErrorMessage class="text-start text-danger d-block w-100 me-0 pe-0 mt-0 mb-0 pb-0" name="username" />
                    </div>
                    <div class="w-100 ps-0 me-0 pe-0 mt-0 pt-0 mb-0 pb-2 form-control" style="background: rgba(255,255,255,0);">
                      <Field class="border d-block w-100 me-0 pe-4 mt-2 mb-0 pb-0" type="password" :placeholder="$t('textField.password')" name="password"></Field>
                      <ErrorMessage class="text-start text-danger d-block w-100 me-0 pe-0 mt-0 mb-0 pb-0" name="password" />
                    </div>
                    <div class="w-100 ps-0 me-0 pe-0 mt-0 pt-0 mb-0 pb-4 form-control" style="background: rgba(255,255,255,0);">
                      <Field class="border d-block w-100 me-0 pe-4 mt-2 mb-0 pb-0" type="password" :placeholder="$t('textField.passwordConfirmation')" name="passwordConfirmation"></Field>
                      <ErrorMessage class="text-start text-danger d-block w-100 me-0 pe-0 mt-0 mb-0 pb-0" name="passwordConfirmation" />
                    </div>
                    <button class="btn btn-success shadow ms-0 ps-6 me-0 pe-6 w-100 d-block " type="button" :disabled="!meta.valid" >
                      {{ loading ? t('button.register') : t('button.register') }}
                    </button>
                    <div></div>
                  </div>

                  <div v-if="error" style="color:red">{{ error }}</div>
                </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>