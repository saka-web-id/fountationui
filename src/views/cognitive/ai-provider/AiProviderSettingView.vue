<script setup lang="ts">
import SidebarDashboard from "~/layouts/sidebar/SidebarDashboard.vue";
import HeaderDashboard from "~/layouts/headers/HeaderDashboard.vue";
import AiProviderGrid from "~/features/cognitive/ai-provider/components/AiProviderGrid.vue";
</script>

<template>
  <div id="wrapper">
    <SidebarDashboard />
    <HeaderDashboard />
  </div>
  <AiProviderGrid />
</template>

<style scoped>
</style>
