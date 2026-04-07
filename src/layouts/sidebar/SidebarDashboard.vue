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
    <li class="nav-item dropdown " id="idorganization">
      <a class="dropdown-toggle nav-link" aria-expanded="true" data-bs-toggle="dropdown" href="#">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-people-fill me-1 mb-1 pb-0" style="color: var(--bs-primary);">
          <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"></path>
        </svg>
        {{ t('textLabel.organization') }}
      </a>
      <div class="dropdown-menu " data-bs-popper="none">
        <router-link to="/company" class="dropdown-item" id="idemail">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-building me-1 mb-1">
            <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"></path>
            <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3z"></path>
          </svg>
          {{ t('textLabel.company', 2) }}
        </router-link>
        <router-link to="/roles/0" class="dropdown-item" id="idroles">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-person me-1 mb-1">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z"></path>
          </svg>
          {{ t('textLabel.role', 2) }}
        </router-link>
        <router-link to="/membership/0" class="dropdown-item" id="idmembership">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-credit-card me-1 mb-1">
            <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"></path>
            <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3z"></path>
          </svg>
          {{ t('textLabel.membership', 2) }}
        </router-link>
      </div>
    </li>
    <li class="nav-item dropdown " id="idlogs">
      <a class="dropdown-toggle nav-link" aria-expanded="true" data-bs-toggle="dropdown" href="#">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-people-fill me-1 mb-1 pb-0" style="color: var(--bs-primary);">
          <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"></path>
        </svg>
        {{ t('textLabel.logs') }}
      </a>
      <div class="dropdown-menu " data-bs-popper="none">
        <template v-if="isPremium">
          <router-link to="/gatewaylogs" class="dropdown-item" id="idgatewaylogs">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-list-columns-reverse me-1 mb-1">
              <path fill-rule="evenodd" d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V2a1 1 0 0 0-1-1zm14 3H0v1h14zM0 6h14v1H0zm0 2h14v1H0zm0 2h14v1H0zm0 2h14v1H0z"/>
            </svg>
            {{ t('textLabel.gatewayLogs') }}
          </router-link>
        </template>
        <template v-else>
              <span class="dropdown-item text-muted disabled" style="cursor: not-allowed;">
                <i class="bi bi-lock-fill me-1"></i> {{ t('textLabel.gatewayLogs') }} (Premium)
              </span>
        </template>

        <template v-if="isPremium">
          <router-link to="/apilogs" class="dropdown-item" id="idapilogs">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-journal-text me-1 mb-1">
              <path d="M5 1a.5.5 0 0 1 .5.5V2h5v-.5a.5.5 0 0 1 1 0V2h.5a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h.5v-.5a.5.5 0 0 1 .5-.5zM3 4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H3z"/>
              <path d="M4 7h8v1H4V7zm0 2h8v1H4V9zm0 2h4v1H4v-1z"/>
            </svg>
            {{ t('textLabel.apiLogs') }}
          </router-link>
        </template>
        <template v-else>
            <span class="dropdown-item text-muted disabled" style="cursor: not-allowed;">
              <i class="bi bi-lock-fill me-1"></i> {{ t('textLabel.apiLogs') }} (Premium)
            </span>
        </template>
        <template v-if="isPremium">
          <router-link to="/notificationlogs" class="dropdown-item" id="idnotificationlogs">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-journal-text me-1 mb-1">
              <path d="M5 1a.5.5 0 0 1 .5.5V2h5v-.5a.5.5 0 0 1 1 0V2h.5a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h.5v-.5a.5.5 0 0 1 .5-.5zM3 4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H3z"/>
              <path d="M4 7h8v1H4V7zm0 2h8v1H4V9zm0 2h4v1H4v-1z"/>
            </svg>
            {{ t('textLabel.notification') }}
          </router-link>
        </template>
        <template v-else>
            <span class="dropdown-item text-muted disabled" style="cursor: not-allowed;">
              <i class="bi bi-lock-fill me-1"></i> {{ t('textLabel.notification') }} (Premium)
            </span>
        </template>
      </div>
    </li>

    <li class="nav-item" id="idsetting">
      <a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#" role="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-gear-fill me-1 mb-1" style="color: var(--bs-primary);">
          <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"></path>
        </svg>
        {{ t('textLabel.setting', 2) }}
      </a>

      <ul class="dropdown-menu">
        <li>
          <template v-if="isPremium">
            <router-link to="/notification/setting" class="dropdown-item">
              <i class="bi bi-envelope-at me-1"></i> {{ t('textLabel.notification') }}
            </router-link>
          </template>
          <template v-else>
              <span class="dropdown-item text-muted disabled" style="cursor: not-allowed;">
                <i class="bi bi-lock-fill me-1"></i> {{ t('textLabel.notification') }} (Premium)
              </span>
          </template>
        </li>
        <li>
          <template v-if="isPremium">
            <router-link to="/logsetting" class="dropdown-item">
              <i class="bi bi-shield-lock me-1"></i> {{ t('textLabel.logSetting') }}
            </router-link>
          </template>
          <template v-else>
              <span class="dropdown-item text-muted disabled" style="cursor: not-allowed;">
                <i class="bi bi-lock-fill me-1"></i> {{ t('textLabel.logSetting') }} (Premium)
              </span>
          </template>
        </li>

        <li>
          <router-link to="/permissionsetting" class="dropdown-item">
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