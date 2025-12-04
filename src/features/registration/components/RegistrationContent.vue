<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate';
import { useRegisterSchema } from '../hooks/schemas/register.schema';
import {type RegisterPayload, useRegisterApi} from '../api/useRegisterApi';
import { useRegisterForm} from "../hooks/forms/useRegisterForm";


const registerSchema = useRegisterSchema();
const { register, loading, error } = useRegisterApi();
const { handleSubmit, company, companyAttrs, username, usernameAttrs, email, emailAttrs, password, passwordAttrs } = useRegisterForm();
// onSubmit
// Wrap handleSubmit with your async submit logic
const submit = handleSubmit(async (values: RegisterPayload) => {
  try {
    // simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    await register( values );
    console.log('Success', values);
  } catch (err) {
    console.error(err);
  }
});

</script>

<template>
  <div class="row">
    <div class="col col-lg-10 mx-auto">
      <div class="card bg-gradient-dark">
        <div class="card-body">
          <div class="p-lg-4 py-3">
            <div class="row gy-4 gy-md-0 mx-auto">
              <div class="col-12 col-md-6 col-lg-5">
                <img class="rounded img-fluid aspect-ratio-1x1 object-fit-cover shadow w-100" width="1024" height="1024" src="/src/assets/img/notepad.jpeg">
              </div>
              <Form :validation-schema="registerSchema" class="col d-flex align-items-md-center" v-slot="{ meta }" >
                <form @submit="submit" >
                  <div class="text-center text-sm-center text-md-center text-lg-start text-xl-start text-xxl-start w-100 ms-0 ps-1 me-0 pe-1">
                    <h5 class="text-uppercase fw-bold heading">Register</h5>
                    <div class="w-100 ps-0 me-0 pe-0 mt-0 pt-0 mb-0 pb-2 form-control" style="background: rgba(255,255,255,0);">
                      <Field type="text" :placeholder="$t('textField.company')" name="company" v-model="company" v-bind="companyAttrs" class="border d-block w-100 me-0 pe-4 mt-2 mb-0 pb-0" ></Field>
                      <ErrorMessage name="company" class="text-start text-danger d-block w-100 me-0 pe-0 mt-0 mb-0 pb-0" />
                    </div>
                    <div class="w-100 ps-0 me-0 pe-0 mt-0 pt-0 mb-0 pb-2 form-control" style="background: rgba(255,255,255,0);">
                      <Field type="email" :placeholder="$t('textField.email')"  name="email" v-model="email" v-bind="emailAttrs" inputmode="email" class="border d-block w-100 me-0 pe-4 mt-2 mb-0 pb-0"></Field>
                      <ErrorMessage name="email" class="text-start text-danger d-block w-100 me-0 pe-0 mt-0 mb-0 pb-0" />
                    </div>
                    <div class="w-100 ps-0 me-0 pe-0 mt-0 pt-0 mb-0 pb-2 form-control" style="background: rgba(255,255,255,0);">
                      <Field type="text" :placeholder="$t('textField.username')" name="username" v-model="username" v-bind="usernameAttrs" class="border d-block w-100 me-0 pe-4 mt-2 mb-0 pb-0"></Field>
                      <ErrorMessage name="username" class="text-start text-danger d-block w-100 me-0 pe-0 mt-0 mb-0 pb-0" />
                    </div>
                    <div class="w-100 ps-0 me-0 pe-0 mt-0 pt-0 mb-0 pb-2 form-control" style="background: rgba(255,255,255,0);">
                      <Field type="password" :placeholder="$t('textField.password')" name="password" v-model="password" v-bind="passwordAttrs"  class="border d-block w-100 me-0 pe-4 mt-2 mb-0 pb-0"></Field>
                      <ErrorMessage name="password" class="text-start text-danger d-block w-100 me-0 pe-0 mt-0 mb-0 pb-0" />
                    </div>
                    <div class="w-100 ps-0 me-0 pe-0 mt-0 pt-0 mb-0 pb-4 form-control" style="background: rgba(255,255,255,0);">
                      <Field type="password" :placeholder="$t('textField.passwordConfirmation')" name="passwordConfirmation" class="border d-block w-100 me-0 pe-4 mt-2 mb-0 pb-0"></Field>
                      <ErrorMessage name="passwordConfirmation" class="text-start text-danger d-block w-100 me-0 pe-0 mt-0 mb-0 pb-0" />
                    </div>
                    <button :disabled="!meta.valid" class="btn btn-success shadow ms-0 ps-6 me-0 pe-6 w-100 d-block" >
                      {{ loading ? 'Loading' : $t('button.register') }}
                    </button>
                    <div></div>
                  </div>

                  <div v-if="error" style="color:red">{{ error }}</div>
                </form>
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