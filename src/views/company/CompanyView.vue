<script setup lang="ts">

import SidebarDashboard from "../../layouts/sidebar/SidebarDashboard.vue";
import HeaderDashboard from "../../layouts/headers/HeaderDashboard.vue";
import CompanyContent from "../../features/company/components/CompanyContent.vue";
import CompanyModalDelete from "../../features/company/components/CompanyModalDelete.vue";
</script>

<template>
  <CompanyModalDelete />
  <div id="wrapper">
    <SidebarDashboard />
    <HeaderDashboard />
  </div>
  <CompanyContent />
</template>

<style scoped>

</style>