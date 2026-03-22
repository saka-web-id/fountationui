<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useApi } from "~/composables/useApi";
import { onMounted, computed, h } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from '~/stores/auth'
import { createColumnHelper } from '@tanstack/vue-table'
import { useDataTable } from '~/composables/useDataTable'
import BaseTable from '~/components/table/BaseTable.vue'
import type { Permission } from '../types'

const auth = useAuthStore()
const { data, get } = useApi<Permission[]>();
const { t } = useI18n();
const router = useRouter();

const permissions = computed(() => data.value || [])

const columnHelper = createColumnHelper<Permission>()

const columns = [
  columnHelper.accessor('permissionName', {
    header: () => t('textLabel.name'),
    cell: info => h('span', { class: 'fw-bold' }, info.getValue()),
  }),
  columnHelper.accessor('permissionResource', {
    header: () => t('textLabel.resource'),
    cell: info => h('code', info.getValue()),
    meta: { className: 'd-none d-md-table-cell' }
  }),
  columnHelper.accessor('permissionAction', {
    header: () => t('textLabel.action'),
    cell: info => h('span', { class: 'badge bg-secondary' }, info.getValue()),
    meta: { className: 'd-none d-md-table-cell' }
  }),
  columnHelper.accessor('permissionDescription', {
    header: () => h('span', { class: 'd-none d-md-inline' }, t('textLabel.description')),
    cell: info => h('span', { class: 'd-none d-md-inline' }, info.getValue()),
    meta: { className: 'd-none d-md-table-cell' }
  }),
  columnHelper.display({
    id: 'actions',
    header: () => t('textLabel.action'),
    cell: info => h('div', { class: 'btn-group', role: 'group' }, [
      h('button', {
        class: 'btn btn-primary btn-sm',
        onClick: () => router.push({ name: 'permissionedit', params: { permissionIdParam: info.row.original.permissionId } })
      }, [
        h('i', { class: 'bi bi-pencil-square me-1' }),
        t('button.edit')
      ])
    ]),
  }),
]

const { table, globalFilter } = useDataTable(permissions, columns, {
  initialState: {
    sorting: [{ id: 'permissionName', desc: false }]
  }
})

onMounted(async () => {
  await get('/v0/authorization/permission/list/companyId/' + auth.user?.company.companyId + "/userId/" + auth.user?.id);
});

</script>

<template>
  <section class="pt-2 pb-2">
    <div class="container">
      <ol class="breadcrumb ms-4">
        <li class="breadcrumb-item"><router-link to="/dashboard"><span>{{ t('textLabel.dashboard') }}</span></router-link></li>
        <li class="breadcrumb-item active"><span class="active">{{ t('textLabel.permission', 2) }}</span></li>
      </ol>
      <div class="card mb-3 bg-gradient-dark">
        <div class="table-responsive pt-2">
          <div class="row d-flex justify-content-between align-items-center me-2 mt-2 mb-2">
            <div class="col-auto">
              <h3 class="ps-0 ps-md-3 display-6 fw-bold">{{ t('textLabel.permission', 2) }}</h3>
            </div>
            <div class="col-auto d-flex gap-2">
              <input
                v-model="globalFilter"
                type="text"
                class="form-control"
                :placeholder="t('button.search') + '...'"
              />
              <button @click="router.push({ name: 'permissionadd' })" class="btn btn-outline-primary text-nowrap" type="button">{{ t('button.add') }}</button>
            </div>
          </div>
          <div class="ms-2 me-2 mt-2 mb-2">
            <BaseTable :table="table" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

