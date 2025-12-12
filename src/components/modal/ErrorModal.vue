<script setup lang="ts">
defineProps<{
  show: boolean
  message: string | null
}>()

defineEmits(['close'])
</script>

<template>
  <div v-if="show" class="modal-backdrop">
    <div class="modal">
      <div class="modal-dialog">
        <div class="modal-content p-4">
          <h2>Error</h2>
          <p>{{ message }}</p>
          <button class="btn btn-primary" @click="$emit('close')">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9998;
}

.modal {
  display: flex !important; /* ✅ force it to show */
  background: rgba(255, 253, 253, 0);
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  z-index: 9999; /* ✅ ensure modal is above backdrop */
  position: relative; /* ✅ required for z-index to work */
}
</style>
