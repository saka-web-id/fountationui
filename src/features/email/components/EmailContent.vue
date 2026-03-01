<script setup lang="ts">

</script>

<template>
  <section class="pt-2 pb-2">

    <div class="container">
      <ol class="breadcrumb ms-4 me-4">
        <li class="breadcrumb-item"><router-link to="/dashboard"><span>Home</span></router-link></li>
        <li class="breadcrumb-item active"><span>Email</span></li>
      </ol>
      <div class="card mb-3 bg-gradient-dark">
        <div class="card-body ms-0 ps-0 me-0 pe-0 mt-0 pt-0 pb-0">
          <div class="text-center py-4" id="idform">
            <h4 class="text-start ms-2">Sending Email</h4>
            <div class="input-group mb-2"><span class="d-flex w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">Name</span><input class="form-control d-flex ms-0 ps-2 me-2 pe-4" type="text"></div>
            <div class="input-group mb-2"><span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">Email</span><input class="form-control me-2 pe-2" type="email" inputmode="email"></div>
            <div class="input-group mb-2"><span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">Max Recipients</span><input class="form-control me-2 pe-2" type="number"></div>
            <div class="text-end">
              <h4 class="text-start ms-2">SMTP Protocols</h4>
              <div class="input-group mb-2"><span class="d-flex w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">SMTP Host</span><input class="form-control d-flex ms-0 ps-2 me-2 pe-2" type="text"></div>
              <div class="input-group mb-2"><span class="d-flex w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">SMTP Port</span><input class="form-control me-2 pe-2" type="number"></div>
              <div class="input-group mb-2"><span class="d-flex w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">SMTP Timeout</span><input class="form-control me-2 pe-2" type="number"></div>
              <div class="text-start d-flex input-group"><span class="d-flex w-25 ms-2 ps-3 me-2 mb-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">Encryption</span>
                <div class="d-inline-flex">
                  <div class="form-check form-check-inline text-start"><input class="form-check-input" type="radio" id="formCheck-1" name="radioButtonEncryption"><label class="form-check-label" for="formCheck-1">SSL</label></div>
                  <div class="form-check form-check-inline text-start"><input class="form-check-input" type="radio" id="formCheck-3" name="radioButtonEncryption"><label class="form-check-label" for="formCheck-3">TLS</label></div>
                  <div class="form-check form-check-inline text-start"><input class="form-check-input" type="radio" id="formCheck-2" name="radioButtonEncryption"><label class="form-check-label" for="formCheck-2">None</label></div>
                </div>
              </div>
              <div class="text-start d-flex"><span class="d-flex w-25 ms-2 ps-3 me-2 mb-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">Method</span>
                <div class="form-check form-check-inline text-start"><input class="form-check-input" type="radio" id="formCheck-4" name="radioButtonOAuth"><label class="form-check-label" for="formCheck-4">Basic</label></div>
                <div class="form-check form-check-inline text-start"><input class="form-check-input" type="radio" id="formCheck-5" name="radioButtonOAuth"><label class="form-check-label" for="formCheck-5">OAuth</label></div>
              </div>
              <div class="input-group mb-2"><span class="d-flex w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">Username</span><input class="form-control d-flex ms-0 ps-2 me-2 pe-2" type="text"></div>
              <div class="input-group mb-2"><span class="d-flex w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">Password</span><input class="form-control me-2 pe-2" type="password"></div>
              <div class="input-group mb-2"><span class="d-flex w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">OAuth Provider</span><select class="form-select ps-2 me-2 pe-5"></select></div><button class="btn btn-outline-primary btn-sm ms-2 me-2" type="button">Search</button>
            </div>
          </div>
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