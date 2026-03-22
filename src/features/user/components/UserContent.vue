<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useApi } from "~/composables/useApi";
import { onMounted, computed, h } from "vue";
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/auth'
import { createColumnHelper } from '@tanstack/vue-table'
import { useDataTable } from '~/composables/useDataTable'
import BaseTable from '~/components/table/BaseTable.vue'
import type { User } from '../types'

const auth = useAuthStore()
const { data, get } = useApi<User[]>();
const { data: companyData, get: getCompany } = useApi();
const { data: departmentData, get: getDepartment } = useApi();
const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { companyIdParam, departmentIdParam } = route.params;

const users = computed(() => data.value || [])

const columnHelper = createColumnHelper<User>()

const columns = [
  columnHelper.accessor('userId', {
    header: () => h('span', { class: 'd-none d-md-inline' }, t('textLabel.number')),
    cell: info => h('span', { class: 'd-none d-md-inline' }, info.getValue()),
    meta: {
      className: 'd-none d-md-table-cell'
    }
  }),
  columnHelper.accessor('userName', {
    header: () => t('textLabel.name'),
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('userEmail', {
    header: () => h('span', { class: 'd-none d-md-inline' }, t('textLabel.email')),
    cell: info => h('span', { class: 'd-none d-md-inline' }, info.getValue()),
    meta: {
      className: 'd-none d-md-table-cell'
    }
  }),
  columnHelper.accessor('userStatus', {
    header: () => t('textLabel.status'),
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('userCreatedAt', {
    header: () => h('span', { class: 'd-none d-md-inline' }, t('textLabel.createdAt')),
    cell: info => h('span', { class: 'd-none d-md-inline' }, info.getValue()),
    meta: {
      className: 'd-none d-md-table-cell'
    }
  }),
  columnHelper.display({
    id: 'actions',
    header: () => t('textLabel.action'),
    cell: info => h('div', { class: 'btn-group', role: 'group' }, [
      h('button', {
        class: 'btn btn-primary',
        onClick: () => goToEdit(info.row.original.userId)
      }, t('button.edit'))
    ]),
  }),
]

const { table, globalFilter } = useDataTable(users, columns)

onMounted(async () => {

  await get('/v0/user/organization/department/users/companyId/' + companyIdParam + "/userId/" + auth.user?.id + "/valueDepartmentId/" + departmentIdParam);

  await getCompany('/v0/user/organization/company/detail/companyId/' + companyIdParam + "/userId/" + auth.user?.id);

  console.log(companyData.value);

  await getDepartment('/v0/user/organization/department/detail/companyId/' + companyIdParam + "/userId/" + auth.user?.id + "/" + departmentIdParam);

  console.log(departmentData.value);

});

const goToEdit = (userId: number) => {

  router.push({ name: 'useredit', params: { userId, companyIdParam, departmentIdParam } });
};

</script>

<template>
  <section class="pt-2 pb-2">
    <div class="container">
      <ol class="breadcrumb ms-4">
        <li class="breadcrumb-item"><router-link to="/dashboard"><span>{{ t('textLabel.dashboard') }}</span></router-link></li>
        <li class="breadcrumb-item"><router-link to="/company"><span>{{ t('textLabel.company', 2) }}</span></router-link></li>
        <li class="breadcrumb-item">
          <router-link :to="{ name: 'companydepartment', params: { companyId: companyIdParam } }">
            <span>{{ t('textLabel.department', 2) }}</span>
          </router-link>
        </li>
        <li class="breadcrumb-item active"><span class="active">{{ t('textLabel.user', 2) }}</span></li>
      </ol>
      <div class="card mb-3 bg-gradient-dark">
        <div class="card-body ms-0 ps-0 me-0 pe-0 mt-0 pt-0 pb-0">

          <div class="table-responsive pt-2">
            <div class="row d-flex justify-content-between align-items-center me-2 mt-2 mb-2">
              <div class="col-auto">
                <h3 class="ps-0 ps-md-3 display-6 fw-bold">
                  {{ t('textLabel.user', 2) }} 
                  <span v-if="companyData?.companyName && departmentData?.departmentName">
                    - {{ companyData.companyName }} - {{ departmentData.departmentName }}
                  </span>
                </h3>
              </div>
              <div class="col-auto d-flex gap-2">
                <input
                  v-model="globalFilter"
                  type="text"
                  class="form-control"
                  :placeholder="t('button.search') + '...'"
                />
                <button @click="router.push({ name: 'useradd', params: { companyIdParam, departmentIdParam } })" class="btn btn-outline-primary text-nowrap" type="button">{{ t('button.add') }}</button>
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