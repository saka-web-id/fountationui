<script setup lang="ts">
import SidebarDashboard from "~/layouts/sidebar/SidebarDashboard.vue";
import HeaderDashboard from "~/layouts/headers/HeaderDashboard.vue";
import AiDatasourceCompanyFilter from "~/features/cognitive/ai-datasource/components/AiDatasourceCompanyFilter.vue";
</script>

<template>
  <div id="wrapper">
    <SidebarDashboard />
    <HeaderDashboard />
  </div>
  <AiDatasourceCompanyFilter />
</template>

<style scoped>
</style>
