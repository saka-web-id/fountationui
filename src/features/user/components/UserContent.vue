<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute, useRouter } from 'vue-router';
import { useUserTable } from '~/features/user/hooks/tables/useUserTable'; // Import logic kita
import BaseTable from '~/components/table/BaseTable.vue'

const route = useRoute();
const router = useRouter();
const { companyIdParam, departmentIdParam } = route.params as { companyIdParam: string, departmentIdParam: string };

const {
  table,
  globalFilter,
  companyData,
  departmentData,
  fetchData,
  t
} = useUserTable(companyIdParam, departmentIdParam);

onMounted(fetchData);
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
        <div class="card-body p-0">
          <div class="table-responsive pt-2">
            <div class="row d-flex justify-content-between align-items-center mx-2 my-2">
              <div class="col-auto">
                <h3 class="ps-0 ps-md-3 fs-5 fs-md-3">
                  {{ t('textLabel.user', 2) }} 
                  <span v-if="companyData?.companyName && departmentData?.departmentName">
                    - {{ companyData.companyName }} - {{ departmentData.departmentName }}
                  </span>
                </h3>
              </div>
              <div class="col-auto d-flex gap-2">
                <input v-model="globalFilter" type="text" class="form-control" :placeholder="t('button.search') + '...'"/>
                <button @click="router.push({ name: 'useradd', params: { companyIdParam, departmentIdParam } })" class="btn btn-outline-primary text-nowrap">
                  {{ t('button.add') }}
                </button>
              </div>
            </div>
            <div class="m-2">
              <BaseTable :table="table" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>