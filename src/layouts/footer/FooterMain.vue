<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <footer class="bg-body-secondary bg-opacity-25 bg-gradient mt-5 py-5">
    <div class="container d-flex flex-column justify-content-between align-items-center flex-lg-row">
      <div class="text-center text-lg-start mb-5 mb-lg-0"><a class="fs-4 fw-bold link-light" href="/public"><img class="img-fluid me-2" width="40" height="40" src="/src/assets/img/logos/logo.svg"><span><a href="/public"><strong><span style="color: RGBA(247, 248, 249, var(--bs-link-opacity, 1));">{{ t('app.brand.title') }}</span></strong></a></span></a>
        <p class="mt-1 mb-4">{{ t('app.brand.description') }}</p>
      </div>
      <div class="text-center text-lg-end">
        <div class="mb-lg-2">
          <a class="link-light me-2" href="https://github.com/saka-web-id">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" width="1em" height="1em" fill="currentColor" class="fs-5">
              <!-- GitHub Icon from Font Awesome Free -->
              <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-2.9 0-5.2-1.6-5.2-3.6 0-2 2.3-3.6 5.2-3.6 2.9 0 5.2 1.6 5.2 3.6zm-33.1-6.9c-.7 1.5-2.6 2.1-4.1 1.4-1.5-.7-2.1-2.6-1.4-4.1.7-1.5 2.6-2.1 4.1-1.4 1.5.7 2.1 2.6 1.4 4.1zm44.8-1.7c-2.9 0-5.2 1.6-5.2 3.6 0 2 2.3 3.6 5.2 3.6 2.9 0 5.2-1.6 5.2-3.6 0-2-2.3-3.6-5.2-3.6zm50.3 6.9c0 2-2.3 3.6-5.2 3.6-2.9 0-5.2-1.6-5.2-3.6 0-2 2.3-3.6 5.2-3.6 2.9 0 5.2 1.6 5.2 3.6zm-25.1-6.9c-2.9 0-5.2 1.6-5.2 3.6 0 2 2.3 3.6 5.2 3.6 2.9 0 5.2-1.6 5.2-3.6 0-2-2.3-3.6-5.2-3.6zm-82.4 0c-2.9 0-5.2 1.6-5.2 3.6 0 2 2.3 3.6 5.2 3.6 2.9 0 5.2-1.6 5.2-3.6 0-2-2.3-3.6-5.2-3.6zm-25.1 6.9c0 2-2.3 3.6-5.2 3.6-2.9 0-5.2-1.6-5.2-3.6 0-2 2.3-3.6 5.2-3.6 2.9 0 5.2 1.6 5.2 3.6zm-25.1-6.9c-2.9 0-5.2 1.6-5.2 3.6 0 2 2.3 3.6 5.2 3.6 2.9 0 5.2-1.6 5.2-3.6 0-2-2.3-3.6-5.2-3.6zm-25.1 6.9c0 2-2.3 3.6-5.2 3.6-2.9 0-5.2-1.6-5.2-3.6 0-2 2.3-3.6 5.2-3.6 2.9 0 5.2 1.6 5.2 3.6zm-25.1-6.9c-2.9 0-5.2 1.6-5.2 3.6 0 2 2.3 3.6 5.2 3.6 2.9 0 5.2-1.6 5.2-3.6 0-2-2.3-3.6-5.2-3.6zM248 8C111 8 0 119 0 256c0 110.5 71.5 204.3 170.7 237.2 12.5 2.3 17.1-5.4 17.1-12v-42.5c-69.4 15.1-84-33.5-84-33.5-11.4-29-27.9-36.7-27.9-36.7-22.8-15.6 1.7-15.3 1.7-15.3 25.2 1.8 38.5 25.9 38.5 25.9 22.4 38.4 58.9 27.3 73.2 20.9 2.3-16.2 8.8-27.3 16-33.6-55.5-6.3-113.9-27.7-113.9-123.5 0-27.3 9.8-49.6 25.9-67.1-2.6-6.3-11.2-31.7 2.5-66.2 0 0 21-6.7 68.9 25.6 20-5.6 41.5-8.4 62.9-8.5 21.4.1 42.9 2.9 62.9 8.5 47.9-32.3 68.9-25.6 68.9-25.6 13.7 34.5 5.1 59.9 2.5 66.2 16.1 17.5 25.9 39.8 25.9 67.1 0 95.9-58.5 117.2-114.2 123.4 9 7.8 17 23.1 17 46.6v69.1c0 6.6 4.6 14.3 17.2 12C424.5 460.3 496 366.5 496 256 496 119 385 8 248 8z"/>
            </svg>
          </a>
          <a class="link-light me-2" href="https://www.linkedin.com/in/saka-wijaya/">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="1em" height="1em" fill="currentColor" class="fs-5">
              <!-- LinkedIn Icon from Font Awesome Free -->
              <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.8 53.8 0 11107.6 0c0 29.7-24.1 54.3-53.81 54.3zM447.9 448h-92.4V304.1c0-34.3-12.3-57.7-43.1-57.7-23.5 0-37.6 15.8-43.8 31.1-2.2 5.3-2.8 12.7-2.8 20.1V448h-92.4s1.2-270.7 0-299.1h92.4v42.4c12.3-19 34.3-46.1 83.5-46.1 61 0 107 39.8 107 125.2V448z"/>
            </svg>
          </a>
          <a class="link-light me-2" href="https://fountation.saka.web.id/">
            <svg width="21px" height="21px" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" transform="translate(2 3)"><path d="m8 16c4.4380025 0 8-3.5262833 8-7.96428571 0-4.43800246-3.5619975-8.03571429-8-8.03571429-4.43800245 0-8 3.59771183-8 8.03571429 0 4.43800241 3.56199755 7.96428571 8 7.96428571z"/><path d="m1 5h14"/><path d="m1 11h14"/><path d="m8 16c2.2190012 0 4-3.5262833 4-7.96428571 0-4.43800246-1.7809988-8.03571429-4-8.03571429-2.21900123 0-4 3.59771183-4 8.03571429 0 4.43800241 1.78099877 7.96428571 4 7.96428571z"/></g></svg>
          </a>
        </div>
        <ul class="nav d-flex justify-content-center mb-1">
<!--          <li class="nav-item"><a class="nav-link active fw-bold link-light" href="/home.html">Home</a></li>
          <li class="nav-item"><a class="nav-link fw-bold link-light" href="/howto.html">How to</a></li>-->
          <li class="nav-item"><router-link id="idfooterhome" to="/" class="nav-link fw-bold link-light">{{ t('app.features.title') }}</router-link></li>
          <li class="nav-item"><router-link id="idfooterhowtouse" to="/howtouse" class="nav-link fw-bold link-light">{{ t('app.howToUse.title') }}</router-link></li>
        </ul>
        <p class="text-muted mb-2">{{ t('app.copyright.title') }} © {{ t('app.brand.title') }}</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>

</style>