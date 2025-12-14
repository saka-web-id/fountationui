<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
        <div class="row">
          <div class="col col-xl-7 mx-auto">
            <div class="row row-cols-2 row-cols-md-3 mx-auto">
              <div class="mb-4">
                <div class="text-center"><img class="rounded object-fit-cover mb-3" width="150" height="150" src="/src/assets/img/Coming%20soon%20logo.webp">
                  <h5 class="fw-bold mb-0"><strong>{{ t('app.comingSoon.title') }}</strong></h5>
                  <p class="text-muted mb-2">{{ t('app.comingSoon.description') }}</p>
                </div>
              </div>
              <div class="mb-4">
                <div class="text-center"><img class="rounded object-fit-cover mb-3" width="150" height="150" src="/src/assets/img/Coming%20soon%20logo.webp">
                  <h5 class="fw-bold mb-0"><strong>{{ t('app.comingSoon.title') }}</strong></h5>
                  <p class="text-muted mb-2">{{ t('app.comingSoon.description') }}</p>
                </div>
              </div>
              <div class="mb-4">
                <div class="text-center"><img class="rounded object-fit-cover mb-3" width="150" height="150" src="/src/assets/img/Coming%20soon%20logo.webp">
                  <h5 class="fw-bold mb-0"><strong>{{ t('app.comingSoon.title') }}</strong></h5>
                  <p class="text-muted mb-2">{{ t('app.comingSoon.description') }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section>
          <div class="container py-4">
            <div class="row mb-4">
              <div class="col-md-8 col-xl-6 text-center mx-auto">
                <h3 class="text-uppercase fw-bold heading">{{ t('app.features.title') }}</h3>
              </div>
            </div>
            <div class="row">
              <div class="col col-xl-11 mx-auto">
                <div class="row gy-4 row-cols-1 row-cols-md-2 mx-auto">
                  <div>
                    <div class="card bg-white bg-opacity-10 bg-gradient">
                      <div class="card-body text-center text-lg-start d-flex flex-column align-items-center gap-3 flex-lg-row p-4">
                        <div>
                          <div class="bs-icon-xl bs-icon-circle bg-white bg-opacity-10 bs-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-pin-angle">
                            <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a5.927 5.927 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707-.195-.195.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a5.922 5.922 0 0 1 1.013.16l3.134-3.133a2.772 2.772 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146zm.122 2.112v-.002zm0-.002v.002a.5.5 0 0 1-.122.51L6.293 6.878a.5.5 0 0 1-.511.12H5.78l-.014-.004a4.507 4.507 0 0 0-.288-.076 4.922 4.922 0 0 0-.765-.116c-.422-.028-.836.008-1.175.15l5.51 5.509c.141-.34.177-.753.149-1.175a4.924 4.924 0 0 0-.192-1.054l-.004-.013v-.001a.5.5 0 0 1 .12-.512l3.536-3.535a.5.5 0 0 1 .532-.115l.096.022c.087.017.208.034.344.034.114 0 .23-.011.343-.04L9.927 2.028c-.029.113-.04.23-.04.343a1.779 1.779 0 0 0 .062.46z"></path>
                          </svg></div>
                        </div>
                        <div>
                          <h5 class="fw-bold">{{ t('app.comingSoon.title') }}</h5>
                          <p class="text-muted mb-0">{{ t('app.comingSoon.description') }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="card bg-white bg-opacity-10 bg-gradient">
                      <div class="card-body text-center text-lg-start d-flex flex-column align-items-center gap-3 flex-lg-row p-4">
                        <div>
                          <div class="bs-icon-xl bs-icon-circle bg-white bg-opacity-10 bs-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-shield-shaded">
                            <path fill-rule="evenodd" d="M8 14.933a.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"></path>
                          </svg></div>
                        </div>
                        <div>
                          <h5 class="fw-bold">{{ t('app.comingSoon.title') }}</h5>
                          <p class="text-muted mb-0">{{ t('app.comingSoon.description') }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="card bg-white bg-opacity-10 bg-gradient">
                      <div class="card-body text-center text-lg-start d-flex flex-column align-items-center gap-3 flex-lg-row p-4">
                        <div>
                          <div class="bs-icon-xl bs-icon-circle bg-white bg-opacity-10 bs-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-rocket-takeoff">
                            <path d="M9.752 6.193c.599.6 1.73.437 2.528-.362.798-.799.96-1.932.362-2.531-.599-.6-1.73-.438-2.528.361-.798.8-.96 1.933-.362 2.532"></path>
                            <path d="M15.811 3.312c-.363 1.534-1.334 3.626-3.64 6.218l-.24 2.408a2.56 2.56 0 0 1-.732 1.526L8.817 15.85a.51.51 0 0 1-.867-.434l.27-1.899c.04-.28-.013-.593-.131-.956a9.42 9.42 0 0 0-.249-.657l-.082-.202c-.815-.197-1.578-.662-2.191-1.277-.614-.615-1.079-1.379-1.275-2.195l-.203-.083a9.556 9.556 0 0 0-.655-.248c-.363-.119-.675-.172-.955-.132l-1.896.27A.51.51 0 0 1 .15 7.17l2.382-2.386c.41-.41.947-.67 1.524-.734h.006l2.4-.238C9.005 1.55 11.087.582 12.623.208c.89-.217 1.59-.232 2.08-.188.244.023.435.06.57.093.067.017.12.033.16.045.184.06.279.13.351.295l.029.073a3.475 3.475 0 0 1 .157.721c.055.485.051 1.178-.159 2.065Zm-4.828 7.475.04-.04-.107 1.081a1.536 1.536 0 0 1-.44.913l-1.298 1.3.054-.38c.072-.506-.034-.993-.172-1.418a8.548 8.548 0 0 0-.164-.45c.738-.065 1.462-.38 2.087-1.006ZM5.205 5c-.625.626-.94 1.351-1.004 2.09a8.497 8.497 0 0 0-.45-.164c-.424-.138-.91-.244-1.416-.172l-.38.054 1.3-1.3c.245-.246.566-.401.91-.44l1.08-.107-.04.039Zm9.406-3.961c-.38-.034-.967-.027-1.746.163-1.558.38-3.917 1.496-6.937 4.521-.62.62-.799 1.34-.687 2.051.107.676.483 1.362 1.048 1.928.564.565 1.25.941 1.924 1.049.71.112 1.429-.067 2.048-.688 3.079-3.083 4.192-5.444 4.556-6.987.183-.771.18-1.345.138-1.713a2.835 2.835 0 0 0-.045-.283 3.078 3.078 0 0 0-.3-.041Z"></path>
                            <path d="M7.009 12.139a7.632 7.632 0 0 1-1.804-1.352A7.568 7.568 0 0 1 3.794 8.86c-1.102.992-1.965 5.054-1.839 5.18.125.126 3.936-.896 5.054-1.902Z"></path>
                          </svg></div>
                        </div>
                        <div>
                          <h5 class="fw-bold">{{ t('app.comingSoon.title') }}</h5>
                          <p class="text-muted mb-0">{{ t('app.comingSoon.description') }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="card bg-white bg-opacity-10 bg-gradient">
                      <div class="card-body text-center text-lg-start d-flex flex-column align-items-center gap-3 flex-lg-row p-4">
                        <div>
                          <div class="bs-icon-xl bs-icon-circle bg-white bg-opacity-10 bs-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-shuffle">
                            <path fill-rule="evenodd" d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5"></path>
                            <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z"></path>
                          </svg></div>
                        </div>
                        <div>
                          <h5 class="fw-bold">{{ t('app.comingSoon.title') }}</h5>
                          <p class="text-muted mb-0">{{ t('app.comingSoon.description') }}</p>
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