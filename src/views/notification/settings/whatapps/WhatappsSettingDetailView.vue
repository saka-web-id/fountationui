<script setup lang="ts">

import SidebarDashboard from "~/layouts/sidebar/SidebarDashboard.vue"
import HeaderDashboard from "~/layouts/headers/HeaderDashboard.vue"
import WhatappsSettingContentEdit from "~/features/notification/settings/whatapps/components/WhatappsSettingContentEdit.vue";

</script>

<template>
  <div id="wrapper">
    <SidebarDashboard />
    <HeaderDashboard />
  </div>
  <WhatappsSettingContentEdit />
</template>

<style scoped>

</style>
