<script setup lang="ts">
// @ts-ignore
import SvgButtonCloseSideBar from "../../components/button/svg/SvgButtonCloseSideBar.vue";
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
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
    <li class="nav-item" id="idorganization">
      <router-link to="/organization/setting" class="nav-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-people-fill me-1 mb-1 pb-0" style="color: var(--bs-primary);">
          <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"></path>
        </svg>
        {{ t('textLabel.organization') }}
      </router-link>
    </li>
    <li class="nav-item" id="idnotification">
      <router-link to="/notification/setting" class="nav-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-bell-fill me-1 mb-1 pb-0" style="color: var(--bs-primary);">
          <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901"/>
        </svg>
        {{ t('textLabel.notification') }}
      </router-link>
    </li>

    <li class="nav-item" id="idlogs">
      <router-link to="/submenulogs" class="nav-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-journal-code me-1 mb-1" style="color: var(--bs-primary);">
          <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5zm0 1v3.5H13l-3.5-3.5zM3 2a1 1 0 0 1 1-1h5.5l.001 3.5a1 1 0 0 0 1 1H13v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1zm3.354 4.646a.5.5 0 1 0-.708.708L7.293 9l-1.647 1.646a.5.5 0 0 0 .708.708l2-2a.5.5 0 0 0 0-.708z"/>
        </svg>
        {{t('textLabel.activityLogs')}}
      </router-link>
    </li>

    <li class="nav-item" id="idregistries">
      <router-link to="/submenu/registries" class="nav-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-collection me-1 mb-1" style="color: var(--bs-primary);">
          <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm1.5.5A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13z"/>
        </svg>
        {{t('textLabel.registry', 2)}}
      </router-link>
    </li>

    <li class="nav-item" id="idobjectstorage">
      <router-link to="/object/storage/setting" class="nav-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-cloud-fill me-1 mb-1" style="color: var(--bs-primary);">
          <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.466 4.63A4.474 4.474 0 0 1 15.5 10 4.5 4.5 0 0 1 11 14.5h-7A4.5 4.5 0 0 1 0 10c0-2.223 1.62-4.07 3.73-4.445.1-.01.2-.016.3-.016a5.5 5.5 0 0 1 .376-2.203Z"/>
        </svg>
        {{t('registry.objectStorage')}}
      </router-link>
    </li>

    <li class="nav-item" id="idcognitive">
      <router-link to="/cognitive/ai/settings" class="nav-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-robot me-1 mb-1" style="color: var(--bs-primary);">
          <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.881A7.105 7.105 0 0 1 11 12.5V13h2.5a.5.5 0 0 1 0 1h-11a.5.5 0 0 1 0-1H5v-.5a6.105 6.105 0 0 0-4.745-5.938A.5.5 0 1 1 1 6.062ZM8 0a.5.5 0 0 1 .5.5v1.3a6 6 0 0 1 4.146 1.707l.919-.918a.5.5 0 1 1 .707.707l-.918.919A6 6 0 0 1 15 8.5h1.3a.5.5 0 0 1 0 1H15a6 6 0 0 1-1.707 4.146l.918.919a.5.5 0 0 1-.707.707l-.919-.918A6 6 0 0 1 8.5 15H8v1.3a.5.5 0 0 1-1 0V15a6 6 0 0 1-4.146-1.707l-.919.918a.5.5 0 0 1-.707-.707l.918-.919A6 6 0 0 1 1 8.5H0a.5.5 0 0 1 0-1h1.3a6 6 0 0 1 1.707-4.146l-.918-.919a.5.5 0 0 1 .707-.707l.919.918A6 6 0 0 1 7.5 1.8V.5a.5.5 0 0 1 .5-.5Z"/>
        </svg>
        {{t('cognitive.title')}}
      </router-link>
    </li>

    <li class="nav-item" id="idsetting">
      <router-link to="/setting/list" class="nav-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-gear-fill me-1 mb-1" style="color: var(--bs-primary);">
          <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"></path>
        </svg>
        {{ t('textLabel.setting', 2) }}
      </router-link>
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