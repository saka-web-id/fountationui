<script setup lang="ts">
import HeaderDropdownLocale from "../../components/dropdown/HeaderDropdownLocale.vue";
</script>

<template>
  <header>
    <div class="text-center d-flex mb-0 pb-0 top-header-area">
      <div class="text-start float-start w-75">
        <ul class="nav w-auto">
          <li class="nav-item">
            <a class="nav-link active ps-0 pe-0 mt-1 mb-0 pb-0" target=”_blank” data-bs-toggle="tooltip" data-bss-tooltip data-bs-placement="left" href="https://wa.me/628158224448">
              <svg class="bi bi-whatsapp text-primary ms-2 me-2 mb-2" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" style="width: 14px;height: 14px;">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"></path>
              </svg>
              <sup class="d-none d-md-inline">
                <span>+628158224448</span>
              </sup>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link active mt-1 mb-0 pb-0" target=”_blank” data-bs-toggle="tooltip" data-bss-tooltip data-bs-placement="left" href="mailto:sakawijaya@gmail.com">
              <svg class="bi bi-envelope text-primary ms-2 me-2 mb-2" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" style="width: 14px;height: 14px;">
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"></path>
              </svg>
              <sup class="d-none d-md-inline">
                <span>sakawijaya@gmail.com</span>
              </sup>
            </a>
          </li>
        </ul>
      </div>
      <HeaderDropdownLocale class="text-end float-end w-25" />
    </div>
    <nav class="navbar navbar-expand-lg py-3" data-bs-theme="dark">
      <div class="container"><a class="navbar-brand d-flex align-items-center" href="#"><img class="img-fluid me-3" width="40" height="40" src="/src/assets/img/logos/logo.svg" /><span class="fs-3 fw-bold">Brand</span></a><button class="navbar-toggler me-0" data-bs-toggle="collapse" data-bs-target="#navcol-3"><span class="visually-hidden">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
        <div id="navcol-3" class="collapse navbar-collapse">
          <ul class="navbar-nav mb-4 mb-lg-0 mx-auto">
            <li class="nav-item"><router-link to="/" class="nav-link">{{ $t('app.features.title') }}</router-link></li>
            <li class="nav-item"><router-link to="/howtouse" class="nav-link" >{{ $t('app.howToUse.title') }}</router-link></li>
          </ul>
            <!--<router-link to="/login" tag="button" class="btn bg-white bg-opacity-10 bg-gradient me-2">{{ $t('button.login') }}</router-link>-->
            <a href="http://localhost:8080/user/login/success" tag="button" class="btn bg-white bg-opacity-10 bg-gradient me-2">{{ $t('button.login') }}</a>
            <router-link to="/registration" tag="button" class="btn bg-white bg-opacity-10 bg-gradient me-2">{{ $t('button.signup') }}</router-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>

</style>