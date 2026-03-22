<script setup lang="ts">
import { onMounted, computed, h } from 'vue';
import { useApi } from "~/composables/useApi";
import { useRouter } from "vue-router";
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '~/stores/auth'
import { createColumnHelper } from '@tanstack/vue-table'
import { useDataTable } from '~/composables/useDataTable'
import BaseTable from '~/components/table/BaseTable.vue'
import type { CompanyLogSetting } from '../types'

const auth = useAuthStore()
const { t } = useI18n();
const { data, get } = useApi<CompanyLogSetting[]>();
const router = useRouter();

const companies = computed(() => data.value || [])

const columnHelper = createColumnHelper<CompanyLogSetting>()

const columns = [
  columnHelper.display({
    id: 'index',
    header: () => t('textLabel.number'),
    cell: info => info.row.index + 1,
    meta: { className: 'd-none d-md-table-cell' }
  }),
  columnHelper.accessor('companyName', {
    header: () => t('textLabel.company', 2),
  }),
  columnHelper.accessor('companyEmail', {
    header: () => t('textField.email'),
    meta: { className: 'd-none d-md-table-cell' }
  }),
  columnHelper.display({
    id: 'actions',
    header: () => t('textLabel.action'),
    cell: info => h('div', { class: 'btn-group', role: 'group' }, [
      h('button', {
        class: 'btn btn-primary btn-sm',
        onClick: () => goToList(info.row.original.companyId)
      }, [
        h('i', { class: 'bi bi-list-check me-1' }),
        t('button.view')
      ])
    ]),
  }),
]

const { table, globalFilter } = useDataTable(companies, columns)

onMounted(async () => {
  if (auth.user) {
    await get('/v0/user/companies/list/companyId/' + auth.user.company.companyId + "/userId/" + auth.user.id);
  }
});

const goToList = (companyIdParam: number) => {
  router.push({ name: 'logsettinglist', params: { companyIdParam } });
};

</script>

<template>
  <section class="pt-2 pb-2">
    <div class="container">
      <ol class="breadcrumb ms-4 me-4">
        <li class="breadcrumb-item"><router-link to="/dashboard"><span>{{ t('textLabel.dashboard') }}</span></router-link></li>
        <li class="breadcrumb-item"><span>{{ t('textLabel.setting') }}</span></li>
        <li class="breadcrumb-item active"><span class="active">{{ t('textLabel.logSetting', 2) }}</span></li>
      </ol>
      <div class="card mb-3 bg-gradient-dark">
        <div class="card-body ms-0 ps-0 me-0 pe-0 mt-0 pt-0 pb-0">
          <div class="table-responsive pt-2">
            <div class="row d-flex justify-content-between align-items-center me-2 mt-2 mb-2">
              <div class="col-auto">
                <h4 class="ps-0 ps-md-3 display-6 fw-bold">{{ t('textLabel.logSetting', 2) }}</h4>
              </div>
              <div class="col-auto">
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
