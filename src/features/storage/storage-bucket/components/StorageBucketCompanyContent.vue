<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useStorageBucketCompanyTable } from '../hooks/useStorageBucketCompanyTable';
import BaseTable from '~/components/table/BaseTable.vue'
import BaseGridView from '~/components/table/BaseGridView.vue'

const viewMode = ref<'list' | 'grid'>('grid');

const {
  table,
  globalFilter,
  fetchData,
  t
} = useStorageBucketCompanyTable();

const toggleViewMode = (mode: 'list' | 'grid') => {
  viewMode.value = mode;
};

onMounted(fetchData);
</script>

<template>
  <section class="pt-2 pb-2">
    <div class="container">
      <ol class="breadcrumb ms-2 me-2">
        <li class="breadcrumb-item"><router-link to="/dashboard"><span>{{ t('textLabel.dashboard') }}</span></router-link></li>
        <li class="breadcrumb-item"><router-link to="/object/storage/setting"><span>{{ t('registry.storageSetting') }}</span></router-link></li>
        <li class="breadcrumb-item active"><span class="active">{{ t('registry.storageBucket') }}</span></li>
      </ol>
      <div class="card mb-3 bg-gradient-dark">
        <div class="card-body ms-0 ps-0 me-0 pe-0 mt-0 pt-0 pb-0">
          <div class="row d-flex justify-content-between align-items-center me-2 mt-2 mb-2">
            <div class="col-auto">
              <h4 class="ps-0 ps-md-3 fs-5 fs-md-3 ms-2 text-white">{{ t('registry.storageBucket') }}</h4>
              <p class="text-secondary small ms-2 ps-0 ps-md-3 mb-0">{{ t('registry.selectCompanyFirst') }}</p>
            </div>
            <div class="col-auto d-flex gap-2 ms-2">
              <div class="btn-group me-2" role="group">
                <button
                    type="button"
                    class="btn btn-outline-primary"
                    :class="{ active: viewMode === 'list' }"
                    @click="toggleViewMode('list')"
                >
                  <i class="fa fa-list"></i>
                </button>
                <button
                    type="button"
                    class="btn btn-outline-primary"
                    :class="{ active: viewMode === 'grid' }"
                    @click="toggleViewMode('grid')"
                >
                  <i class="fa fa-th-large"></i>
                </button>
              </div>
              <input
                  v-model="globalFilter"
                  type="text"
                  class="form-control bg-dark text-white border-secondary"
                  :placeholder="t('button.search') + '...'"
              />
            </div>
          </div>
          <div class="ms-2 me-2 mt-2 mb-2">
            <BaseTable v-if="viewMode === 'list'" :table="table" />
            <BaseGridView v-else :table="table" />
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
.bg-gradient-dark {
  background: linear-gradient(145deg, #1a1a1a, #2a2a2a);
}
</style>
