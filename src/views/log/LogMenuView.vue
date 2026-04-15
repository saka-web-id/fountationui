<script setup lang="ts">
import SidebarDashboard from "../../layouts/sidebar/SidebarDashboard.vue";
import HeaderDashboard from "../../layouts/headers/HeaderDashboard.vue";
import LogMenuGrid from "~/features/log/LogMenuGrid.vue";
</script>

<template>
  <div id="wrapper">
    <SidebarDashboard />
    <HeaderDashboard />
  </div>
  <LogMenuGrid />
</template>

<style scoped>
</style>
