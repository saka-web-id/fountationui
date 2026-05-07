<script setup lang="ts">
import RepoSequenceCompanyContent from '~/features/registry/repo-sequence/components/RepoSequenceCompanyContent.vue';
import HeaderDashboard from "~/layouts/headers/HeaderDashboard.vue";
import SidebarDashboard from "~/layouts/sidebar/SidebarDashboard.vue";
</script>

<template>
  <div id="wrapper">
    <SidebarDashboard />
    <HeaderDashboard />
  </div>
  <RepoSequenceCompanyContent />
</template>
