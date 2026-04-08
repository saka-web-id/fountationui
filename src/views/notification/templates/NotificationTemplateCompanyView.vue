<script setup lang="ts">
import SidebarDashboard from "~/layouts/sidebar/SidebarDashboard.vue"
import HeaderDashboard from "~/layouts/headers/HeaderDashboard.vue"
import TemplateCompanyContent from "~/features/notification/templates/components/TemplateCompanyContent.vue"
</script>

<template>
  <div id="wrapper">
    <SidebarDashboard />
    <div id="content-wrapper" class="d-flex flex-column">
      <div id="content">
        <HeaderDashboard />
        <TemplateCompanyContent />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>