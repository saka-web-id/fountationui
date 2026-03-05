<script setup lang="ts">
import SidebarDashboard from "~/layouts/sidebar/SidebarDashboard.vue";
import HeaderDashboard from "~/layouts/headers/HeaderDashboard.vue";
import LogSettingListContent from "~/features/log/setting/components/LogSettingListContent.vue";
</script>

<template>
  <div id="wrapper">
    <SidebarDashboard />
    <div class="d-flex flex-column" id="content-wrapper">
      <div id="content">
        <HeaderDashboard />
        <LogSettingListContent />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
