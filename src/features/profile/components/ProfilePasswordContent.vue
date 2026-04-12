<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<template>
  <section class="py-4">
    <div class="container">
      <ol class="breadcrumb ms-2">
        <li class="breadcrumb-item"><router-link to="/dashboard"><span>{{ t('textLabel.home') }}</span></router-link></li>
        <li class="breadcrumb-item"><a href="#"><span>{{ t('textLabel.profile') }}</span></a></li>
        <li class="breadcrumb-item active"><span>{{ t('textLabel.changePassword') }}</span></li>
      </ol>

      <div class="card ms-2 me-2 bg-gradient-dark">
        <div class="card-body ms-2 ps-0 me-2 pe-0">
          <div class="p-lg-4 ps-0 pe-0 py-3">
            <div class="row gy-4 gy-md-0 mx-auto">
              <div class="col-12 col-md-6 col-lg-5 col-xxl-4 ms-0 ps-0 pe-1">
                <h5 class="text-start ms-2">Sakawijaya</h5>
                <div class="mb-0 form-floating"><label class="form-label" for="idinputemail">{{ t('textLabel.email') }} :</label><input class="mt-0 pt-4 mb-0 form-control-plaintext" type="email" id="idinputemail" value="sakawijaya@gmail.com"></div>
                <div class="mb-0 form-floating"><label class="form-label" for="idinputemail-1">{{ t('textLabel.phone') }} :</label><input class="mt-0 pt-4 mb-0 form-control-plaintext" type="email" id="idinputemail-1" value="08158224448"></div>
                <ul class="nav nav-pills flex-column ms-2 me-2 mt-2 pt-0">
                  <li class="nav-item mt-2 mb-0"><router-link to="/profileinformation" class="nav-link text-center" style="background: #2f3337;">{{ t('textLabel.personalInformation') }}</router-link></li>
                  <li class="nav-item mt-2"><router-link to="/profilepassword" class="nav-link text-center active">{{ t('textLabel.changePassword') }}</router-link></li>
                  <li class="nav-item mt-2"><router-link to="/profile2fa" class="nav-link text-center" style="background: #2f3337;">{{ t('textLabel.twoFactorAuthentication') }}</router-link></li>
                </ul>
              </div>
              <div class="col">
                <div class="card mb-3 bg-gradient-dark">
                  <div class="card-body ms-0 ps-0 me-0 pe-0 mt-0 pt-0 pb-0">
                    <div class="text-center py-4" id="idform">
                      <h4 class="text-start ms-2 mb-0">{{ t('textLabel.changePassword') }}</h4><small class="text-start d-block ms-2 mb-2" style="color: var(--bs-secondary);">{{ t('textLabel.updatePassword') }}</small>
                      <div class="input-group mb-2"><span class="d-flex w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.currentPassword') }}</span><input class="form-control" type="password"></div>
                      <div class="input-group mb-2"><span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.newPassword') }}</span><input class="form-control" type="password" inputmode="email"></div>
                      <div class="input-group mb-2"><span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.confirmPassword') }}</span><input class="form-control" type="password"></div><button class="btn btn-outline-primary btn-sm ms-2 me-2" type="button">{{ t('button.save') }}</button>
                    </div>
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