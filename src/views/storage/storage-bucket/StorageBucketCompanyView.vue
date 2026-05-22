<script setup lang="ts">
import SidebarDashboard from "~/layouts/sidebar/SidebarDashboard.vue";
import HeaderDashboard from "~/layouts/headers/HeaderDashboard.vue";
import StorageBucketCompanyContent from "~/features/storage/storage-bucket/components/StorageBucketCompanyContent.vue";
</script>

<template>
  <div id="wrapper">
    <SidebarDashboard />
    <HeaderDashboard />
  </div>
  <StorageBucketCompanyContent />
</template>

<style scoped>
</style>
