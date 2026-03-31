<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useApi } from "~/composables/useApi";
import { computed, onMounted, ref, h } from "vue";
import { useRoute } from 'vue-router';
import { ErrorMessage, Field, Form } from "vee-validate";
import { useProviderSchema } from '../hooks/schemas/provider.schema';
import {
  useProviderPayload,
  type ProviderPayload,
  mapProviderFormFromApi
} from "../hooks/forms/useEmailSettingForm";
/*import { useAuthStore } from '~/stores/auth'*/
import { createColumnHelper } from '@tanstack/vue-table'
import { useDataTable } from '~/composables/useDataTable'
import BaseTable from '~/components/table/BaseTable.vue'

/*const auth = useAuthStore()*/
const { t } = useI18n();
const route = useRoute();

// Ambil payload helpers
const {
  setValues: setValuesProvider,
  handleSubmit,
  /*values // Berisi semua field termasuk providerConfigs*/
} = useProviderPayload();

const { providerIdParam } = route.params;
const isEdit = computed(() => !!providerIdParam);

const { data, loading, get, post } = useApi();
/*const { data: configData, get: getConfigList } = useApi();*/

// Data untuk tabel config (Child)
const configsForm = ref<any[]>([]);

const columnHelper = createColumnHelper<any>()

const columns = [
  columnHelper.accessor('providerConfigKey', {
    header: () => t('textLabel.key'),
    cell: info => h('span', info.getValue()),
  }),
  columnHelper.accessor('providerConfigValue', {
    header: () => t('textLabel.value'),
    cell: info => h(Field, {
      name: `providerConfigs[${info.row.index}].providerConfigValue`,
      as: 'input',
      class: 'form-control form-control-sm',
      modelValue: info.row.original.providerConfigValue
    }),
  }),
  columnHelper.accessor('providerConfigIsSecret', {
    header: () => t('textLabel.secret'),
    cell: info => h('input', {
      type: 'checkbox',
      checked: info.getValue(),
      disabled: true // Biasanya secret ditentukan di level schema/backend
    }),
  })
]

const { table, globalFilter } = useDataTable(configsForm, columns)

onMounted(async () => {
  // 1. Ambil data provider jika mode EDIT
  if (isEdit.value) {
    await get(`/v0/notification/provider/detail/${providerIdParam}`);
    if (data.value) {
      const mappedData = mapProviderFormFromApi(data.value);
      setValuesProvider(mappedData);
      configsForm.value = mappedData.providerConfigs || [];
    }
  }
});

const submitForm = handleSubmit(async (values: ProviderPayload) => {
  const url = isEdit.value
      ? `/v0/notification/provider/update/${providerIdParam}`
      : `/v0/notification/provider/add`;

  await post(url, values);
});
</script>

<template>
  <section class="pt-2 pb-2">
    <div class="container">
      <ol class="breadcrumb ms-4">
        <li class="breadcrumb-item"><router-link to="/dashboard">{{ t('textLabel.dashboard') }}</router-link></li>
        <li class="breadcrumb-item">
          <router-link :to="{ name: 'notification-providers' }">
            {{ t('textLabel.provider', 2) }}
          </router-link>
        </li>
        <li class="breadcrumb-item active">{{ isEdit ? t('button.edit') : t('button.add') }}</li>
      </ol>

      <div class="card mb-3 bg-gradient-dark">
        <div class="card-body p-4">
          <Form :validation-schema="useProviderSchema" v-slot="{ meta }">
            <h4 class="mb-4">{{ isEdit ? 'Edit Provider' : 'Add New Provider' }}</h4>

            <div class="row mb-3">
              <div class="col-md-6">
                <div class="input-group mb-2">
                  <span class="input-group-text w-25">Name</span>
                  <Field name="providerName" as="input" class="form-control" />
                </div>
                <ErrorMessage name="providerName" class="text-danger small" />
              </div>

              <div class="col-md-6">
                <div class="input-group mb-2">
                  <span class="input-group-text w-25">Type</span>
                  <Field name="providerType" as="select" class="form-select">
                    <option value="EMAIL">Email</option>
                    <option value="WHATSAPP">WhatsApp</option>
                    <option value="SMS">SMS</option>
                  </Field>
                </div>
              </div>
            </div>

            <div class="mt-4">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <h5>Configurations</h5>
                <input v-model="globalFilter" type="text" class="form-control w-25" :placeholder="t('button.search')" />
              </div>
              <BaseTable :table="table" />
            </div>

            <div class="mt-4">
              <button
                  :disabled="!meta.valid || loading"
                  class="btn btn-primary me-2"
                  @click="submitForm"
                  type="button"
              >
                {{ loading ? t('button.saving') : t('button.save') }}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </section>
</template>