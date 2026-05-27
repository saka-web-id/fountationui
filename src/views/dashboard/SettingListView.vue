<script setup lang="ts">
import SidebarDashboard from "../../layouts/sidebar/SidebarDashboard.vue";
import HeaderDashboard from "../../layouts/headers/HeaderDashboard.vue";
import SettingListGrid from "../../features/dashboard/components/SettingListGrid.vue";
</script>

<template>
  <div id="wrapper">
    <SidebarDashboard />
    <HeaderDashboard />
  </div>
  <SettingListGrid />
</template>

<style scoped>
</style>
