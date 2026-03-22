<script setup lang="ts">
import { onMounted, computed, h } from 'vue';
import { useApi } from "~/composables/useApi";
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/auth'
import { createColumnHelper } from '@tanstack/vue-table'
import { useDataTable } from '~/composables/useDataTable'
import BaseTable from '~/components/table/BaseTable.vue'
import type { Department } from '../types'

const auth = useAuthStore()
const { data, get } = useApi<Department[]>();
const { data: companyData, get: getCompany } = useApi();
const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const { companyId } = route.params;

const departments = computed(() => data.value || [])

const columnHelper = createColumnHelper<Department>()

const columns = [
  columnHelper.accessor('departmentId', {
    header: () => h('span', { class: 'd-none d-md-inline' }, t('textLabel.number')),
    cell: info => h('span', { class: 'd-none d-md-inline' }, info.getValue()),
    meta: { className: 'd-none d-md-table-cell' }
  }),
  columnHelper.accessor('departmentName', {
    header: () => t('textLabel.department', 2),
  }),
  columnHelper.accessor('departmentDescription', {
    header: () => h('span', { class: 'd-none d-md-inline' }, t('textLabel.description')),
    cell: info => h('span', { class: 'd-none d-md-inline' }, info.getValue()),
    meta: { className: 'd-none d-md-table-cell' }
  }),
  columnHelper.display({
    id: 'actions',
    header: () => t('textLabel.action'),
    cell: info => h('div', { class: 'btn-group', role: 'group' }, [
      h('button', {
        class: 'btn btn-primary',
        onClick: () => goToEdit(info.row.original.companyId, info.row.original.departmentId)
      }, t('button.edit')),
      h('button', {
        class: 'btn btn-info',
        onClick: () => goToUsers(info.row.original.companyId, info.row.original.departmentId)
      }, t('textLabel.user', 2))
    ]),
  }),
]

const { table, globalFilter } = useDataTable(departments, columns)

onMounted(async () => {
  await getCompany('/v0/user/organization/company/detail/companyId/' + companyId + '/userId/' + auth.user?.id);
  await get('/v0/user/organization/department/list/companyId/' + companyId + "/userId/" + auth.user?.id)
});

const goToEdit = (paramCompanyId: number, paramDepartmentId: number) => {

  router.push({ name: 'departmentedit', params: { paramCompanyId, paramDepartmentId } });
};

const goToUsers = (companyId: number, departmentId: number) => {

  router.push({ name: 'departmentusers', params: { companyIdParam: companyId, departmentIdParam: departmentId } });
}

</script>

<template>
  <section class="pt-2 pb-2">

    <div class="container">
      <ol class="breadcrumb ms-4 me-4">
        <li class="breadcrumb-item"><router-link to="/dashboard"><span>{{ t('textLabel.dashboard') }}</span></router-link></li>
        <li class="breadcrumb-item"><router-link to="/company"><span>{{ t('textLabel.company', 2) }}</span></router-link></li>
        <li class="breadcrumb-item active"><span class="active">{{ t('textLabel.department', 2) }}</span></li>
      </ol>
      <div class="card mb-3 bg-gradient-dark">
        <div class="card-body ms-0 ps-0 me-0 pe-0 mt-0 pt-0 pb-0">
          <div class="table-responsive pt-2">
            <div class="row d-flex justify-content-between align-items-center me-2 mt-2 mb-2">
              <div class="col-auto">
                <h3 class="ps-0 ps-md-3 display-6 fw-bold">{{ t('textLabel.department', 2) }} <span v-if="companyData?.companyName">- {{ companyData.companyName }}</span></h3>
              </div>
              <div class="col-auto d-flex gap-2">
                <input
                  v-model="globalFilter"
                  type="text"
                  class="form-control"
                  :placeholder="t('button.search') + '...'"
                />
                <button @click="router.push({ name: 'departmentadd', params: { paramCompanyId: companyId } })" class="btn btn-outline-primary text-nowrap" type="button">{{ t('button.add') }}</button>
              </div>
            </div>
            <div class="ms-2 me-2 mt-2 mb-2">
              <BaseTable :table="table" />
            </div>
          </div>
        </div>
      </div>
      <div class="card bg-gradient-dark">
        <div class="card-body ms-0 ps-0 me-0 pe-0 mt-0 pt-0 pb-0"></div>
      </div>
    </div>
  </section>
</template>


<style scoped>

</style>