<script setup lang="ts">

import SidebarDashboard from "../../layouts/sidebar/SidebarDashboard.vue";
import HeaderDashboard from "../../layouts/headers/HeaderDashboard.vue";
import CompanyContentEdit from "../../features/company/components/CompanyContentEdit.vue";
</script>

<template>
  <div id="wrapper">
    <SidebarDashboard />
    <HeaderDashboard />
  </div>
  <CompanyContentEdit />
</template>

<style scoped>

</style>