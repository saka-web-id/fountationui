<script setup lang="ts">
import SidebarDashboard from "~/layouts/sidebar/SidebarDashboard.vue";
import HeaderDashboard from "~/layouts/headers/HeaderDashboard.vue";
import CountryStateContent from "~/features/registry/country-state/components/CountryStateContent.vue";
</script>

<template>
  <div id="wrapper">
    <SidebarDashboard />
    <HeaderDashboard />
  </div>
  <CountryStateContent />
</template>

<style scoped>
</style>
