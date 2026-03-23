<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useApi } from "~/composables/useApi";
import { onMounted, ref, computed, h } from "vue";
import { type UserCompanyPayLoad } from "~/features/user/hooks/forms/useUserForm.ts";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from '~/stores/auth'
import { createColumnHelper } from '@tanstack/vue-table'
import { useDataTable } from '~/composables/useDataTable'
import BaseTable from '~/components/table/BaseTable.vue'
import type { Role } from '../types'

const auth = useAuthStore()
const { data, get } = useApi<Role[]>();
const { data: userCompanyData, get: getUserCompany } = useApi();
const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const { companyIdParam } = route.params;

// Selected company ID
const selectedCompanyId = ref<number | null>(
    companyIdParam != null && Number(companyIdParam) > 0
        ? Number(companyIdParam)
        : null
);

const roles = computed(() => data.value || [])

const columnHelper = createColumnHelper<Role>()

const columns = [
  columnHelper.accessor('roleId', {
    header: () => h('span', { class: 'd-none d-md-inline' }, t('textLabel.number')),
    cell: info => h('span', { class: 'd-none d-md-inline' }, info.getValue()),
    meta: { className: 'd-none d-md-table-cell' }
  }),
  columnHelper.accessor('roleName', {
    header: () => t('textLabel.name'),
  }),
  columnHelper.accessor('roleDescription', {
    header: () => h('span', { class: 'd-none d-md-inline' }, t('textLabel.description')),
    cell: info => h('span', { class: 'd-none d-md-inline' }, info.getValue()),
    meta: { className: 'd-none d-md-table-cell' }
  }),
  columnHelper.accessor('roleCreatedAt', {
    header: () => h('span', { class: 'd-none d-md-inline' }, t('textLabel.dateCreated')),
    cell: info => h('span', { class: 'd-none d-md-inline' }, info.getValue()),
    meta: { className: 'd-none d-md-table-cell' }
  }),
  columnHelper.display({
    id: 'actions',
    header: () => t('textLabel.action'),
    cell: info => h('div', { class: 'btn-group', role: 'group' }, [
      h('button', {
        class: 'btn btn-primary',
        onClick: () => router.push({ name: 'roleedit', params: { roleIdParam: info.row.original.roleId, companyIdParam: selectedCompanyId.value } })
      }, t('button.view'))
    ]),
  }),
]

const { table, globalFilter } = useDataTable(roles, columns)

onMounted(async () => {

  await getUserCompany('/v0/user/organization/company/list/companyId/' + auth.user?.company.companyId + "/userId/" + auth.user?.id + "/valueCompanyId/0" );

  console.log("List Company : ", userCompanyData.value);

  const defaultCompany = userCompanyData.value.find((c: any) : UserCompanyPayLoad => c.companyIsDefault)
  if (defaultCompany) { //Get is defaultCompany True
    if(selectedCompanyId.value == null || selectedCompanyId.value == 0) {
      selectedCompanyId.value = defaultCompany.companyId
    }
  }

  await get('/v0/authorization/company/role/list/companyId/' + auth.user?.company.companyId + "/userId/" + auth.user?.id + "/valueCompanyId/" + selectedCompanyId.value );

});

async function onCompanyChange() {
  if (selectedCompanyId.value) {
    // Wait until the route navigation finishes
    await router.push({
      name: 'roles',
      params: { companyIdParam: selectedCompanyId.value }
    });

    // Then trigger the API call and wait for it to complete
    await get('/v0/authorization/company/role/list/companyId/' + auth.user?.company.companyId + "/userId/" + auth.user?.id + "/valueCompanyId/" + selectedCompanyId.value);
  }
}

</script>

<template>
  <section class="pt-2 pb-2">
    <div class="container">
      <ol class="breadcrumb ms-4">
        <li class="breadcrumb-item"><router-link to="/dashboard"><span>{{ t('textLabel.dashboard') }}</span></router-link></li>
        <li class="breadcrumb-item active"><span class="active">{{ t('textLabel.role', 2) }}</span></li>
      </ol>
      <div class="card mb-3 bg-gradient-dark">

        <div id="idform" class="text-center">
          <div class="input-group mb-2">
            <span class="d-flex w-25 ms-2 input-group-text">Company</span>
            <select class="form-control d-flex ms-0 ps-2 me-2 pe-2" type="text" v-model="selectedCompanyId" @change="onCompanyChange" >
              <option v-for="userCompany in userCompanyData" :value="userCompany.companyId">{{ userCompany.companyName }}</option>
            </select>
          </div>
        </div>

        <div class="table-responsive pt-2">
          <div class="row d-flex justify-content-between align-items-center me-2 mt-2 mb-2">
            <div class="col-auto">
              <h3 class="ps-0 ps-md-3 fs-5 fs-md-3 ms-2">{{ t('textLabel.role', 2) }}</h3>
            </div>
            <div class="col-auto d-flex gap-2">
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
      <div class="card bg-gradient-dark">
        <div class="card-body ms-0 ps-0 me-0 pe-0 mt-0 pt-0 pb-0"></div>
      </div>
    </div>
  </section>
</template>


<style scoped>

</style>