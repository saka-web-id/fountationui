<script setup lang="ts">
import SidebarDashboard from "~/layouts/sidebar/SidebarDashboard.vue";
import HeaderDashboard from "~/layouts/headers/HeaderDashboard.vue";
import LanguageContent from "~/features/registry/language/components/LanguageContent.vue";
</script>

<template>
  <div id="wrapper">
    <SidebarDashboard />
    <HeaderDashboard />
  </div>
  <LanguageContent />
</template>

<style scoped>
</style>
