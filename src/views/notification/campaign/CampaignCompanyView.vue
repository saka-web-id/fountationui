<script setup lang="ts">
import CampaignCompanyContent from '~/features/notification/campaign/components/CampaignCompanyContent.vue';
import HeaderDashboard from "~/layouts/headers/HeaderDashboard.vue";
import SidebarDashboard from "~/layouts/sidebar/SidebarDashboard.vue";
</script>

<template>
  <div id="wrapper">
    <SidebarDashboard />
    <HeaderDashboard />
  </div>
  <CampaignCompanyContent />
</template>
