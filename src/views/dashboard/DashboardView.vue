<script setup lang="ts">

import SidebarDashboard from "../../layouts/sidebar/SidebarDashboard.vue";
import HeaderDashboard from "../../layouts/headers/HeaderDashboard.vue";
import DashboardContent from "../../features/dashboard/components/DashboardContent.vue";
</script>

<template>
  <div id="wrapper">
    <SidebarDashboard />
    <HeaderDashboard />
  </div>
  <DashboardContent />
</template>

<style scoped>

</style>