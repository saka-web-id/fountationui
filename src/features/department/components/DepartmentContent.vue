<script setup lang="ts">
import { onMounted } from 'vue';
import { useApi } from "~/composables/useApi";
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

const { data, get } = useApi();
const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const { companyId } = route.params;

onMounted(async () => {

  await get('/api/v0/user/organization/department/list/' + companyId)
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
          <!--
          <div class="text-center py-4" id="idform">
            <div class="input-group mb-2"><span class="d-flex w-25 ms-2 input-group-text">{{ t('textLabel.department', 1) }}</span><input class="form-control d-flex ms-0 ps-2 me-2 pe-2" type="text"></div>
            <div class="input-group mb-2"><span class="w-25 ms-2 input-group-text">{{ t('textLabel.status') }}</span><input class="form-control w-25 ms-0 ps-2 me-2 pe-2" type="text"></div>
            <div class="text-end"><button class="btn btn-outline-primary btn-sm ms-2 me-2" type="button">{{ t('button.search') }}</button></div>
          </div>
          -->
          <div class="table-responsive pt-2">
            <div class="row d-flex justify-content-between align-items-center me-2 mt-2 mb-2">
              <div class="col-auto">
                <h3 class="ps-3">Departments</h3>
              </div>
              <div class="col-auto">
                <button @click="router.push({ name: 'departmentadd', params: { paramCompanyId: companyId } })" class="btn btn-outline-primary" type="button">{{ t('button.add') }}</button>
              </div>
            </div>
            <div class="table-responsive ms-2 me-2 mt-2 mb-2">
              <table class="table">
                <thead>
                <tr>
                  <th>{{ t('textLabel.number') }}</th>
                  <th>{{ t('textLabel.department', 2) }}</th>
                  <th>{{ t('textLabel.description') }}</th>
                  <th class="text-center">{{ t('textLabel.action') }}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="d in data" :key="d.departmentId">
                  <td>{{ d.departmentId  }}</td>
                  <td>{{ d.departmentName  }}</td>
                  <td>{{ d.departmentDescription  }}</td>
                  <td class="text-center">
                    <div class="btn-group" role="group">
                      <button class="btn btn-primary" @click="goToEdit(d.companyId, d.departmentId)">{{ t('button.edit') }}</button>
                      <button class="btn btn-info" @click="goToUsers(d.companyId, d.departmentId)">{{ t('textLabel.user', 2) }}</button>
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