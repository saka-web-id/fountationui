<script setup lang="ts">


import SidebarDashboard from "~/layouts/sidebar/SidebarDashboard.vue"
import HeaderDashboard from "~/layouts/headers/HeaderDashboard.vue"
import EmailSettingContentEdit from "~/features/notification/settings/email/components/EmailSettingContentEdit.vue";

</script>

<template>
  <div id="wrapper">
    <SidebarDashboard />
    <HeaderDashboard />
  </div>
  <EmailSettingContentEdit />
</template>

<style scoped>

</style>