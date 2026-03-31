<script setup lang="ts">

import SidebarDashboard from "~/layouts/sidebar/SidebarDashboard.vue"
import HeaderDashboard from "~/layouts/headers/HeaderDashboard.vue"
import WhatappsSettingCompanyContent from "~/features/notification/settings/whatapps/components/WhatappsSettingCompanyContent.vue";

</script>

<template>
  <div id="wrapper">
    <SidebarDashboard />
    <HeaderDashboard />
  </div>
  <WhatappsSettingCompanyContent />
</template>

<style scoped>

</style>