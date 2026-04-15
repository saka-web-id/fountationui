<script setup lang="ts">
// @ts-ignore
import SvgButtonCloseSideBar from "../../components/button/svg/SvgButtonCloseSideBar.vue";
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const isPremium = import.meta.env.VITE_APP_PLAN === 'PREMIUM';
</script>

<template>
  <ul class="nav flex-column shadow d-flex sidebar">
    <li class="nav-item logo-holder">
      <div class="ms-0 ps-2 mt-0 mb-0 pb-0 logo">
        <a class="active fs-4 text-decoration-none ms-0 me-0 mt-0 pt-0 mb-0 pb-0" id="title" href="#">
          <strong class="me-1">{{ t('app.brand.title') }}</strong>
          <SvgButtonCloseSideBar />
        </a>

      </div>
    </li>
    <li class="nav-item">
      <router-link to="/dashboard" class="nav-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-pie-chart-fill me-1 pe-0 mb-1" style="color: var(--bs-primary);">
          <path d="M15.985 8.5H8.207l-5.5 5.5a8 8 0 0 0 13.277-5.5zM2 13.292A8 8 0 0 1 7.5.015v7.778l-5.5 5.5zM8.5.015V7.5h7.485A8.001 8.001 0 0 0 8.5.015z"></path>
        </svg>
        {{ t('textLabel.dashboard') }}
      </router-link>
    </li>
    <li class="nav-item dropdown" id="idorganization">
      <a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" data-bs-display="static" href="#" role="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-people-fill me-1 mb-1 pb-0" style="color: var(--bs-primary);">
          <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"></path>
        </svg>
        {{ t('textLabel.organization') }}
      </a>
      <div class="dropdown-menu">
        <router-link to="/company" class="dropdown-item" id="idemail" data-bs-dismiss="dropdown">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-building me-1 mb-1">
            <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"></path>
            <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3z"></path>
          </svg>
          {{ t('textLabel.company', 2) }}
        </router-link>
        <router-link to="/roles/0" class="dropdown-item" id="idroles" data-bs-dismiss="dropdown">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-person me-1 mb-1">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z"></path>
          </svg>
          {{ t('textLabel.role', 2) }}
        </router-link>
        <router-link to="/membership/0" class="dropdown-item" id="idmembership" data-bs-dismiss="dropdown">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-credit-card me-1 mb-1">
            <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"></path>
            <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3z"></path>
          </svg>
          {{ t('textLabel.membership', 2) }}
        </router-link>
      </div>
    </li>
    <li class="nav-item dropdown" id="idnotification">
      <a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" data-bs-display="static" href="#" role="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-bell-fill me-1 mb-1 pb-0" style="color: var(--bs-primary);">
          <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901"/>
        </svg>
        {{ t('textLabel.notification') }}
      </a>
      <div class="dropdown-menu">
        <router-link to="/notification/templates" class="dropdown-item" id="idnotificationtemplates" data-bs-dismiss="dropdown">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-layout-text-window-reverse me-1 mb-1">
            <path d="M13 6.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5m0 3a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5m0 3a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5m-9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m0-3a1 1 0 1 0 0 2 1 1 0 0 0 0-2m0-3a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm1 2v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4zm14-1V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v1z"/>
          </svg>
          {{ t('textLabel.template', 2) }}
        </router-link>
        <router-link to="/notification/campaign" class="dropdown-item" id="idnotificationcampaign" data-bs-dismiss="dropdown">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-megaphone me-1 mb-1">
            <path d="M13 2.5a1.5 1.5 0 0 1 1.5 1.5v10.128a.5.5 0 0 1-.73.444l-1.136-.568a2 2 0 0 0-1.754 0l-1.136.568a.5.5 0 0 1-.73-.444V4a1.5 1.5 0 0 1 1.5-1.5zm0 1a.5.5 0 0 0-.5.5v8.8a1 1 0 0 1-1.316.949l-.115-.058a1 1 0 0 0-.877 0l-.115.058a1 1 0 0 1-1.316-.949V4a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v10a.5.5 0 0 1-1 0V4a1.5 1.5 0 0 1 1.5-1.5h1zm-7.002 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM1 4v10a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1zm1 0h2v10H2V4z"/>
          </svg>
          {{ t('textLabel.campaign', 2) }}
        </router-link>
        <router-link to="/notification/history" class="dropdown-item" id="idnotificationhistory" data-bs-dismiss="dropdown">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-clock-history me-1 mb-1">
            <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.74l.908-.417c.184.4.349.81.493 1.23l-.962.327a7.054 7.054 0 0 0-.44-.741zM12.795 4.3c-.165-.267-.35-.521-.553-.76l.77-.639c.24.282.458.582.653.899l-.87.5zM14 8A6 6 0 0 0 8.5 2.123V1c3.313 0 6 2.687 6 6 0 .222-.012.442-.035.658l-.993-.108A5.99 5.99 0 0 0 14 8zM1.4 6a6 6 0 0 0 0 4h1.018a4.996 4.996 0 0 1 0-4H1.4zM3.25 12.182c.113.113.23.223.352.328l-.66.752a7.107 7.107 0 0 1-.433-.408l.741-.672zM5.132 14.155c.17.078.344.15.522.213l-.338.942a8.04 8.04 0 0 1-.682-.277l.498-.878zM8 15a6 6 0 0 0 5.5-3.877l.933.36a7 7 0 0 1-13.433 0l.933-.36A6 6 0 0 0 8 15z"/>
            <path d="M7 5V8h3v1H6V5h1z"/>
          </svg>
          {{ t('textLabel.history') }}
        </router-link>
      </div>
    </li>

    <li class="nav-item" id="idlogs">
      <router-link to="/submenulogs" class="nav-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-journal-code me-1 mb-1" style="color: var(--bs-primary);">
          <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5zm0 1v3.5H13l-3.5-3.5zM3 2a1 1 0 0 1 1-1h5.5l.001 3.5a1 1 0 0 0 1 1H13v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1zm3.354 4.646a.5.5 0 1 0-.708.708L7.293 9l-1.647 1.646a.5.5 0 0 0 .708.708l2-2a.5.5 0 0 0 0-.708z"/>
        </svg>
        {{t('textLabel.activityLogs')}}
      </router-link>
    </li>

    <li class="nav-item dropdown" id="idsetting">
      <a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" data-bs-display="static" href="#" role="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-gear-fill me-1 mb-1" style="color: var(--bs-primary);">
          <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"></path>
        </svg>
        {{ t('textLabel.setting', 2) }}
      </a>

      <ul class="dropdown-menu">
        <li>
          <template v-if="isPremium">
            <router-link to="/notification/setting" class="dropdown-item" data-bs-dismiss="dropdown">
              <i class="bi bi-envelope-at me-1"></i> {{ t('textLabel.notification') }}
            </router-link>
          </template>
          <template v-else>
              <span class="dropdown-item text-muted disabled" style="cursor: not-allowed;" data-bs-dismiss="dropdown">
                <i class="bi bi-lock-fill me-1"></i> {{ t('textLabel.notification') }} (Premium)
              </span>
          </template>
        </li>
        <li>
          <template v-if="isPremium">
            <router-link to="/logsetting" class="dropdown-item" data-bs-dismiss="dropdown">
              <i class="bi bi-shield-lock me-1"></i> {{ t('textLabel.logSetting') }}
            </router-link>
          </template>
          <template v-else>
              <span class="dropdown-item text-muted disabled" style="cursor: not-allowed;" data-bs-dismiss="dropdown">
                <i class="bi bi-lock-fill me-1"></i> {{ t('textLabel.logSetting') }} (Premium)
              </span>
          </template>
        </li>

        <li>
          <router-link to="/permissionsetting" class="dropdown-item" data-bs-dismiss="dropdown">
            <i class="bi bi-key me-1"></i> {{ t('textLabel.permissionSetting') }}
          </router-link>
        </li>
      </ul>
    </li>
  </ul>
</template>

<style scoped>
/*.dropdown-submenu {
  position: relative;
}

.dropdown-submenu .dropdown-menu {
  top: 0;
  left: 95%; !* Mulai sedikit lebih ke kiri agar transisi hover tidak mudah putus *!
  margin-top: -5px;
  display: none;
  z-index: 1000; !* Pastikan di atas elemen lain *!
  box-shadow: 0 4px 8px rgba(0,0,0,0.1); !* Tambahkan bayangan agar terlihat terpisah *!
}

.dropdown-submenu:hover > .dropdown-menu {
  display: block;
  left: 100%; !* Geser ke posisi penuh saat hover *!
  transition: all 0.2s ease;
}*/
</style>