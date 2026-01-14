<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useApi } from "~/composables/useApi";
import {onMounted} from "vue";
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
const { data, get } = useApi();
const { data: companyData, get: getCompany } = useApi();
const { data: departmentData, get: getDepartment } = useApi();
const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { companyIdParam, departmentIdParam } = route.params;

onMounted(async () => {

  await get('/api/v0/user/organization/department/users/companyId/' + companyIdParam + "/userId/" + auth.user?.id + "/valueDepartmentId/" + departmentIdParam);

  await getCompany('/api/v0/user/organization/company/detail/companyId/' + companyIdParam + "/userId/" + auth.user?.id);

  console.log(companyData.value);

  await getDepartment('/api/v0/user/organization/department/detail/companyId/' + companyIdParam + "/userId/" + auth.user?.id + "/" + departmentIdParam);

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

          <!--
          <div class="text-center py-4" id="idform">
            <div class="input-group mb-2">
              <span class="d-flex w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">{{ t('textLabel.company', 1) }}</span>
              <select class="form-control d-flex ms-0 ps-2 me-2 pe-4" type="text">
                <option v-for="company in companyData" :value="company.companyId">{{ company.companyName }}</option>
              </select>
            </div>
            <div class="input-group mb-2">
              <span class="d-flex w-25 ms-2 input-group-text">{{ t('textLabel.department', 1) }}</span>
              <select class="form-select me-2"></select>
              <select class="form-control d-flex ms-0 ps-2 me-2 pe-4" type="text">
                <option v-for="department in departmentData" :value="department.departmentId">{{ department.departmentName }}</option>
              </select>
            </div>
          </div>
          -->

          <div class="table-responsive pt-2">
            <div class="row d-flex justify-content-between align-items-center me-2 mt-2 mb-2">
              <div class="col-auto">
                <h3 class="ps-3">Users</h3>
              </div>
              <div class="col-auto">
                <button @click="router.push({ name: 'useradd', params: { companyIdParam, departmentIdParam } })" class="btn btn-outline-primary" type="button">{{ t('button.add') }}</button>
              </div>
            </div>
            <div class="table-responsive ms-2 me-2 mt-2 mb-2">
              <table class="table">
                <thead>
                <tr>
                  <th>{{ t('textLabel.number') }}</th>
                  <th>{{ t('textLabel.name') }}</th>
                  <th>{{ t('textLabel.email') }}</th>
                  <th>{{ t('textLabel.status') }}</th>
                  <th>{{ t('textLabel.createdAt') }}</th>
                  <th class="text-center">{{ t('textLabel.action') }}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="d in data" :key="d.userId">
                  <td>{{ d.userId  }}</td>
                  <td>{{ d.userName  }}</td>
                  <td>{{ d.userEmail  }}</td>
                  <td>{{ d.userStatus  }}</td>
                  <td>{{ d.userCreatedAt  }}</td>
                  <td class="text-center">
                    <div class="btn-group" role="group">
                      <button class="btn btn-primary" @click="goToEdit(d.userId)">{{ t('button.edit') }}</button>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
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