<script setup lang="ts">

import SidebarDashboard from "~/layouts/sidebar/SidebarDashboard.vue"
import HeaderDashboard from "~/layouts/headers/HeaderDashboard.vue"
import SmsSettingListContent from "~/features/notification/settings/sms/components/SmsSettingListContent.vue";

</script>

<template>
  <div id="wrapper">
    <SidebarDashboard />
    <HeaderDashboard />
  </div>
  <SmsSettingListContent />
</template>

<style scoped>

</style>