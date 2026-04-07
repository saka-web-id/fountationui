<script setup lang="ts">
import SidebarDashboard from "../../layouts/sidebar/SidebarDashboard.vue";
import HeaderDashboard from "../../layouts/headers/HeaderDashboard.vue";
import NotificationSettingGrid from "../../features/notification/settings/NotificationSettingGrid.vue";
</script>

<template>
  <div id="wrapper">
    <SidebarDashboard />
    <HeaderDashboard />
  </div>
  <NotificationSettingGrid />
</template>

<style scoped>
</style>
