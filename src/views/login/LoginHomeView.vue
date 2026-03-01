<script setup lang="ts">
import HeaderMain from "../../layouts/headers/HeaderMain.vue";
import FooterMain from "../../layouts/footer/FooterMain.vue";
import LoginContent from "../../features/login/components/LoginContent.vue";
</script>

<template>
  <HeaderMain />
  <section class="py-4">
    <div class="container">
      <LoginContent />
      <FooterMain />
    </div>
  </section>
</template>

<style scoped>

</style>