<script setup lang="ts">

import SidebarDashboard from "../../layouts/sidebar/SidebarDashboard.vue";
import HeaderDashboard from "../../layouts/headers/HeaderDashboard.vue";
import ActivityContent from "../../features/activity/components/ActivityContent.vue";
</script>

<template>
  <div id="wrapper">
    <SidebarDashboard />
    <HeaderDashboard />
  </div>
  <ActivityContent />
</template>

<style scoped>

</style>