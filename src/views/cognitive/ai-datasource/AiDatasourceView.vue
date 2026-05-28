<script setup lang="ts">
import SidebarDashboard from "~/layouts/sidebar/SidebarDashboard.vue";
import HeaderDashboard from "~/layouts/headers/HeaderDashboard.vue";
import AiDatasourceContent from "~/features/cognitive/ai-datasource/components/AiDatasourceContent.vue";
import { useRoute } from 'vue-router';

const route = useRoute();
const valueCompanyId = route.params.valueCompanyId as string;
</script>

<template>
  <div id="wrapper">
    <SidebarDashboard />
    <HeaderDashboard />
  </div>
  <AiDatasourceContent :value-company-id="valueCompanyId" />
</template>

<style scoped>
</style>
