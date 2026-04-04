<script setup lang="ts">
import SidebarDashboard from "~/layouts/sidebar/SidebarDashboard.vue"
import HeaderDashboard from "~/layouts/headers/HeaderDashboard.vue"
import SmsSettingTestContent from "~/features/notification/settings/sms/components/SmsSettingTestContent.vue";

</script>

<template>
  <div id="wrapper">
    <SidebarDashboard />
    <HeaderDashboard />
  </div>
  <SmsSettingTestContent />
</template>

<style scoped>

</style>
