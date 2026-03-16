<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useApi } from "~/composables/useApi";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
const { data, get } = useApi();
const { t } = useI18n();
const router = useRouter();

onMounted(async () => {
  await get('/v0/authorization/permission/list/companyId/' + auth.user?.company.companyId + "/userId/" + auth.user?.id);
});

</script>

<template>
  <section class="pt-2 pb-2">
    <div class="container">
      <ol class="breadcrumb ms-4">
        <li class="breadcrumb-item"><router-link to="/dashboard"><span>{{ t('textLabel.dashboard') }}</span></router-link></li>
        <li class="breadcrumb-item active"><span class="active">{{ t('textLabel.permission', 2) }}</span></li>
      </ol>
      <div class="card mb-3 bg-gradient-dark">
        <div class="table-responsive pt-2">
          <div class="row d-flex justify-content-between align-items-center me-2 mt-2 mb-2">
            <div class="col-auto">
              <h3 class="ps-3">{{ t('textLabel.permission', 2) }}</h3>
            </div>
            <div class="col-auto">
              <button @click="router.push({ name: 'permissionadd' })" class="btn btn-outline-primary" type="button">{{ t('button.add') }}</button>
            </div>
          </div>
          <div class="table-responsive ms-2 me-2 mt-2 mb-2">
            <table class="table">
              <thead>
              <tr>
                <th class="d-none d-md-table-cell">{{ t('textLabel.number') }}</th>
                <th>{{ t('textLabel.name') }}</th>
                <th class="d-none d-md-table-cell">{{ t('textLabel.resource') }}</th>
                <th class="d-none d-md-table-cell">{{ t('textLabel.action') }}</th>
                <th class="d-none d-md-table-cell">{{ t('textLabel.description') }}</th>
                <th class="text-center">{{ t('textLabel.action') }}</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="permission in data" :key="permission.permissionId">
                <td class="d-none d-md-table-cell">{{ permission.permissionId }}</td>
                <td>{{ permission.permissionName }}</td>
                <td class="d-none d-md-table-cell">{{ permission.permissionResource }}</td>
                <td class="d-none d-md-table-cell">{{ permission.permissionAction }}</td>
                <td class="d-none d-md-table-cell">{{ permission.permissionDescription }}</td>
                <td class="text-center">
                  <div class="btn-group" role="group">
                    <button class="btn btn-primary" @click="router.push({ name: 'permissionedit', params: { permissionIdParam: permission.permissionId } })" >{{ t('button.edit') }}</button>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
