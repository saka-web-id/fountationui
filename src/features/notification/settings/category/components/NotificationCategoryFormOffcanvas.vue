<script setup lang="ts">
import { ref, watch } from 'vue';
import { useNotificationCategoryForm } from '~/features/notification/settings/category/hooks/forms/useNotificationCategoryForm.ts';

const props = defineProps<{
  companyIdParam: number;
  categoryId?: number | null;
}>();

const emit = defineEmits(['success', 'close']);

const {
  name, nameProps,
  description, descriptionProps,
  priority, priorityProps,
  defaultProviderId, defaultProviderIdProps,
  /*retryPolicy, retryPolicyProps,*/
  errors,
  loading,
  submit,
  resetForm,
  fetchDetail,
  fetchProviders,
  providers,
  isEditing
} = useNotificationCategoryForm(props.companyIdParam);

const notificationType = ref('EMAIL');

watch(() => props.categoryId, (newId) => {
  if (newId) {
    fetchDetail(newId);
  } else {
    isEditing.value = false;
    resetForm();
  }
}, { immediate: true });

watch(notificationType, (newType) => {
  fetchProviders(newType);
}, { immediate: true });

const root = ref<HTMLElement | null>(null);

defineExpose({
  root
});

const onFormSubmit = async () => {
  await submit();
  emit('success');
};
</script>

<template>
  <div ref="root" class="offcanvas offcanvas-end bg-dark text-white" tabindex="-1" id="notificationCategoryOffcanvas" aria-labelledby="notificationCategoryOffcanvasLabel">
    <div class="offcanvas-header">
      <h5 id="notificationCategoryOffcanvasLabel">{{ isEditing ? 'Update' : 'Add' }} Notification Category</h5>
      <button type="button" class="btn-close btn-close-white text-reset" data-bs-dismiss="offcanvas" aria-label="Close" @click="$emit('close')"></button>
    </div>
    <div class="offcanvas-body">
      <form @submit.prevent="onFormSubmit">
        <div class="mb-3">
          <label class="form-label">Name</label>
          <input v-model="name" v-bind="nameProps" type="text" class="form-control" :class="{ 'is-invalid': errors.name }" />
          <div class="invalid-feedback">{{ errors.name }}</div>
        </div>

        <div class="mb-3">
          <label class="form-label">Description</label>
          <textarea v-model="description" v-bind="descriptionProps" class="form-control" :class="{ 'is-invalid': errors.description }"></textarea>
          <div class="invalid-feedback">{{ errors.description }}</div>
        </div>

        <div class="mb-3">
          <label class="form-label">Priority</label>
          <input v-model.number="priority" v-bind="priorityProps" type="number" class="form-control" :class="{ 'is-invalid': errors.priority }" />
          <div class="small text-muted">1 = Critical, 5 = Low</div>
          <div class="invalid-feedback">{{ errors.priority }}</div>
        </div>

        <div class="mb-3">
          <label class="form-label">Notification Type</label>
          <select v-model="notificationType" class="form-select">
            <option value="EMAIL">Email</option>
            <option value="SMS">SMS</option>
            <option value="WHATSAPP">WhatsApp</option>
          </select>
        </div>

        <div class="mb-3">
          <label class="form-label">Default Provider</label>
          <select v-model.number="defaultProviderId" v-bind="defaultProviderIdProps" class="form-select" :class="{ 'is-invalid': errors.defaultProviderId }">
            <option value="0">Select Provider</option>
            <option v-for="provider in providers" :key="provider.providerId" :value="provider.providerId">{{ provider.providerName }}</option>
          </select>
          <div class="invalid-feedback">{{ errors.defaultProviderId }}</div>
        </div>

        <div class="mt-4">
          <button type="submit" class="btn btn-primary w-100" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
            {{ isEditing ? 'Update' : 'Save' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
