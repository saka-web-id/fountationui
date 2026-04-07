<script setup lang="ts">


import SidebarDashboard from "~/layouts/sidebar/SidebarDashboard.vue"
import HeaderDashboard from "~/layouts/headers/HeaderDashboard.vue"
import NotificationCategoryListContent from "~/features/notification/settings/category/components/NotificationCategoryListContent.vue"

</script>

<template>
  <div id="wrapper">
    <SidebarDashboard />
    <HeaderDashboard />
  </div>
  <NotificationCategoryListContent />
</template>

<style scoped>

</style>