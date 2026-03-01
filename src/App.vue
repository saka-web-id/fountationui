<script setup lang="ts">
import { globalError, setGlobalError } from '~/stores/globalError'
import { globalSuccess, setGlobalSuccess } from '~/stores/globalSuccess'
import { globalLoading } from '~/stores/globalLoading'
import ErrorModal from '~/components/modal/ErrorModal.vue'
import SuccessModal from "~/components/modal/SuccessModal.vue";
import GlobalLoading from "~/components/backdrop/GlobalLoading.vue";


</script>

<template>
  <main>
    <Teleport to="body">
      <ErrorModal :show="globalError !== null" :message="globalError" @close="setGlobalError(null)" />
      <SuccessModal :show="globalSuccess !== null" :message="globalSuccess" @close="setGlobalSuccess(null)" />
    </Teleport>
    <GlobalLoading :show="globalLoading" />
    <RouterView />
  </main>
</template>