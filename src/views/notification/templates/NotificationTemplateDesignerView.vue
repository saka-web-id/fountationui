<script setup lang="ts">
import { useRoute } from 'vue-router';
import TemplateDesignerContent from '~/features/notification/templates/components/TemplateDesignerContent.vue';

const route = useRoute();
const templateId = Number(route.params.templateId);
</script>

<template>
  <TemplateDesignerContent :templateId="templateId" />
</template>

<style scoped>
</style>
