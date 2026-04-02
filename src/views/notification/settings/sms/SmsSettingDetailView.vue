<script setup lang="ts">

import SidebarDashboard from "~/layouts/sidebar/SidebarDashboard.vue"
import HeaderDashboard from "~/layouts/headers/HeaderDashboard.vue"
import SmsSettingContentEdit from "~/features/notification/settings/sms/components/SmsSettingContentEdit.vue";

</script>

<template>
  <div id="wrapper">
    <SidebarDashboard />
    <HeaderDashboard />
  </div>
  <SmsSettingContentEdit />
</template>

<style scoped>

</style>
