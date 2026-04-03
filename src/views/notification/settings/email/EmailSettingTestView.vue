<script setup lang="ts">
import SidebarDashboard from "~/layouts/sidebar/SidebarDashboard.vue"
import HeaderDashboard from "~/layouts/headers/HeaderDashboard.vue"
import EmailSettingTestContent from "~/features/notification/settings/email/components/EmailSettingTestContent.vue";

</script>

<template>
  <div id="wrapper">
    <SidebarDashboard />
    <HeaderDashboard />
  </div>
  <EmailSettingTestContent />
</template>

<style scoped>

</style>