<script setup lang="ts">
import SidebarDashboard from "~/layouts/sidebar/SidebarDashboard.vue";
import HeaderDashboard from "~/layouts/headers/HeaderDashboard.vue";
import CountryContent from "~/features/registry/country/components/CountryContent.vue";
</script>

<template>
  <div id="wrapper">
    <SidebarDashboard />
    <HeaderDashboard />
  </div>
  <CountryContent />
</template>

<style scoped>
</style>
