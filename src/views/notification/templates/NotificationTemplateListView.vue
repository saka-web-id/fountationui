<script setup lang="ts">
import { useRoute } from 'vue-router';
import SidebarDashboard from "~/layouts/sidebar/SidebarDashboard.vue"
import HeaderDashboard from "~/layouts/headers/HeaderDashboard.vue"
import TemplateList from "~/features/notification/templates/components/TemplateList.vue"

const route = useRoute();
const companyId = Number(route.params.companyId);
</script>

<template>
  <div id="wrapper">
    <SidebarDashboard />
    <HeaderDashboard />
    <div id="content-wrapper" class="d-flex flex-column">
      <div id="content">
        <div class="container-fluid">
          <TemplateList :company-id="companyId" />
        </div>
      </div>
    </div>
  </div>
</template>
