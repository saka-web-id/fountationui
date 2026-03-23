<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useRoleTable } from '~/features/role/hooks/tables/useRoleTable';
import BaseTable from '~/components/table/BaseTable.vue'

const route = useRoute();
const { companyIdParam } = route.params;

const {
  table,
  globalFilter,
  userCompanyData,
  selectedCompanyId,
  onCompanyChange,
  fetchData,
  t
} = useRoleTable(companyIdParam as string);

onMounted(fetchData);
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