<script setup lang="ts">
import SidebarDashboard from "~/layouts/sidebar/SidebarDashboard.vue";
import HeaderDashboard from "~/layouts/headers/HeaderDashboard.vue";
import LogSettingContent from "~/features/log/setting/components/LogSettingContent.vue";
</script>

<template>
  <div id="wrapper">
    <SidebarDashboard />
    <div class="d-flex flex-column" id="content-wrapper">
      <div id="content">
        <HeaderDashboard />
        <LogSettingContent />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
