<script setup lang="ts">

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
                  <h5 class="text-uppercase fw-bold heading">Register</h5>
                  <input class="placeholder border me-0 pe-4 mt-2 mb-2 pb-0" type="text" name="Company Name" :placeholder="$t('textField.company')" required>
                  <input class="placeholder border me-0 pe-4 mt-2 mb-2 pb-0" type="email" name="Email" :placeholder="$t('textField.email')" required inputmode="email">
                  <input class="placeholder border me-0 pe-4 mt-2 mb-2 pb-0" type="text" name="Username" :placeholder="$t('textField.username')" required>
                  <input class="placeholder border me-0 pe-4 mt-2 mb-2 pb-0" type="password" name="Password" :placeholder="$t('textField.password')" required>
                  <input class="placeholder border me-0 pe-4 mt-2 mb-2 pb-0" type="password" name="Password" :placeholder="$t('textField.passwordConfirmation')" required >
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
</template>

<style scoped>

</style>