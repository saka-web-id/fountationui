<script setup lang="ts">

import SidebarDashboard from "../../layouts/sidebar/SidebarDashboard.vue";
import HeaderDashboard from "../../layouts/headers/HeaderDashboard.vue";
import UserPasswordContentEdit from "../../features/user/components/UserPasswordContentEdit.vue";
</script>

<template>
  <div id="wrapper">
    <SidebarDashboard />
    <HeaderDashboard />
  </div>
  <UserPasswordContentEdit />
</template>

<style scoped>

</style>