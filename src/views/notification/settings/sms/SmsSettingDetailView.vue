<script setup lang="ts">

import SidebarDashboard from "~/layouts/sidebar/SidebarDashboard.vue"
import HeaderDashboard from "~/layouts/headers/HeaderDashboard.vue"
import SmsSettingCompanyContent from "~/features/notification/settings/sms/components/SmsSettingCompanyContent.vue";

</script>

<template>
  <div id="wrapper">
    <SidebarDashboard />
    <HeaderDashboard />
  </div>
  <SmsSettingCompanyContent />
</template>

<style scoped>

</style>