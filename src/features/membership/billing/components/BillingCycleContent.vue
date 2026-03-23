<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from "vue-router";
import { useBillingCycleTable } from '~/features/membership/billing/hooks/tables/useBillingCycleTable';
import BaseTable from '~/components/table/BaseTable.vue'

const router = useRouter();

const {
  table,
  globalFilter,
  selectedCompanyId,
  userCompanyData,
  handleCompanyChange,
  fetchData,
  t
} = useBillingCycleTable();

onMounted(fetchData);

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
            <select class="form-control d-flex ms-0 ps-2 me-2 pe-4" type="text" v-model="selectedCompanyId" @change="handleCompanyChange" >
              <option v-for="userCompany in userCompanyData" :value="userCompany.companyId">{{ userCompany.companyName }}</option>
            </select>
          </div>
        </div>

        <div class="card-body ms-0 ps-0 me-0 pe-0 mt-0 pt-0 pb-0">

          <div class="table-responsive pt-2">
            <div class="row d-flex justify-content-between align-items-center me-2 mt-2 mb-2">
              <div class="col-auto">
                <h4 class="ps-3">{{ t('textLabel.membership', 2) }}</h4>
              </div>
              <div class="col-auto d-flex gap-2">
                <input
                  v-model="globalFilter"
                  type="text"
                  class="form-control"
                  :placeholder="t('button.search') + '...'"
                />
                <button @click="router.push({ name: 'billingcycleadd', params: { companyIdParam: selectedCompanyId } })" class="btn btn-outline-primary text-nowrap" type="button">{{ t('button.add') }}</button>
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