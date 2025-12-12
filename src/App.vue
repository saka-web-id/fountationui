<script setup lang="ts">
import { globalError, setGlobalError } from '~/stores/globalError'
import { globalLoading } from '~/stores/globalLoading'
import ErrorModal from '~/components/modal/ErrorModal.vue'
import GlobalLoading from "~/components/backdrop/GlobalLoading.vue";


</script>

<template>
  <main>
    <Teleport to="body"><ErrorModal :show="globalError !== null" :message="globalError" @close="setGlobalError(null)" /></Teleport>
    <GlobalLoading :show="globalLoading" />
    <RouterView />
  </main>
</template>