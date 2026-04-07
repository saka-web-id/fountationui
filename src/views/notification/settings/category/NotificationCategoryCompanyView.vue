<script setup lang="ts">


import SidebarDashboard from "~/layouts/sidebar/SidebarDashboard.vue"
import HeaderDashboard from "~/layouts/headers/HeaderDashboard.vue"
import NotificationCategoryCompanyContent from "~/features/notification/settings/category/components/NotificationCategoryCompanyContent.vue"

</script>

<template>
  <div id="wrapper">
    <SidebarDashboard />
    <HeaderDashboard />
  </div>
  <NotificationCategoryCompanyContent />
</template>

<style scoped>

</style>