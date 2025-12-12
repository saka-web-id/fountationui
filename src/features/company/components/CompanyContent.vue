<script setup lang="ts">
import { onMounted } from 'vue';
import { useApi } from "~/composables/useApi.ts";

const { data, get } = useApi();

data.value = [
  { companyId: 0, companyName: "None", companyAddress: "None", companyPhone: "None", companyEmail: "None", companyWebsite: "None", companyDescription: "None", companyLogoUrl:"None",  companyTaxId:"None", companyRegistrationId:"None", companyStatus:"None", companyIndustry:"None", companyType:"None", companyCreatedAt:"None", companyUpdatedAt:"None" },
]

onMounted(async () => {

  await get('/api/v0/user/companies')

  console.log("DATA = " + data);

});
</script>

<template>
  <section class="pt-2 pb-2">

    <div class="container">
      <ol class="breadcrumb ms-4 me-4">
        <li class="breadcrumb-item"><router-link to="/dashboard"><span>{{ $t('textLabel.dashboard') }}</span></router-link></li>
        <li class="breadcrumb-item active"><span class="active">{{ $t('textLabel.company', 2) }}</span></li>
      </ol>
      <div class="card mb-3 bg-gradient-dark">
        <div class="card-body ms-0 ps-0 me-0 pe-0 mt-0 pt-0 pb-0">
          <div class="text-center py-4" id="idform">
            <div class="input-group mb-2"><span class="d-flex w-25 ms-2 input-group-text">{{ $t('textLabel.company', 2) }}</span><input class="form-control d-flex ms-0 ps-5 me-2 pe-4" type="text"></div>
            <div class="input-group mb-2"><span class="w-25 ms-2 input-group-text">{{ $t('textLabel.status') }}</span><input class="form-control w-25 ms-0 ps-5 me-2 pe-4" type="text"></div>
            <div class="text-end"><button class="btn btn-outline-primary btn-sm ms-2 me-2" type="button">{{ $t('button.search') }}</button></div>
          </div>
          <div class="text-end">
            <div class="table-responsive ms-2 me-2 mt-2 mb-2">
              <table class="table">
                <thead>
                <tr>
                  <th>{{ $t('textLabel.number') }}</th>
                  <th>{{ $t('textLabel.company', 2) }}</th>
                  <th>{{ $t('textField.email') }}</th>
                  <!--
                  <th>{{ $t('textLabel.employee', 2) }}</th>
                  <th>{{ $t('textLabel.asset', 2) }}</th>
                  -->
                  <th class="text-center">{{ $t('textLabel.action') }}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="d in data" :key="d.companyId">
                  <td>{{ d.companyId  }}</td>
                  <td>{{  d.companyName }}</td>
                  <td>{{  d.companyEmail }}</td>
                  <!--
                  <td>50</td>
                  <td>50</td>
                  -->
                  <td class="text-center">
                    <div class="btn-group" role="group">
                      <router-link to="/companyedit" class="btn btn-primary" tag="button">{{ $t('button.edit') }}</router-link>
                      <button class="btn btn-danger" type="button" data-bs-target="#myModal" data-bs-toggle="modal">{{ $t('button.delete') }}</button></div>
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