<script setup lang="ts">
import HeaderMain from "../../layouts/headers/HeaderMain.vue";
import FooterMain from "../../layouts/footer/FooterMain.vue";
import DemoContent from "../../features/demo/components/DemoContent.vue";
</script>

<template>
  <HeaderMain />
  <section class="py-4">
    <div class="container">
      <DemoContent />
      <FooterMain />
    </div>
  </section>
</template>

<style scoped>

</style>