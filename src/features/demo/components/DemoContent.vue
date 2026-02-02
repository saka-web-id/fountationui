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
              <h3 class="text-uppercase fs-4 fw-bold mb-3 heading">{{ t('app.demo.title') }}</h3>
              <p class="text-muted">{{ t('app.demo.description') }}</p>
            </div>
            <div class="row gy-4 row-cols-1 row-cols-sm-2">
              <div>
                <div class="card text-center">
                  <div class="card-header">
                    <h4>{{ t('app.demo.signup.title') }}</h4>
                  </div>
                  <div class="card-body">
                    <h6 class="text-muted card-subtitle mb-2"><br><span style="color: rgb(255, 255, 255);">{{ t('app.demo.signup.description') }}</span><br><br></h6>
                    <a class="card-link btn btn-primary" href="/registration">{{ t('button.signup') }}</a>
                  </div>
                </div>
              </div>
              <div>
                <div class="card text-center">
                  <div class="card-header">
                    <h4>{{ t('app.demo.login.title') }}</h4>
                  </div>
                  <div class="card-body">
                    <h6 class="text-muted card-subtitle mb-2"><span style="color: rgb(255, 255, 255);">{{ t('app.demo.login.description') }}</span></h6>
                    <p class="card-text"></p>
                    <ul>
                      <li class="text-start">{{ t('textField.username') }} : johndoe@example.com</li>
                      <li class="text-start">{{ t('textField.password') }} : Demo1234!</li>
                    </ul>
                    <a class="card-link btn btn-info" href="http://www.myproject.local:8080/api/v0/user/login">{{ t('button.login') }}</a>
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