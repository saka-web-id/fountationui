<script setup lang="ts">


import SidebarDashboard from "~/layouts/sidebar/SidebarDashboard.vue"
import HeaderDashboard from "~/layouts/headers/HeaderDashboard.vue"
import EmailSettingCompanyContent from "~/features/notification/settings/email/components/EmailSettingCompanyContent.vue";

</script>

<template>
  <div id="wrapper">
    <SidebarDashboard />
    <HeaderDashboard />
  </div>
  <EmailSettingCompanyContent />
</template>

<style scoped>

</style>