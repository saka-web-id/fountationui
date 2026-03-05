<script setup lang="ts">
import { onMounted } from 'vue';
import { useApi } from "~/composables/useApi";
import { useRouter, useRoute } from "vue-router";
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
const { t } = useI18n();
const { data, get } = useApi();
const router = useRouter();
const route = useRoute();

onMounted(async () => {
  const companyIdParam = route.params.companyIdParam;

  console.log("LogSettingLIstContent companyIdParam ", companyIdParam);

  if (auth.user && companyIdParam) {
    await get(`/v0/logs/setting/list/companyId/${auth.user.company.companyId}/userId/${auth.user.id}/valueCompanyId/${companyIdParam}`);
  }
});

const goToEdit = (logSettingIdParam: number) => {
  router.push({ name: 'logsettingedit', params: { companyIdParam: route.params.companyIdParam, logSettingIdParam } });
};

const goToAdd = () => {
  router.push({ name: 'logsettingadd', params: { companyIdParam: route.params.companyIdParam } });
};

</script>

<template>
  <section class="pt-2 pb-2">
    <div class="container">
      <ol class="breadcrumb ms-4 me-4">
        <li class="breadcrumb-item"><router-link to="/dashboard"><span>{{ t('textLabel.dashboard') }}</span></router-link></li>
        <li class="breadcrumb-item"><router-link to="/logsetting"><span>{{ t('textLabel.logSetting', 2) }}</span></router-link></li>
        <li class="breadcrumb-item active"><span class="active">List</span></li>
      </ol>
      <div class="card mb-3 bg-gradient-dark">
        <div class="card-body ms-0 ps-0 me-0 pe-0 mt-0 pt-0 pb-0">
          <div class="table-responsive pt-2">
            <div class="row d-flex justify-content-between align-items-center me-2 mt-2 mb-2">
              <div class="col-auto">
                <h4 class="ps-3">{{ t('textLabel.logSetting', 2) }}</h4>
              </div>
              <div class="col-auto">
                <button class="btn btn-outline-primary btn-sm me-3" @click="goToAdd">
                  <i class="bi bi-plus-lg me-1"></i> {{ t('button.add') }}
                </button>
              </div>
            </div>
            <div class="ms-2 me-2 mt-2 mb-2">
              <table class="table table-hover">
                <thead>
                <tr>
                  <th>{{ t('textLabel.endpoint') }}</th>
                  <th>{{ t('textLabel.method' ) }}</th>
                  <th>{{ t('textLabel.logFormat') }}</th>
                  <th>{{ t('textLabel.enabled') }}</th>
                  <th class="text-center">{{ t('textLabel.action') }}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="d in data" :key="d.logSettingId">
                  <td><code>{{ d.logSettingEndpoint }}</code></td>
                  <td><span class="badge bg-secondary">{{ d.logSettingMethod }}</span></td>
                  <td>{{ d.logSettingLogFormat }}</td>
                  <td>
                    <span :class="d.logSettingEnabled ? 'text-success' : 'text-danger'">
                      {{ d.logSettingEnabled ? t('textLabel.true') : t('textLabel.false') }}
                    </span>
                  </td>
                  <td class="text-center">
                    <div class="btn-group" role="group">
                      <button class="btn btn-primary btn-sm" @click="goToEdit(d.logSettingId)">
                        <i class="bi bi-pencil-square me-1"></i> {{ t('button.edit') }}
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="!data || data.length === 0">
                  <td colspan="5" class="text-center italic py-4 text-muted">No log settings found for this company.</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
