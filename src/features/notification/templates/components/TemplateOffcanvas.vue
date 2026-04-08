<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useTemplateForm } from '../hooks/forms/useTemplateForm';
/*import { useNotificationProviderService } from '~/services/notification/providers/NotificationProviderService';*/
import { useAuthStore } from '~/stores/auth';
import { useApi } from '~/composables/useApi';
import { mapFormToTemplate } from '../api/template.mapper';
/*import type { TemplateDTO } from '../interfaces/template.interface';*/
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  companyId: number;
  templateData?: any;
}>();

const { t } = useI18n()
const emit = defineEmits(['success', 'close']);

const { 
  handleSubmit, 
  setValues, 
  resetForm,
  notiTemplateId,
  notiTemplateProviderId,
  notiTemplateName,
  notiTemplateType,
  notiTemplateSubject,
  notiTemplateContentJson,
  notiTemplateContentCompiled
} = useTemplateForm();

const auth = useAuthStore();
const { data: providers, get: getProviders } = useApi<any[]>();
const { post: addTemplate, put: updateTemplate } = useApi();

const fetchProviders = async () => {
  await getProviders(`/v0/notification/provider/list/companyId/${auth.user?.company.companyId}/userId/${auth.user?.id}/valueCompanyId/${props.companyId}/notificationType/${notiTemplateType.value}`);
};

watch(() => notiTemplateType.value, fetchProviders);

watch(() => props.templateData, (newData) => {
  if (newData) {
    setValues(newData);
  } else {
    resetForm();
    setValues({ notiTemplateCompanyId: props.companyId });
  }
}, { immediate: true });

onMounted(fetchProviders);

const onSubmit = handleSubmit(async (values) => {
  const payload = mapFormToTemplate(values);
  let result;
  if (values.notiTemplateId > 0) {
    result = await updateTemplate(`/v0/notification/templates/update/companyId/${auth.user?.company.companyId}/userId/${auth.user?.id}/templateId/${values.notiTemplateId}`, payload);
  } else {
    result = await addTemplate(`/v0/notification/templates/add/companyId/${auth.user?.company.companyId}/userId/${auth.user?.id}`, payload);
  }

  if (result) {
    emit('success');
    // Close offcanvas logic here if needed, or rely on parent
  }
});

const beautifyJson = () => {
  try {
    const obj = JSON.parse(notiTemplateContentJson.value);
    notiTemplateContentJson.value = JSON.stringify(obj, null, 2);
  } catch (e) {
    alert('Invalid JSON');
  }
};
</script>

<template>
  <div class="offcanvas offcanvas-end" tabindex="-1" id="templateOffcanvas" aria-labelledby="templateOffcanvasLabel" style="width: 500px;">
    <div class="offcanvas-header border-bottom">
      <h5 id="templateOffcanvasLabel">{{ notiTemplateId > 0 ? t('button.edit') : t('button.add') }} {{ t('textLabel.template') }}</h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" @click="$emit('close')"></button>
    </div>
    <div class="offcanvas-body">
      <form @submit.prevent="onSubmit">
        <div class="mb-3">
          <label class="form-label">{{ t('textLabel.name') }}</label>
          <input v-model="notiTemplateName" type="text" class="form-control" required />
        </div>

        <div class="mb-3">
          <label class="form-label">{{ t('textLabel.type') }}</label>
          <select v-model="notiTemplateType" class="form-select">
            <option value="EMAIL">EMAIL</option>
            <option value="SMS">SMS</option>
            <option value="WHATSAPP">WHATSAPP</option>
            <option value="PUSH">PUSH</option>
          </select>
        </div>

        <div class="mb-3">
          <label class="form-label">{{ t('textLabel.provider') }}</label>
          <select v-model="notiTemplateProviderId" class="form-select" required>
            <option v-for="provider in providers" :key="provider.providerId" :value="provider.providerId">
              {{ provider.providerName }} ({{ provider.providerEngine }})
            </option>
          </select>
        </div>

        <div class="mb-3">
          <label class="form-label">{{ t('textLabel.subject') }}</label>
          <input v-model="notiTemplateSubject" type="text" class="form-control" required />
        </div>

        <div class="mb-3">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <label class="form-label mb-0">Content JSON (Properties)</label>
            <button type="button" class="btn btn-sm btn-outline-secondary" @click="beautifyJson">Beautify</button>
          </div>
          <textarea v-model="notiTemplateContentJson" class="form-control font-monospace" rows="8"></textarea>
        </div>

        <div class="mb-3">
          <label class="form-label">Content Compiled (Body Template)</label>
          <textarea v-model="notiTemplateContentCompiled" class="form-control" rows="8"></textarea>
        </div>

        <div class="mt-4 d-grid gap-2">
          <button type="submit" class="btn btn-primary">{{ t('button.save') }}</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="offcanvas">{{ t('button.close') }}</button>
        </div>
      </form>
    </div>
  </div>
</template>
