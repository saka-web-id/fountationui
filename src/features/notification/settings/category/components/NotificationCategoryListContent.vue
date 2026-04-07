<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import BaseTable from '~/components/table/BaseTable.vue';
import { useNotificationCategoryTable } from "~/features/notification/settings/category/hooks/tables/useNotificationCategoryTable.ts";
import NotificationCategoryFormOffcanvas from "~/features/notification/settings/category/components/NotificationCategoryFormOffcanvas.vue";
import { Offcanvas } from 'bootstrap';

const route = useRoute();
const companyIdParam = Number(route.params.companyIdParam);

const selectedCategoryId = ref<number | null>(null);
const offcanvasComponent = ref<any>(null);
let offcanvasInstance: Offcanvas | null = null;

const onEdit = (id: number) => {
  selectedCategoryId.value = id;
  showOffcanvas();
};

const {
  table,
  globalFilter,
  fetchData,
  t,
  loading
} = useNotificationCategoryTable(companyIdParam, onEdit);

onMounted(() => {
  fetchData();
  if (offcanvasComponent.value?.root) {
    offcanvasInstance = new Offcanvas(offcanvasComponent.value.root);
  }
});

const showOffcanvas = () => {
  if (offcanvasInstance) offcanvasInstance.show();
};

const hideOffcanvas = () => {
  if (offcanvasInstance) offcanvasInstance.hide();
  selectedCategoryId.value = null;
};

const onAdd = () => {
  selectedCategoryId.value = null;
  showOffcanvas();
};

const onSuccess = () => {
  hideOffcanvas();
  fetchData();
};
</script>

<template>
  <section class="pt-2 pb-2">
    <div class="container">
      <ol class="breadcrumb ms-2 me-2">
        <li class="breadcrumb-item"><router-link to="/dashboard"><span>{{ t('textLabel.dashboard') }}</span></router-link></li>
        <li class="breadcrumb-item"><router-link :to="{ name: 'notificationsetting' }" ><span>{{ t('textLabel.notificationSetting') }}</span></router-link></li>
        <li class="breadcrumb-item"><router-link :to="{ name: 'notificationcategory', params: { companyIdParam } }" ><span>{{ t('textLabel.notificationCategory') }}</span></router-link></li>
        <li class="breadcrumb-item active"><span class="active">{{ t('textLabel.list') }}</span></li>
      </ol>

      <div class="card mb-3 bg-gradient-dark">
        <div class="card-body ms-0 ps-0 me-0 pe-0 mt-0 pt-0 pb-0">
          <div class="row d-flex justify-content-between align-items-center me-2 mt-2 mb-2">
            <div class="col-auto">
              <h4 class="ps-0 ps-md-3 fs-5 fs-md-3 ms-2">{{ t('textLabel.notificationCategory', 2) }}</h4>
            </div>
            <div class="col-auto d-flex gap-2 ms-2">
              <input
                  v-model="globalFilter"
                  type="text"
                  class="form-control"
                  :placeholder="t('button.search') + '...'"
              />
              <button class="btn btn-primary text-nowrap" @click="onAdd">
                <i class="fa fa-plus me-1"></i> {{ t('button.add') }} {{ t('textLabel.category') }}
              </button>
            </div>
          </div>
          <div class="ms-2 me-2 mt-2 mb-2">
            <div v-if="loading" class="text-center p-5">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
            <BaseTable v-else :table="table" />
          </div>
        </div>
      </div>
    </div>

    <NotificationCategoryFormOffcanvas
      ref="offcanvasComponent"
      :companyIdParam="companyIdParam"
      :categoryId="selectedCategoryId"
      @success="onSuccess"
      @close="hideOffcanvas"
    />
  </section>
</template>

<style scoped>
</style>
