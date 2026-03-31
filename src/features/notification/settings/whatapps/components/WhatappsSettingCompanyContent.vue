<script setup lang="ts">
import { onMounted } from 'vue';
import { useWhatappsCompanyTable } from '~/features/notification/settings/whatapps/hooks/tables/useWhatappsCompanyTable.ts';
import BaseTable from '~/components/table/BaseTable.vue'

const {
  table,
  globalFilter,
  fetchData,
  t
} = useWhatappsCompanyTable();

onMounted(fetchData);
</script>

<template>
  <section class="pt-2 pb-2">

    <div class="container">
      <ol class="breadcrumb ms-2 me-2">
        <li class="breadcrumb-item"><router-link to="/dashboard"><span>{{ t('textLabel.dashboard') }}</span></router-link></li>
        <li class="breadcrumb-item"><span>{{ t('textLabel.setting') }}</span></li>
        <li class="breadcrumb-item active"><span class="active">{{ t('textLabel.whatappsSetting') }}</span></li>
      </ol>
      <div class="card mb-3 bg-gradient-dark">
        <div class="card-body ms-0 ps-0 me-0 pe-0 mt-0 pt-0 pb-0">
          <div class="row d-flex justify-content-between align-items-center me-2 mt-2 mb-2">
            <div class="col-auto">
              <h4 class="ps-0 ps-md-3 fs-5 fs-md-3 ms-2">{{ t('textLabel.whatappsSetting') }}</h4>
            </div>
            <div class="col-auto d-flex gap-2 ms-2">
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