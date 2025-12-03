<script setup lang="ts">
import { useField, useForm } from "vee-validate"
import { defineForm, field } from "vue-yup-form";
import * as yup from "yup";
import {onMounted, reactive} from 'vue'
/*import { useApi } from 'src/composables/useApi.ts'*/

/*const name = ref('');
const api = useApi();*/

onMounted(() => {
  console.log("Component mounted")
});

const orgRegister = reactive({ organization: "",  email: "",  username: "",  password: "" })

// Define the validation schema
const schema = yup.object({
        organization: yup.string().required("Company is required"),
        email: yup.string().email("Invalid email").required("Email is required"),
        username: yup.string().required("Name is required"),
        password : yup
          .string()
          .required("Password is required")
          .min(8, "Password must be at least 8 characters")
          .matches(/[A-Z]/, "Password must have at least one uppercase letter")
          .matches(/[0-9]/, "Password must have at least one number")
          .matches(/[^A-Za-z0-9]/, "Password must have at least one special character"),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password")], "Passwords must match")
})

// Setup form
const { handleSubmit, values } = useForm({
  validationSchema: schema,
  initialValues: { user: { name: "", email: "" },  }
})

// Submit handler
const onSubmit = handleSubmit(values => {
  console.log("Form values:", values)
})

</script>

<template>
  <div class="row">
    <div class="col col-lg-10 mx-auto">
      <div class="card bg-gradient-dark">
        <div class="card-body">
          <div class="p-lg-4 py-3">
            <div class="row gy-4 gy-md-0 mx-auto">
              <div class="col-12 col-md-6 col-lg-5"><img class="rounded img-fluid aspect-ratio-1x1 object-fit-cover shadow w-100" width="1024" height="1024" src="/src/assets/img/notepad.jpeg"></div>
              <div class="col d-flex align-items-md-center">
                <div class="text-center text-sm-center text-md-center text-lg-start text-xl-start text-xxl-start ps-lg-5">
                  <h5 class="text-uppercase fw-bold heading">{{ $t('textLabel.register') }}</h5>
                  <input class="placeholder border me-0 pe-4 mt-2 mb-2 pb-0" type="text" v-model="orgRegister.organization" name="Company Name" :placeholder="$t('textField.company')" required>
                  <input class="placeholder border me-0 pe-4 mt-2 mb-2 pb-0" type="email" v-model="orgRegister.email" name="Email" :placeholder="$t('textField.email')" required inputmode="email">
                  <input class="placeholder border me-0 pe-4 mt-2 mb-2 pb-0" type="text" v-model="orgRegister.username" name="Username" :placeholder="$t('textField.username')" required>
                  <input class="placeholder border me-0 pe-4 mt-2 mb-2 pb-0" type="password" name="Password" :placeholder="$t('textField.password')" required>
                  <input class="placeholder border me-0 pe-4 mt-2 mb-2 pb-0" type="password" v-model="orgRegister.password" name="Password" :placeholder="$t('textField.passwordConfirmation')" required >
                  <button class="btn btn-success shadow ms-0 ps-6 me-0 pe-6" type="button" style="width: 100">{{ $t('button.register') }}</button>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <pre>{{ values }}</pre>
</template>

<style scoped>

</style>