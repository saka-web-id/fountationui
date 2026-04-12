<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLogSettingCompanyTable } from "~/features/log/setting/hooks/tables/useLogSettingCompanyTable.ts";
import BaseTable from '~/components/table/BaseTable.vue'
import BaseGridView from '~/components/table/BaseGridView.vue'

const router = useRouter();
const viewMode = ref<'list' | 'grid'>('list');

const {
  table,
  globalFilter,
  fetchData,
  t
} = useLogSettingCompanyTable();

const toggleViewMode = (mode: 'list' | 'grid') => {
  viewMode.value = mode;
};

const goToList = (companyIdParam: number) => {
    router.push({ name: 'logsettinglist', params: { companyIdParam } });
};

onMounted(fetchData);

</script>

<template>
  <section class="pt-2 pb-2">
    <div class="container">
      <ol class="breadcrumb ms-2 me-2">
        <li class="breadcrumb-item"><router-link to="/dashboard"><span>{{ t('textLabel.dashboard') }}</span></router-link></li>
        <li class="breadcrumb-item"><span>{{ t('textLabel.setting') }}</span></li>
        <li class="breadcrumb-item active"><span class="active">{{ t('textLabel.logSetting', 2) }}</span></li>
      </ol>
      <div class="card mb-3 border-0 shadow-sm">
        <div class="card-body">
          <div class="row d-flex justify-content-between align-items-center mb-4">
            <div class="col-auto">
              <h4 class="mb-0">{{ t('textLabel.logSetting', 2) }}</h4>
            </div>
            <div class="col-auto d-flex gap-2">
              <div class="btn-group" role="group">
                <button 
                  type="button" 
                  class="btn btn-outline-primary btn-sm"
                  :class="{ active: viewMode === 'list' }"
                  @click="toggleViewMode('list')"
                >
                  <i class="fa fa-list"></i>
                </button>
                <button 
                  type="button" 
                  class="btn btn-outline-primary btn-sm"
                  :class="{ active: viewMode === 'grid' }"
                  @click="toggleViewMode('grid')"
                >
                  <i class="fa fa-th-large"></i>
                </button>
              </div>
              <div style="width: 200px;">
                <input
                  v-model="globalFilter"
                  type="text"
                  class="form-control form-control-sm"
                  :placeholder="t('button.search') + '...'"
                />
              </div>
            </div>
          </div>
          
          <div v-if="viewMode === 'list'">
            <BaseTable :table="table" />
          </div>
          <div v-else>
            <BaseGridView :table="table">
              <template #item="{ row }">
                <div class="card h-100 border-0 shadow-sm hover-shadow transition-all" @click="goToList(row.original.companyId)" style="cursor: pointer;">
                  <div class="card-body text-center py-4">
                    <div class="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width: 60px; height: 60px;">
                      <i class="fas fa-building text-primary fs-3"></i>
                    </div>
                    <h5 class="card-title text-truncate">{{ row.original.companyName }}</h5>
                    <p class="card-text text-muted small text-truncate">{{ row.original.companyEmail }}</p>
                    <button class="btn btn-outline-primary btn-sm mt-2">{{ t('button.view') }}</button>
                  </div>
                </div>
              </template>
            </BaseGridView>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<style scoped>
.hover-shadow:hover {
    box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
    transform: translateY(-2px);
}
.transition-all {
    transition: all 0.2s ease-in-out;
}
</style>
