<script setup lang="ts">
import HeaderMain from "../../layouts/headers/HeaderMain.vue";
import FooterMain from "../../layouts/footer/FooterMain.vue";
import HowToUseContent from "../../features/howtouse/components/HowToUseContent.vue";
</script>

<template>
  <HeaderMain />
  <section class="py-4">
    <div class="container">
      <HowToUseContent />
      <FooterMain />
    </div>
  </section>
</template>

<style scoped>

</style>