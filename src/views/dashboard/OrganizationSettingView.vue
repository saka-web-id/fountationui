<script setup lang="ts">
import SidebarDashboard from "../../layouts/sidebar/SidebarDashboard.vue";
import HeaderDashboard from "../../layouts/headers/HeaderDashboard.vue";
import OrganizationSettingGrid from "../../features/dashboard/components/OrganizationSettingGrid.vue";
</script>

<template>
  <div id="wrapper">
    <SidebarDashboard />
    <HeaderDashboard />
  </div>
  <OrganizationSettingGrid />
</template>

<style scoped>
</style>
