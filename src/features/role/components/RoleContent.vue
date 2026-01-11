<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useApi } from "~/composables/useApi";
import {onMounted, ref} from "vue";
import { type UserCompanyPayLoad } from "~/features/user/hooks/forms/useUserForm.ts";
import {useRoute, useRouter} from "vue-router";
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
const { data, get } = useApi();
const { data: userCompanyData, get: getUserCompany } = useApi();
const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const { companyIdParam } = route.params;

// Selected company ID
const selectedCompanyId = ref<number | null>(
    companyIdParam != null && Number(companyIdParam) > 0
        ? Number(companyIdParam)
        : null
);


onMounted(async () => {

  await getUserCompany('/api/v0/user/organization/company/list/companyId/' + auth.user?.company.companyId + "/userId/" + auth.user?.id + "/valueCompanyId/0" );

  console.log("List Company : ", userCompanyData.value);

  console.log("Default user company : ", userCompanyData.value.find((c: any) : UserCompanyPayLoad => c.companyIsDefault));

  const defaultCompany = userCompanyData.value.find((c: any) : UserCompanyPayLoad => c.companyIsDefault)
  if (defaultCompany) { //Get is defaultCompany True
    if(selectedCompanyId.value == null || selectedCompanyId.value == 0) {
      selectedCompanyId.value = defaultCompany.companyId
    }
  }

  await get('/api/v0/authorization/company/role/list/companyId/' + auth.user?.company.companyId + "/userId/" + auth.user?.id + "/valueCompanyId/" + selectedCompanyId.value );

});

async function onCompanyChange() {
  if (selectedCompanyId.value) {
    // Wait until the route navigation finishes
    await router.push({
      name: 'roles',
      params: { companyIdParam: selectedCompanyId.value }
    });

    // Then trigger the API call and wait for it to complete
    await get('/api/v0/authorization/company/role/list/companyId/' + auth.user?.company.companyId + "/userId/" + auth.user?.id + "/valueCompanyId/" + selectedCompanyId.value);
  }
}

</script>

<template>
  <section class="pt-2 pb-2">
    <div class="container">
      <ol class="breadcrumb ms-4">
        <li class="breadcrumb-item"><router-link to="/dashboard"><span>{{ t('textLabel.dashboard') }}</span></router-link></li>
        <li class="breadcrumb-item active"><span class="active">{{ t('textLabel.role', 2) }}</span></li>
      </ol>
      <div class="card mb-3 bg-gradient-dark">

        <div id="idform" class="text-center py-4">
          <div class="input-group mb-2">
            <span class="d-flex w-25 ms-2 input-group-text">Company</span>
            <select class="form-control d-flex ms-0 ps-2 me-2 pe-4" type="text" v-model="selectedCompanyId" @change="onCompanyChange" >
              <option v-for="userCompany in userCompanyData" :value="userCompany.companyId">{{ userCompany.companyName }}</option>
            </select>
          </div>
<!--          <div class="text-end">
            <button class="btn btn-outline-primary btn-sm ms-2 me-2" type="button">Search</button>
          </div>-->
        </div>

        <div class="table-responsive pt-2">
          <div class="row d-flex justify-content-between align-items-center me-2 mt-2 mb-2">
            <div class="col-auto">
              <h3 class="ps-3">Roles</h3>
            </div>
            <div class="col-auto">
              <button @click="router.push({ name: 'roleadd', params: { companyIdParam: selectedCompanyId } })" class="btn btn-outline-primary" type="button">{{ t('button.add') }}</button>
            </div>
          </div>
          <div class="table-responsive ms-2 me-2 mt-2 mb-2">
            <table class="table">
              <thead>
              <tr>
                <th>{{ t('textLabel.number') }}</th>
                <th>{{ t('textLabel.name') }}</th>
                <th>{{ t('textLabel.description') }}</th>
                <th>{{ t('textLabel.dateCreated') }}</th>
                <th class="text-center">{{ t('textLabel.action') }}</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="role in data" :key="role.roleId">
                <td>{{ role.roleId }}</td>
                <td>{{ role.roleName }}</td>
                <td>{{ role.roleDescription }}</td>
                <td>{{ role.roleCreatedAt }}</td>
                <td class="text-center">
                  <div class="btn-group" role="group">
                    <button class="btn btn-primary" @click="router.push({ name: 'roleedit', params: { roleIdParam: role.roleId, companyIdParam: selectedCompanyId } })" >{{ t('button.view') }}</button>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
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