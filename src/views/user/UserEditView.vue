<script setup lang="ts">

import SidebarDashboard from "../../layouts/sidebar/SidebarDashboard.vue";
import HeaderDashboard from "../../layouts/headers/HeaderDashboard.vue";
import UserContentEdit from "../../features/user/components/UserContentEdit.vue";
</script>

<template>
  <div id="wrapper">
    <SidebarDashboard />
    <HeaderDashboard />
  </div>
  <UserContentEdit />
</template>

<style scoped>

</style>