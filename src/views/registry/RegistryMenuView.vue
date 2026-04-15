<script setup lang="ts">
import SidebarDashboard from "../../layouts/sidebar/SidebarDashboard.vue";
import HeaderDashboard from "../../layouts/headers/HeaderDashboard.vue";
import RegistryMenuGrid from "~/features/registry/RegistryMenuGrid.vue";
</script>

<template>
  <div id="wrapper">
    <SidebarDashboard />
    <HeaderDashboard />
  </div>
  <RegistryMenuGrid />
</template>

<style scoped>
</style>
