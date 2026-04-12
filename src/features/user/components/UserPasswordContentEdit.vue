<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<template>
  <section class="pt-2 pb-2">
    <ol class="breadcrumb ms-4">
      <li class="breadcrumb-item"><router-link to="/dashboard"><span>{{ t('textLabel.home') }}</span></router-link></li>
      <li class="breadcrumb-item"><router-link to="/user"><span>{{ t('textLabel.user', 2) }}</span></router-link></li>
      <li class="breadcrumb-item active"><span>{{ t('button.password') }}</span></li>
    </ol>
    <div class="container">
      <div class="card mb-3 bg-gradient-dark">
        <div class="card-body ms-0 ps-0 me-0 pe-0 mt-0 pt-0 pb-0">
          <div class="text-center py-4" id="idform">
            <h4 class="text-start ms-2">{{ t('textLabel.userPassword') }}</h4>
            <div class="input-group mb-2"><span class="d-flex w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.oldPassword') }}</span><input class="form-control" type="password"></div>
            <div class="input-group mb-2"><span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.newPassword') }}</span><input class="form-control" type="password" inputmode="email"></div>
            <div class="input-group mb-2"><span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.confirmPassword') }}</span><input class="form-control" type="password"></div>
            <div class="text-start ms-3"><small class="text-center" style="color: var(--bs-secondary);">{{ t('textLabel.adminPasswordNote') }}</small></div>
            <div class="text-start">
              <div class="input-group mb-2"></div><button class="btn btn-outline-primary ms-2 me-2" type="submit">{{ t('button.save') }}</button>
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