<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { usePermissionTable } from '~/features/permission/hooks/tables/usePermissionTable';
import BaseTable from '~/components/table/BaseTable.vue'

const router = useRouter();

const {
  table,
  globalFilter,
  fetchData,
  t
} = usePermissionTable();

onMounted(fetchData);

</script>

<template>
  <section class="pt-2 pb-2">
    <div class="container">
      <ol class="breadcrumb ms-2 me-2">
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

