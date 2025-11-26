<script setup lang="ts">
import {ref} from "vue";
import { useI18n } from 'vue-i18n';


const { locale, t } = useI18n(); // This 'locale' is specific to this component

let localeCode = ref(locale.value.toUpperCase());

const selectOption = (option:string) => {
  console.log(option);

  localeCode.value = option.toUpperCase();
  locale.value = option.toLowerCase();
};
</script>

<template>
  <div class="dropdown">
    <ul class="nav text-end float-end w-auto ms-0">
      <li class="nav-item dropdown ms-2">
        <a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#">{{ localeCode }}</a>
        <div class="dropdown-menu dropdown-menu-end">
          <a class="dropdown-item" @click="selectOption('en')" href="#">{{ t('language.english') }}</a>
          <a class="dropdown-item" @click="selectOption('id')" href="#">{{ t('language.indonesia') }}</a>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>