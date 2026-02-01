<script setup lang="ts">

import SidebarDashboard from "../../../layouts/sidebar/SidebarDashboard.vue";
import HeaderDashboard from "../../../layouts/headers/HeaderDashboard.vue";
import BillingCycleContent from "~/features/membership/billing/components/BillingCycleContent.vue";
</script>

<template>
  <div id="wrapper">
    <SidebarDashboard />
    <HeaderDashboard />
  </div>
  <BillingCycleContent />
</template>

<style scoped>

</style>