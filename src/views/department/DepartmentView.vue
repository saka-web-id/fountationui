<script setup lang="ts">

import SidebarDashboard from "../../layouts/sidebar/SidebarDashboard.vue";
import HeaderDashboard from "../../layouts/headers/HeaderDashboard.vue";
import DepartmentContent from "../../features/department/components/DepartmentContent.vue";
import DepartmentModalDelete from "../../features/department/components/DepartmentModalDelete.vue";
</script>

<template>
  <DepartmentModalDelete />
  <div id="wrapper">
    <SidebarDashboard />
    <HeaderDashboard />
  </div>
  <DepartmentContent />
</template>

<style scoped>

</style>