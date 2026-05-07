<script setup lang="ts">
import { watch } from 'vue';
import { useForm, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { useI18n } from 'vue-i18n';
import { useRepoSequence } from '../hooks/useRepoSequence';
import type { RepoSequenceDTO } from '~/types/registry';
import * as bootstrap from 'bootstrap';

const props = defineProps<{
  initialData: RepoSequenceDTO | null;
  valueCompanyId: number;
}>();

const emit = defineEmits(['success', 'close']);

const { t } = useI18n();
const { addRepoSequence, updateRepoSequence, loading } = useRepoSequence();

const schema = yup.object({
  repoSequenceCode: yup.string().required(t('textLabel.required')),
  repoSequenceName: yup.string().required(t('textLabel.required')),
  repoSequencePrefix: yup.string().nullable(),
  repoSequenceSuffix: yup.string().nullable(),
  repoSequencePadding: yup.number().required(t('textLabel.required')).min(0),
  repoSequenceNextNumber: yup.number().required(t('textLabel.required')).min(0),
});

const { handleSubmit, resetForm, setValues } = useForm({
  validationSchema: schema,
  initialValues: {
    repoSequenceCode: '',
    repoSequenceName: '',
    repoSequencePrefix: '',
    repoSequenceSuffix: '',
    repoSequencePadding: 0,
    repoSequenceNextNumber: 1,
  }
});

watch(() => props.initialData, (newData) => {
  if (newData) {
    setValues({
      repoSequenceCode: newData.repoSequenceCode,
      repoSequenceName: newData.repoSequenceName,
      repoSequencePrefix: newData.repoSequencePrefix || '',
      repoSequenceSuffix: newData.repoSequenceSuffix || '',
      repoSequencePadding: newData.repoSequencePadding,
      repoSequenceNextNumber: newData.repoSequenceNextNumber,
    });
  } else {
    resetForm();
  }
}, { immediate: true });

const onSubmit = handleSubmit(async (values) => {
  let success = false;
  const payload = {
    ...values,
    repoSequenceCompanyId: props.valueCompanyId
  } as RepoSequenceDTO;

  if (props.initialData?.repoSequenceId) {
    payload.repoSequenceId = props.initialData.repoSequenceId;
    success = await updateRepoSequence(props.valueCompanyId, payload);
  } else {
    success = await addRepoSequence(props.valueCompanyId, payload);
  }

  if (success) {
    emit('success');
    closeModal();
  }
});

const closeModal = () => {
  const modalElement = document.getElementById('repoSequenceModal');
  if (modalElement) {
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal?.hide();
  }
  emit('close');
};
</script>

<template>
  <div class="modal fade" id="repoSequenceModal" tabindex="-1" aria-labelledby="repoSequenceModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content bg-dark text-white border-secondary">
        <div class="modal-header border-secondary">
          <h5 class="modal-title" id="repoSequenceModalLabel">
            {{ initialData ? t('button.edit') : t('button.add') }} {{ t('registry.repoSequence') }}
          </h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" @click="emit('close')"></button>
        </div>
        <form @submit="onSubmit">
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">{{ t('registry.code') }}</label>
              <Field name="repoSequenceCode" type="text" class="form-control bg-dark text-white border-secondary" :placeholder="t('registry.code')" />
              <ErrorMessage name="repoSequenceCode" class="text-danger small" />
            </div>
            <div class="mb-3">
              <label class="form-label">{{ t('registry.name') }}</label>
              <Field name="repoSequenceName" type="text" class="form-control bg-dark text-white border-secondary" :placeholder="t('registry.name')" />
              <ErrorMessage name="repoSequenceName" class="text-danger small" />
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">{{ t('registry.prefix') }}</label>
                <Field name="repoSequencePrefix" type="text" class="form-control bg-dark text-white border-secondary" :placeholder="t('registry.prefix')" />
                <ErrorMessage name="repoSequencePrefix" class="text-danger small" />
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">{{ t('registry.suffix') }}</label>
                <Field name="repoSequenceSuffix" type="text" class="form-control bg-dark text-white border-secondary" :placeholder="t('registry.suffix')" />
                <ErrorMessage name="repoSequenceSuffix" class="text-danger small" />
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">{{ t('registry.padding') }}</label>
                <Field name="repoSequencePadding" type="number" class="form-control bg-dark text-white border-secondary" />
                <ErrorMessage name="repoSequencePadding" class="text-danger small" />
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">{{ t('registry.nextNumber') }}</label>
                <Field name="repoSequenceNextNumber" type="number" class="form-control bg-dark text-white border-secondary" />
                <ErrorMessage name="repoSequenceNextNumber" class="text-danger small" />
              </div>
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
