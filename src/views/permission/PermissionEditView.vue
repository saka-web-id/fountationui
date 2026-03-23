<script setup lang="ts">
import PermissionContentEdit from "~/features/permission/components/PermissionContentEdit.vue";
import HeaderDashboard from "~/layouts/headers/HeaderDashboard.vue";
import SidebarDashboard from "~/layouts/sidebar/SidebarDashboard.vue";
</script>


<template>
  <div id="wrapper">
    <SidebarDashboard />
    <HeaderDashboard />
  </div>
  <PermissionContentEdit />
</template>
