<script setup lang="ts">

import SidebarDashboard from "../../../layouts/sidebar/SidebarDashboard.vue";
import HeaderDashboard from "../../../layouts/headers/HeaderDashboard.vue";
import UserAccountContentEdit from "../../../features/user/account/components/UserAccountContentEdit.vue";
</script>

<template>
  <div id="wrapper">
    <SidebarDashboard />
    <HeaderDashboard />
  </div>
  <UserAccountContentEdit />
</template>

<style scoped>

</style>