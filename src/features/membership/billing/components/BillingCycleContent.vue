<script setup lang="ts">
import { onMounted } from 'vue';
import { useApi } from "~/composables/useApi";
import { useRouter } from "vue-router";
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '~/stores/auth'
import { useCompany } from '~/composables/useCompany'

const { t } = useI18n();
const { data, get } = useApi();
const auth = useAuthStore()
const router = useRouter();
const { selectedCompanyId, onCompanyChange, userCompanyData } = useCompany({
  routeName: 'billingcycle',
  apiPath: '/v0/account/membership/billing/cycle/list'
})


onMounted(async () => {

  console.log("URL :", '/v0/account/membership/billing/cycle/list/companyId/'+ selectedCompanyId + "/userId/" + auth.user?.id + "/valueCompanyId/" + selectedCompanyId);

  await get('/v0/account/membership/billing/cycle/list/companyId/'+ selectedCompanyId + "/userId/" + auth.user?.id + "/valueCompanyId/" + selectedCompanyId)

});

/*const handleCompanyChange = async (event: Event) => {
  const _target = event.target as HTMLSelectElement
  await onCompanyChange({ valueMembershipPlanId: selectedCompanyId.value })
}*/
const handleCompanyChange = async (event: Event) => {
  const target = event.target as HTMLSelectElement
  await onCompanyChange({ valueMembershipPlanId: target.value })
}

const goToEdit = (companyIdParam: number) => {
  router.push({ name: 'billingcycleedit', params: { companyIdParam } });
};

</script>

<template>
  <section class="pt-2 pb-2">

    <div class="container">
      <ol class="breadcrumb ms-4 me-4">
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
              <div class="col-auto">
                <button @click="router.push({ name: 'billingcycleadd', params: { companyIdParam: selectedCompanyId } })" class="btn btn-outline-primary" type="button">{{ t('button.add') }}</button>
              </div>
            </div>
            <div class="ms-2 me-2 mt-2 mb-2">
              <table class="table">
                <thead>
                <tr>
                  <th>{{ t('textLabel.number') }}</th>
                  <th>{{ t('textLabel.name', 1) }}</th>
                  <th>{{ t('textField.duration') }}</th>
                  <th>{{ t('textField.createdAt') }}</th>
                  <th class="text-center">{{ t('textLabel.action') }}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="d in data" :key="d.billingCycleId">
                  <td>{{ d.billingCycleId  }}</td>
                  <td>{{ d.billingCycleName }}</td>
                  <td>{{ d.billingCycleDuration }}</td>
                  <td>{{ d.billingCyclecreatedAt }}</td>
                  <td class="text-center">
                    <div class="btn-group" role="group">
                      <button class="btn btn-primary" @click="goToEdit(selectedCompanyId)">{{ t('button.edit') }}</button>
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