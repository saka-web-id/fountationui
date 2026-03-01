<script setup lang="ts">
import HeaderMain from "../../layouts/headers/HeaderMain.vue";
import FooterMain from "../../layouts/footer/FooterMain.vue";
import RegistrationContent from "../../features/registration/components/RegistrationContent.vue";
</script>

<template>
  <HeaderMain />
  <section class="py-4">
    <div class="container">
      <RegistrationContent />
      <FooterMain />
    </div>
  </section>
</template>

<style scoped>

</style>