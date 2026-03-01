<script setup lang="ts">

import SidebarDashboard from "../../layouts/sidebar/SidebarDashboard.vue";
import HeaderDashboard from "../../layouts/headers/HeaderDashboard.vue";
import OauthContent from "../../features/oauth/OauthContent.vue";
import OauthModalEdit from "../../features/oauth/OauthModalEdit.vue";
import OauthModalDelete from "../../features/oauth/OauthModalDelete.vue";
</script>

<template>
  <OauthModalEdit />
  <OauthModalDelete />
  <div id="wrapper">
    <SidebarDashboard />
    <HeaderDashboard />
  </div>
  <OauthContent />
</template>

<style scoped>

</style>