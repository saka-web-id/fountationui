<script setup lang="ts">
import HeaderMain from "../../layouts/headers/HeaderMain.vue";
import FooterMain from "../../layouts/footer/FooterMain.vue";
import HomeContent from "../../features/error/components/UnauthorizedContent.vue";
</script>

<template>
  <HeaderMain />
  <section>
    <div class="container py-4 py-lg-5">
      <HomeContent />
      <FooterMain />
    </div>
  </section>
</template>

<style scoped>

</style>