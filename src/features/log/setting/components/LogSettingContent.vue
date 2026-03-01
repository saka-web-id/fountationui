<script setup lang="ts">
import { onMounted } from 'vue';
import { useApi } from "~/composables/useApi";
import { useRouter } from "vue-router";
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
const { t } = useI18n();
const { data, get } = useApi();
const router = useRouter();

onMounted(async () => {

  console.log("URL :", '/v0/user/companies/list/companyId/'+auth.user?.company.companyId + "/userId/" + auth.user?.id);

  await get('/v0/user/companies/list/companyId/'+auth.user?.company.companyId + "/userId/" + auth.user?.id)

});

const goToEdit = (companyIdParam: number) => {
  router.push({ name: 'logsettinglist', params: { companyIdParam } });
};

</script>

<template>
  <section class="pt-2 pb-2">

    <div class="container">
      <ol class="breadcrumb ms-4 me-4">
        <li class="breadcrumb-item"><router-link to="/dashboard"><span>{{ t('textLabel.dashboard') }}</span></router-link></li>
        <li class="breadcrumb-item"><span>{{ t('textLabel.setting') }}</span></li>
        <li class="breadcrumb-item active"><span class="active">{{ t('textLabel.logSetting', 2) }}</span></li>
      </ol>
      <div class="card mb-3 bg-gradient-dark">
        <div class="card-body ms-0 ps-0 me-0 pe-0 mt-0 pt-0 pb-0">

          <div class="table-responsive pt-2">
            <div class="row d-flex justify-content-between align-items-center me-2 mt-2 mb-2">
              <div class="col-auto">
                <h4 class="ps-3">{{ t('textLabel.logSetting', 2) }}</h4>
              </div>
            </div>
            <div class="ms-2 me-2 mt-2 mb-2">
              <table class="table">
                <thead>
                <tr>
                  <th>{{ t('textLabel.number') }}</th>
                  <th>{{ t('textLabel.company', 2) }}</th>
                  <th>{{ t('textField.email') }}</th>
                  <th class="text-center">{{ t('textLabel.action') }}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="d in data" :key="d.companyId">
                  <td>{{ d.companyId  }}</td>
                  <td>{{ d.companyName }}</td>
                  <td>{{ d.companyEmail }}</td>
                  <td class="text-center">
                    <div class="btn-group" role="group">
                      <button class="btn btn-primary" @click="goToEdit(d.companyId)">{{ t('button.edit') }}</button>
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