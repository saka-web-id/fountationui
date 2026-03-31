<script setup lang="ts">

import SidebarDashboard from "~/layouts/sidebar/SidebarDashboard.vue"
import HeaderDashboard from "~/layouts/headers/HeaderDashboard.vue"
import WhatappsSettingListContent from "~/features/notification/settings/whatapps/components/WhatappsSettingListContent.vue";

</script>

<template>
  <div id="wrapper">
    <SidebarDashboard />
    <HeaderDashboard />
  </div>
  <WhatappsSettingListContent />
</template>

<style scoped>

</style>