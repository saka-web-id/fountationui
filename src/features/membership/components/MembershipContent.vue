<script setup lang="ts">
import { useRouter} from "vue-router";
import { useI18n } from 'vue-i18n';
import { useCompany } from '~/composables/useCompany'
import { onMounted, computed, h } from "vue";
import { createColumnHelper } from '@tanstack/vue-table'
import { useDataTable } from '~/composables/useDataTable'
import BaseTable from '~/components/table/BaseTable.vue'
import type { MembershipPlan } from '../types'

const { t } = useI18n();
const router = useRouter();
const { selectedCompanyId, onCompanyChange, userCompanyData, data, fetchData } = useCompany({
  routeName: 'membership',
  apiPath: '/v0/account/membership/plan/list'
})

const membershipPlans = computed(() => (data.value as any[]) || [])

const columnHelper = createColumnHelper<MembershipPlan>()

const columns = [
  columnHelper.accessor('membershipPlanId', {
    header: () => t('textLabel.number'),
    meta: { className: 'd-none d-md-table-cell' }
  }),
  columnHelper.accessor('membershipPlanName', {
    header: () => t('textLabel.membership', 1),
  }),
  columnHelper.accessor('membershipPlanBillingCycle', {
    header: () => t('textLabel.billingCycle'),
  }),
  columnHelper.accessor('membershipPlanPrice', {
    header: () => t('textLabel.billing'),
  }),
  columnHelper.display({
    id: 'actions',
    header: () => t('textLabel.action'),
    cell: info => h('div', { class: 'btn-group', role: 'group' }, [
      h('button', {
        class: 'btn btn-primary',
        onClick: () => goToEdit(selectedCompanyId.value, info.row.original.membershipPlanId)
      }, t('button.edit'))
    ]),
  }),
]

const { table, globalFilter } = useDataTable(membershipPlans, columns)

onMounted(async () => {
  if (selectedCompanyId.value) {
    await fetchData({ valueCompanyId: selectedCompanyId.value })
  }
})

const goToEdit = (companyIdParam: any, membershipIdParam: number) => {
  router.push({ name: 'membershipedit', params: { companyIdParam, membershipIdParam } });
};

</script>

<template>
  <section class="pt-2 pb-2">

    <div class="container">
      <ol class="breadcrumb ms-2 me-2">
        <li class="breadcrumb-item"><router-link to="/dashboard"><span>{{ t('textLabel.dashboard') }}</span></router-link></li>
        <li class="breadcrumb-item active"><span class="active">{{ t('textLabel.membership', 2) }}</span></li>
      </ol>

      <div class="card mb-3 bg-gradient-dark">

        <div id="idform" class="text-center py-4">
          <div class="input-group mb-2">
            <span class="d-flex w-25 ms-2 input-group-text">Company</span>
            <select class="form-control d-flex ms-0 ps-2 me-2 pe-4" type="text" v-model="selectedCompanyId" @change="onCompanyChange({ valueCompanyId: selectedCompanyId.valueOf() })" >
              <option v-for="userCompany in userCompanyData" :value="userCompany.companyId">{{ userCompany.companyName }}</option>
            </select>
          </div>
        </div>

        <div class="card-body ms-0 ps-0 me-0 pe-0 mt-0 pt-0 pb-0">

          <div class="table-responsive pt-2">
            <div class="row d-flex justify-content-between align-items-center me-2 mt-2 mb-2">
              <div class="col-auto">
                <h4 class="ps-0 ps-md-3 fs-5 fs-md-3 ms-2">{{ t('textLabel.membership', 2) }}</h4>
              </div>
              <div class="col-auto d-flex gap-2 ms-2">
                <input
                  v-model="globalFilter"
                  type="text"
                  class="form-control"
                  :placeholder="t('button.search') + '...'"
                />
                <button @click="router.push({ name: 'membershipadd' })" class="btn btn-outline-primary text-nowrap" type="button">{{ t('button.add') }}</button>
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