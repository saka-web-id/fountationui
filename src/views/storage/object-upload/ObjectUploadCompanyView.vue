<script setup lang="ts">
import SidebarDashboard from "~/layouts/sidebar/SidebarDashboard.vue";
import HeaderDashboard from "~/layouts/headers/HeaderDashboard.vue";
import ObjectUploadCompanyContent from "~/features/storage/object-upload/components/ObjectUploadCompanyContent.vue";
</script>

<template>
  <div id="wrapper">
    <SidebarDashboard />
    <HeaderDashboard />
  </div>
  <ObjectUploadCompanyContent />
</template>

<style scoped>
</style>
