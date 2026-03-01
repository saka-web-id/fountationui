<script setup lang="ts">

import SidebarDashboard from "../../layouts/sidebar/SidebarDashboard.vue";
import HeaderDashboard from "../../layouts/headers/HeaderDashboard.vue";
import UserModalDelete from "../../features/user/components/UserModalDelete.vue";
import UserContent from "../../features/user/components/UserContent.vue";
</script>

<template>
  <UserModalDelete />
  <div id="wrapper">
    <SidebarDashboard />
    <HeaderDashboard />
  </div>
  <UserContent />
</template>

<style scoped>

</style>