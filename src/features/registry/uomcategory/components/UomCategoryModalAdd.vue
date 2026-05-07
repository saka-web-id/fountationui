<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import { useUomCategory } from '../hooks/useUomCategory';

const emit = defineEmits(['success']);
const { t } = useI18n();
const { addSingleCategory, loading } = useUomCategory();

const schema = yup.object({
  name: yup.string().required().min(2),
});

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
});

const { value: name, errorMessage: nameError } = useField<string>('name');

const onSubmit = handleSubmit(async (values) => {
  const success = await addSingleCategory({
    registryUomCategoryName: values.name,
  });
  if (success) {
    resetForm();
    emit('success');
    // Hide modal using bootstrap
    const modalElement = document.getElementById('addUomCategoryModal');
    if (modalElement) {
        const bootstrap = (window as any).bootstrap;
        if (bootstrap) {
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal?.hide();
        }
    }
  }
});
</script>

<template>
  <div class="modal fade" id="addUomCategoryModal" tabindex="-1" aria-labelledby="addUomCategoryModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content bg-dark text-white border-secondary">
        <div class="modal-header border-secondary">
          <h5 class="modal-title" id="addUomCategoryModalLabel">{{ t('button.add') }} {{ t('registry.uomCategory') }}</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form @submit="onSubmit">
          <div class="modal-body">
            <div class="mb-3">
              <label for="uomCategoryName" class="form-label">{{ t('registry.uomCategoryName') }}</label>
              <input
                v-model="name"
                type="text"
                class="form-control bg-dark text-white border-secondary"
                id="uomCategoryName"
                :class="{ 'is-invalid': nameError }"
              />
              <div class="invalid-feedback">
                {{ nameError }}
              </div>
            </div>
          </div>
          <div class="modal-footer border-secondary">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ t('button.close') }}</button>
            <button type="submit" class="btn btn-primary" :disabled="loading">
              <span v-if="loading" class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
              {{ loading ? t('button.saving') : t('button.save') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
