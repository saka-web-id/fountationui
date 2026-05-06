<script setup lang="ts">
import SidebarDashboard from "~/layouts/sidebar/SidebarDashboard.vue";
import HeaderDashboard from "~/layouts/headers/HeaderDashboard.vue";
import CurrencyContent from "~/features/registry/currency/components/CurrencyContent.vue";
</script>

<template>
  <div id="wrapper">
    <SidebarDashboard />
    <HeaderDashboard />
  </div>
  <CurrencyContent />
</template>

<style scoped>
</style>
