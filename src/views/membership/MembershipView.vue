<script setup lang="ts">

import SidebarDashboard from "../../layouts/sidebar/SidebarDashboard.vue";
import HeaderDashboard from "../../layouts/headers/HeaderDashboard.vue";
import MembershipContent from "../../features/membership/components/MembershipContent.vue";
import MembershipModalDelete from "../../features/membership/components/MembershipModalDelete.vue";
</script>

<template>
  <MembershipModalDelete />
  <div id="wrapper">
    <SidebarDashboard />
    <HeaderDashboard />
  </div>
  <MembershipContent />
</template>

<style scoped>

</style>