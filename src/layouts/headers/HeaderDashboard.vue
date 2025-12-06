<script setup lang="ts">

// @ts-ignore
import SvgButtonOpenSideBar from "../../components/button/svg/SvgButtonOpenSideBar.vue";
import HeaderDropdownLocale from "../../components/dropdown/HeaderDropdownLocale.vue";
</script>

<template>
  <div id="content-wrapper">
    <div id="content">
      <nav class="navbar navbar-expand py-3" data-bs-theme="dark">
        <div class="container-fluid">
          <SvgButtonOpenSideBar />
<!--          <svg id="sidebarToggle" class="bi bi-list fs-4 ms-0 ps-0 me-1 pe-0 mt-0 pt-0 mb-0 pb-0" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"></path>
          </svg>-->
          <router-link to="#" class="navbar-brand d-flex align-items-center">
            <span class="d-none d-md-inline pe-0">{{ $t('app.brand.title') }}</span>
          </router-link>
<!--          <a class="navbar-brand d-flex align-items-center" href="#">
            <span class="d-none d-md-inline pe-0">Brand</span>
          </a>-->
          <span class="bs-icon-sm bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center me-2 bs-icon">
            <svg class="bi bi-bezier" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M0 10.5A1.5 1.5 0 0 1 1.5 9h1A1.5 1.5 0 0 1 4 10.5v1A1.5 1.5 0 0 1 2.5 13h-1A1.5 1.5 0 0 1 0 11.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm10.5.5A1.5 1.5 0 0 1 13.5 9h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM6 4.5A1.5 1.5 0 0 1 7.5 3h1A1.5 1.5 0 0 1 10 4.5v1A1.5 1.5 0 0 1 8.5 7h-1A1.5 1.5 0 0 1 6 5.5zM7.5 4a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"></path>
              <path d="M6 4.5H1.866a1 1 0 1 0 0 1h2.668A6.517 6.517 0 0 0 1.814 9H2.5c.123 0 .244.015.358.043a5.517 5.517 0 0 1 3.185-3.185A1.503 1.503 0 0 1 6 5.5zm3.957 1.358A1.5 1.5 0 0 0 10 5.5v-1h4.134a1 1 0 1 1 0 1h-2.668a6.517 6.517 0 0 1 2.72 3.5H13.5c-.123 0-.243.015-.358.043a5.517 5.517 0 0 0-3.185-3.185z"></path>
            </svg>
          </span>
          <div id="navcol-2" class="collapse navbar-collapse">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item dropdown me-1 dropdown-menu-end dropdown-menu-lg-start"><a class="nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#"><svg class="bi bi-bell me-2 mb-1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6"></path>
              </svg></a>
                <div class="dropdown-menu dropdown-menu-dark ms-0 ps-0 me-0 pe-0 mt-0 pt-0 mb-0 pb-0 dropdown-menu-end">
                  <div class="card bg-gradient border-primary ms-0 ps-0 me-0 pe-0 mt-0 mb-0">
                    <div class="card-body text-center ms-0 ps-0 me-0 pe-0 mt-0 pt-0 mb-0 pb-0 card-header" style="background: var(--bs-primary);color: var(--bs-secondary-bg-subtle);">
                      <h6 class="ps-6 pe-6 mt-1 mb-1 card-subtitle">Example</h6>
                    </div>
                    <div class="card-body border ms-0 ps-0 me-0 pe-0 mt-0 pt-0 pb-0 flex-1">
                      <h6 class="text-danger ms-2 me-4 mt-0 card-subtitle h7">Danger</h6>
                      <p class="fw-normal text-body ms-2 mt-2 mb-0 card-text h7">Login Problem</p><a class="ms-2 card-link h7" href="#">More</a>
                    </div>
                    <div class="card-body border ms-0 ps-0 me-0 pe-0 mt-0 pt-0 pb-0 flex-1">
                      <h6 class="text-info ms-2 me-4 mt-0 card-subtitle h7">Information</h6>
                      <p class="fw-normal text-body ms-2 mt-2 mb-0 card-text h7">Login Problem</p><a class="ms-2 card-link h7" href="#">More</a>
                    </div>
                    <div class="card-body ms-0 ps-0 me-0 pe-0 mt-1 pt-0 pb-0 flex-1">
                      <h6 class="text-warning ms-2 me-4 card-subtitle h7">Warning</h6>
                      <p class="fw-normal text-body ms-2 mt-2 mb-0 card-text h7">Login Problem</p><a class="ms-2 card-link h7" href="#">More</a>
                    </div>
                  </div>
                </div>
              </li>
              <li class="nav-item dropdown dropdown-menu-end dropdown-menu-lg-start"><a class="nav-link me-0 pe-2" aria-expanded="false" data-bs-toggle="dropdown" href="#"><svg class="bi bi-envelope me-2 mb-1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16">
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"></path>
              </svg></a>
                <div class="dropdown-menu dropdown-menu-dark mt-0 pt-0 mb-0 pb-0 dropdown-menu-end">
                  <div class="card bg-gradient border-primary ms-0 ps-0 me-0 pe-0 mt-0 mb-0">
                    <div class="card-body text-center ms-0 ps-0 me-0 pe-0 mt-0 pt-0 mb-0 pb-0 card-header" style="background: var(--bs-primary);color: var(--bs-secondary-bg-subtle);">
                      <h6 class="ps-7 pe-7 mt-1 mb-1 card-subtitle">{{ $t('textLabel.message') }}</h6>
                    </div>
                    <div class="card-body border ms-0 ps-0 me-0 pe-0 mt-0 pt-0 pb-0 flex-1">
                      <h6 class="text-info ms-2 me-4 mt-0 card-subtitle h7">Subject :  replay ASAP</h6>
                      <p class="fw-normal text-body ms-2 mt-2 mb-0 card-text h7">Please help replay ASAP this message</p><a class="ms-2 card-link h7" href="#">More</a>
                    </div>
                    <div class="card-body border ms-0 ps-0 me-0 pe-0 mt-0 pt-0 pb-0 flex-1">
                      <h6 class="text-info ms-2 me-4 mt-0 card-subtitle h7">Information</h6>
                      <p class="fw-normal text-body ms-2 mt-2 mb-0 card-text h7">Announcement to re-login</p><a class="ms-2 card-link h7" href="#">More</a>
                    </div>
                    <div class="card-body ms-0 ps-0 me-0 pe-0 mt-1 pt-0 pb-0 flex-1">
                      <h6 class="text-info ms-2 me-4 card-subtitle h7">Subject : help for support</h6>
                      <p class="fw-normal text-body ms-2 mt-2 mb-0 card-text h7">We need help support for this</p><a class="ms-2 card-link h7" href="#">More</a>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <HeaderDropdownLocale class="dropdown-menu-end dropdown-menu-lg-start" />
            <div class="dropdown dropdown-menu-end dropdown-menu-lg-start">
              <a aria-expanded="false" data-bs-toggle="dropdown" href="#">
                <img class="rounded-circle ms-2 me-2" alt="closeup photo of gray rabbit" width="40" height="40" src="/src/assets/img/photo-1529040181623-e04ebc611e25.jpg" />
              </a>
              <div class="dropdown-menu dropdown-menu-dark dropdown-menu-end">
                <router-link to="/profileinformation" class="dropdown-item">{{ $t('textLabel.profile') }}</router-link>
                <router-link to="/activity" class="dropdown-item">{{ $t('textLabel.activity') }}</router-link>
                <router-link to="/" class="dropdown-item" style="color: var(--bs-danger);border-top-style: solid;">{{ $t('textLabel.logout') }}</router-link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<style scoped>

</style>