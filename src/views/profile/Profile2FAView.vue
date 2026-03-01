<script setup lang="ts">

import SidebarDashboard from "../../layouts/sidebar/SidebarDashboard.vue";
import HeaderDashboard from "../../layouts/headers/HeaderDashboard.vue";
/*import Profile2FAContent from "../../features/profile/components/Profile2FAContent.vue";*/
// @ts-ignore
import Profile2FAContent from "../../features/profile/components/Profile2FAContent.vue";
</script>

<template>
  <div id="wrapper">
    <SidebarDashboard />
    <HeaderDashboard />
  </div>
  <Profile2FAContent />
</template>

<style scoped>

</style>