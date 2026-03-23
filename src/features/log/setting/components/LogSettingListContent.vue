<script setup lang="ts">
import { onMounted, computed, h } from 'vue';
import { useApi } from "~/composables/useApi";
import { useRouter, useRoute } from "vue-router";
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '~/stores/auth'
import { createColumnHelper } from '@tanstack/vue-table'
import { useDataTable } from '~/composables/useDataTable'
import BaseTable from '~/components/table/BaseTable.vue'
import type { LogSetting } from '../types'

const auth = useAuthStore()
const { t } = useI18n();
const { data, get } = useApi<LogSetting[]>();
const router = useRouter();
const route = useRoute();

const settings = computed(() => data.value || [])

const columnHelper = createColumnHelper<LogSetting>()

const columns = [
  columnHelper.accessor('logSettingEndpoint', {
    header: () => t('textLabel.endpoint'),
    cell: info => h('code', info.getValue()),
  }),
  columnHelper.accessor('logSettingMethod', {
    header: () => t('textLabel.method'),
    cell: info => h('span', { class: 'badge bg-secondary' }, info.getValue()),
    meta: { className: 'd-none d-md-table-cell' }
  }),
  columnHelper.accessor('logSettingLogFormat', {
    header: () => t('textLabel.logFormat'),
  }),
  columnHelper.accessor('logSettingEnabled', {
    header: () => t('textLabel.enabled'),
    cell: info => h('span', { class: info.getValue() ? 'text-success' : 'text-danger' }, 
      info.getValue() ? t('textLabel.true') : t('textLabel.false')
    ),
    meta: { className: 'd-none d-md-table-cell' }
  }),
  columnHelper.display({
    id: 'actions',
    header: () => t('textLabel.action'),
    cell: info => h('div', { class: 'btn-group', role: 'group' }, [
      h('button', {
        class: 'btn btn-primary btn-sm',
        onClick: () => goToEdit(info.row.original.logSettingId)
      }, [
        h('i', { class: 'bi bi-pencil-square me-1' }),
        t('button.edit')
      ])
    ]),
  }),
]

const { table, globalFilter } = useDataTable(settings, columns)

onMounted(async () => {
  const companyIdParam = route.params.companyIdParam;
  try {
    if (auth.user && companyIdParam) {
      await get(`/v0/logs/setting/list/companyId/${auth.user.company.companyId}/userId/${auth.user.id}/valueCompanyId/${companyIdParam}`);
    }
  } catch (error) {
    console.error("Fetch failed:", error);
  }
});

const goToEdit = (logSettingIdParam: number) => {
  router.push({ name: 'logsettingedit', params: { companyIdParam: route.params.companyIdParam, logSettingIdParam } });
};

</script>

<template>
  <section class="pt-2 pb-2">
    <div class="container">
      <ol class="breadcrumb ms-2 me-2">
        <li class="breadcrumb-item"><router-link to="/dashboard"><span>{{ t('textLabel.dashboard') }}</span></router-link></li>
        <li class="breadcrumb-item"><router-link to="/logsetting"><span>{{ t('textLabel.logSetting', 2) }}</span></router-link></li>
        <li class="breadcrumb-item active"><span class="active">List</span></li>
      </ol>
      <div class="card mb-3 bg-gradient-dark">
        <div class="card-body ms-0 ps-0 me-0 pe-0 mt-0 pt-0 pb-0">
          <div class="table-responsive pt-2">
            <div class="row d-flex justify-content-between align-items-center me-2 mt-2 mb-2">
              <div class="col-auto">
                <h4 class="ps-0 ps-md-3 fs-5 fs-md-3 ms-2">{{ t('textLabel.logSetting', 2) }}</h4>
              </div>
              <div class="col-auto ms-2">
                <input
                  v-model="globalFilter"
                  type="text"
                  class="form-control"
                  :placeholder="t('button.search') + '...'"
                />
              </div>
            </div>
            <div class="ms-2 me-2 mt-2 mb-2">
              <BaseTable :table="table" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<style scoped>
</style>
