<script setup lang="ts">
import { useRoute } from 'vue-router';
import RepoSequenceContent from '~/features/registry/repo-sequence/components/RepoSequenceContent.vue';
import HeaderDashboard from "~/layouts/headers/HeaderDashboard.vue";
import SidebarDashboard from "~/layouts/sidebar/SidebarDashboard.vue";

const route = useRoute();
const valueCompanyId = Number(route.params.valueCompanyId);
</script>

<template>
  <div id="wrapper">
    <SidebarDashboard />
    <HeaderDashboard />
  </div>
  <RepoSequenceContent :value-company-id="valueCompanyId" />
</template>
