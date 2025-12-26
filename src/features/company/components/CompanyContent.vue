<script setup lang="ts">
import { onMounted } from 'vue';
import { useApi } from "~/composables/useApi";
import { useRouter } from "vue-router";
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { data, get } = useApi();
const router = useRouter();

onMounted(async () => {

  await get('/api/v0/user/companies')

});

const goToEdit = (id: number) => {
  router.push({ name: 'companyedit', params: { id } });
};

const goToDepartment = (companyId: number) => {

  console.log("Company ID = " + companyId);

  router.push({ name: 'companydepartment', params: { companyId } });
}

</script>

<template>
  <section class="pt-2 pb-2">

    <div class="container">
      <ol class="breadcrumb ms-4 me-4">
        <li class="breadcrumb-item"><router-link to="/dashboard"><span>{{ t('textLabel.dashboard') }}</span></router-link></li>
        <li class="breadcrumb-item active"><span class="active">{{ t('textLabel.company', 2) }}</span></li>
      </ol>
      <div class="card mb-3 bg-gradient-dark">
        <div class="card-body ms-0 ps-0 me-0 pe-0 mt-0 pt-0 pb-0">
<!--          <div class="text-center py-4" id="idform">
            <div class="input-group mb-2"><span class="d-flex w-25 ms-2 input-group-text">{{ t('textLabel.company', 2) }}</span><input class="form-control d-flex ms-0 ps-5 me-2 pe-4" type="text"></div>
            <div class="input-group mb-2"><span class="w-25 ms-2 input-group-text">{{ t('textLabel.status') }}</span><input class="form-control w-25 ms-0 ps-5 me-2 pe-4" type="text"></div>
            <div class="text-end"><button class="btn btn-outline-primary btn-sm ms-2 me-2" type="button">{{ t('button.search') }}</button></div>
          </div>-->

          <div class="table-responsive pt-2">
            <div class="row d-flex justify-content-between align-items-center me-2 mt-2 mb-2">
              <div class="col-auto">
                <h4 class="ps-3">Companies</h4>
              </div>
              <div class="col-auto">
                <button @click="router.push({ name: 'companyadd' })" class="btn btn-outline-primary" type="button">{{ t('button.add') }}</button>
              </div>
            </div>
            <div class="ms-2 me-2 mt-2 mb-2">
              <table class="table">
                <thead>
                <tr>
                  <th>{{ t('textLabel.number') }}</th>
                  <th>{{ t('textLabel.company', 2) }}</th>
                  <th>{{ t('textField.email') }}</th>
                  <!--
                  <th>{{ t('textLabel.employee', 2) }}</th>
                  <th>{{ t('textLabel.asset', 2) }}</th>
                  -->
                  <th class="text-center">{{ t('textLabel.action') }}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="d in data" :key="d.companyId">
                  <td>{{ d.companyId  }}</td>
                  <td>{{ d.companyName }}</td>
                  <td>{{ d.companyEmail }}</td>
                  <!--
                  <td>50</td>
                  <td>50</td>
                  -->
                  <td class="text-center">
                    <div class="btn-group" role="group">
                      <button class="btn btn-primary" @click="goToEdit(d.companyId)">{{ t('button.edit') }}</button>
                      <button class="btn btn-info" @click="goToDepartment(d.companyId)">{{ t('textLabel.department') }}</button>
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