<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <section class="pt-2 pb-2">

    <<div class="container">
    <div class="row">
      <div class="col col-lg-10 mx-auto">
        <div class="card bg-gradient-dark">
          <div class="card-body">
            <div class="p-lg-4 py-3">
              <div class="row gy-4 gy-md-0 mx-auto">
                <div class="col-12 col-md-6 col-lg-5 col-xxl-5 ps-0 pe-0">
                  <img class="rounded img-fluid aspect-ratio-1x1 object-fit-cover shadow w-100 ms-0 ps-0 me-0 pe-0" width="1024" height="1024" src="../../../assets/img/Unauthorized Image.webp" />
                </div>
                <div class="col text-center align-items-md-center ms-0 ps-2 pe-2">
                  <div class="text-center text-sm-center text-md-center text-lg-start text-xl-start text-xxl-start ms-0 ps-0 me-0 pe-0">
                    <h5 class="text-uppercase fw-bold text-center d-block me-0 mb-0 pb-0 mx-auto heading" style="font-size: 40px;"><br />
                      <span style="color: rgb(230, 232, 240); background-color: rgb(31, 31, 31);">ERROR 401</span>
                    </h5>
                    <h5 class="text-uppercase fw-bold text-center d-block mx-auto heading"><br />
                      <span style="color: rgb(230, 232, 240); background-color: rgb(31, 31, 31);">{{ t('textError.unauthorized') }}</span>
                    </h5>
                    <button class="btn btn-primary text-center d-flex flex-fill justify-content-center align-items-center align-content-center mx-auto" type="button" style="text-align: justify;">
                      {{ t('textLabel.home') }}
                    </button>
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