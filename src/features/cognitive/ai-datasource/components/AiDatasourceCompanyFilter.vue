<script setup lang="ts">
import { onMounted } from 'vue';
import { useCognitiveCompanyFilterTable } from '../hooks/useCognitiveCompanyFilterTable';
import BaseTable from '~/components/table/BaseTable.vue'

const {
  table,
  globalFilter,
  fetchData,
  t
} = useCognitiveCompanyFilterTable();

onMounted(fetchData);
</script>

<template>
  <section class="pt-2 pb-2">
    <div class="container">
      <ol class="breadcrumb ms-2 me-2">
        <li class="breadcrumb-item"><router-link to="/dashboard"><span>{{ t('textLabel.dashboard') }}</span></router-link></li>
        <li class="breadcrumb-item"><router-link :to="{ name: 'cognitiveaisettings' }"><span>{{ t('cognitive.title') }}</span></router-link></li>
        <li class="breadcrumb-item active"><span class="active">{{ t('cognitive.selectCompany') }}</span></li>
      </ol>
      <div class="card mb-3 bg-gradient-dark border-secondary shadow-lg">
        <div class="card-body p-4">
          <div class="row d-flex justify-content-between align-items-center mb-4">
            <div class="col-auto">
              <h3 class="fw-bold text-white mb-0">{{ t('cognitive.selectCompany') }}</h3>
              <p class="text-muted small mb-0">{{ t('cognitive.pleaseSelectCompany') }}</p>
            </div>
            <div class="col-12 col-md-4 mt-3 mt-md-0">
              <div class="input-group">
                <span class="input-group-text bg-dark border-secondary text-secondary">
                  <i class="bi bi-search"></i>
                </span>
                <input v-model="globalFilter" type="text" class="form-control bg-dark text-white border-secondary" :placeholder="t('button.search') + '...'"/>
              </div>
            </div>
          </div>
          
          <div class="table-responsive">
            <BaseTable :table="table" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bg-gradient-dark {
  background: linear-gradient(145deg, #1a1a1a, #2a2a2a);
}
</style>
