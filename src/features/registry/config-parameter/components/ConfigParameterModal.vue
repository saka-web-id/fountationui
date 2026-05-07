<script setup lang="ts">
import { watch } from 'vue';
import { useForm, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { useI18n } from 'vue-i18n';
import { useConfigParameter } from '../hooks/useConfigParameter';
import type { ConfigParameterDTO } from '~/types/registry';
import * as bootstrap from 'bootstrap';

const props = defineProps<{
  initialData: ConfigParameterDTO | null;
}>();

const emit = defineEmits(['success', 'close']);

const { t } = useI18n();
const { addConfigParameter, updateConfigParameter, loading } = useConfigParameter();

const schema = yup.object({
  configParamKey: yup.string().required(t('textLabel.required')),
  configParamValue: yup.string().required(t('textLabel.required')),
});

const { handleSubmit, resetForm, setValues } = useForm({
  validationSchema: schema,
  initialValues: {
    configParamKey: '',
    configParamValue: '',
  }
});

watch(() => props.initialData, (newData) => {
  if (newData) {
    setValues({
      configParamKey: newData.configParamKey,
      configParamValue: newData.configParamValue,
    });
  } else {
    resetForm();
  }
}, { immediate: true });

const onSubmit = handleSubmit(async (values) => {
  let success = false;
  if (props.initialData?.configParamId) {
    success = await updateConfigParameter({
      configParamId: props.initialData.configParamId,
      ...values
    } as ConfigParameterDTO);
  } else {
    success = await addConfigParameter(values as ConfigParameterDTO);
  }

  if (success) {
    emit('success');
    closeModal();
  }
});

const closeModal = () => {
  const modalElement = document.getElementById('configParameterModal');
  if (modalElement) {
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal?.hide();
  }
  emit('close');
};
</script>

<template>
  <div class="modal fade" id="configParameterModal" tabindex="-1" aria-labelledby="configParameterModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content bg-dark text-white border-secondary">
        <div class="modal-header border-secondary">
          <h5 class="modal-title" id="configParameterModalLabel">
            {{ initialData ? t('button.edit') : t('button.add') }} {{ t('registry.configParameter') }}
          </h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" @click="emit('close')"></button>
        </div>
        <form @submit="onSubmit">
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">{{ t('registry.key') }}</label>
              <Field name="configParamKey" type="text" class="form-control bg-dark text-white border-secondary" :placeholder="t('registry.key')" />
              <ErrorMessage name="configParamKey" class="text-danger small" />
            </div>
            <div class="mb-3">
              <label class="form-label">{{ t('registry.value') }}</label>
              <Field name="configParamValue" type="text" class="form-control bg-dark text-white border-secondary" :placeholder="t('registry.value')" />
              <ErrorMessage name="configParamValue" class="text-danger small" />
            </div>
          </div>
          <div class="modal-footer border-secondary">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="emit('close')">{{ t('button.close') }}</button>
            <button type="submit" class="btn btn-primary" :disabled="loading">
              <i v-if="loading" class="spinner-border spinner-border-sm me-1"></i>
              {{ t('button.save') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
