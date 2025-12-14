<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <div class="row">
    <div class="col col-lg-10 col-xxl-12 mx-auto">
      <div class="card bg-gradient-dark">
        <div class="card-body">
          <div class="p-lg-4 py-3">
            <div class="text-center mb-5 py-3 py-lg-1">
              <h3 class="text-uppercase fs-4 fw-bold mb-3 heading">{{ t('app.howToUse.title') }}</h3>
              <p class="text-muted">{{ t('app.howToUse.description') }}</p>
              <div class="col-md-12"><iframe allowfullscreen width="560" height="315"></iframe></div>
            </div>
            <div class="row gy-4 row-cols-1 row-cols-sm-2 row-cols-md-3">
              <div>
                <div class="card border-0 project-item"><img class="img-fluid aspect-ratio-1x1 object-fit-cover card-img w-100 d-block" width="1024" height="1024" src="/src/assets/img/logos/How%20to%20Register%20Logo.svg">
                  <div class="card-img-overlay">
                    <h4 class="fs-6 fw-bold mb-1"><a href="#">{{ t('app.howToUse.registration.title') }}</a></h4>
                    <p class="mb-0">{{ t('app.howToUse.registration.description') }}</p>
                  </div>
                </div>
              </div>
              <div>
                <div class="card border-0 project-item"><img class="img-fluid aspect-ratio-1x1 object-fit-cover card-img w-100 d-block" width="3200" height="3200" src="/src/assets/img/logos/How%20to%20Register%20Logo.svg">
                  <div class="card-img-overlay">
                    <h4 class="fs-6 fw-bold mb-1"><a href="#">{{ t('app.howToUse.email.title') }}</a></h4>
                    <p class="mb-0">{{ t('app.howToUse.email.description') }}</p>
                  </div>
                </div>
              </div>
              <div>
                <div class="card border-0 project-item"><img class="img-fluid aspect-ratio-1x1 object-fit-cover card-img w-100 d-block" width="3200" height="3200" src="/src/assets/img/logos/How%20to%20Register%20Logo.svg">
                  <div class="card-img-overlay">
                    <h4 class="fs-6 fw-bold mb-1"><a href="#">{{ t('app.howToUse.oauth.title') }}</a></h4>
                    <p class="mb-0">{{ t('app.howToUse.oauth.description') }}</p>
                  </div>
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