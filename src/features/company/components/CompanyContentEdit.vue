<script setup lang="ts">

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
          <div class="text-center py-4" id="idform">
            <h4 class="text-start ms-2">Company Edit</h4>
            <div class="input-group mb-2"><span class="d-flex w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ $t('textLabel.name') }}</span><input class="form-control d-flex ms-0 ps-2 me-2 pe-4" type="text"></div>
            <div class="input-group mb-2"><span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ $t('textLabel.email') }}</span><input class="form-control me-2 pe-2" type="email" inputmode="email"></div>
            <div class="input-group mb-2"><span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ $t('textLabel.phone') }}</span><input class="form-control me-2 pe-2" type="tel"></div>
            <div class="input-group mb-2"><span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ $t('textLabel.website') }}</span><input class="form-control me-2 pe-2" type="url"></div>
            <div class="input-group mb-2"><span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ $t('textLabel.website') }}</span><input class="form-control me-2 pe-2" type="url"></div>
            <div class="input-group mb-2"><span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ $t('textLabel.tipe') }}</span><input class="form-control me-2 pe-2" type="text"></div>
            <div class="input-group mb-2"><span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">Industry</span><input class="form-control me-2 pe-2" type="text"></div>
            <div class="input-group mb-2"><span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">Tax ID</span><input class="form-control me-2 pe-2" type="text"></div>
            <div class="input-group mb-2"><span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">Registration Number</span><input class="form-control me-2 pe-2" type="text"></div>
            <div class="text-start">
              <div class="input-group mb-2"></div>
              <div class="text-start d-flex"><span class="d-flex w-25 ms-2 ps-3 me-2 mb-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">Status</span>
                <div class="form-check form-check-inline text-start"><input class="form-check-input" type="radio" id="formCheck-4" name="radioButtonOAuth"><label class="form-check-label" for="formCheck-4">Enable</label></div>
                <div class="form-check form-check-inline text-start"><input class="form-check-input" type="radio" id="formCheck-5" name="radioButtonOAuth"><label class="form-check-label" for="formCheck-5">Disable</label></div>
              </div>
              <div class="input-group mb-2">
                <span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">Description</span>
                <textarea class="form-control" aria-label="With textarea"></textarea>
              </div>
              <button class="btn btn-outline-primary ms-2 me-2" type="button">Search</button>
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