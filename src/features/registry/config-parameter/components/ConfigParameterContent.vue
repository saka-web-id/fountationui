<script setup lang="ts">
import { onMounted } from "vue";
import { useConfigParameterTable } from '../hooks/useConfigParameterTable';
import BaseTable from '~/components/table/BaseTable.vue';
import ConfigParameterModal from './ConfigParameterModal.vue';

const {
  table,
  configKeySearch,
  fetchConfigParameters,
  selectedConfigParameter,
  clearSelection,
  t
} = useConfigParameterTable();

onMounted(fetchConfigParameters);
</script>

<template>
  <section class="pt-2 pb-2">
    <div class="container">
      <ol class="breadcrumb ms-4">
        <li class="breadcrumb-item"><router-link to="/dashboard"><span>{{ t('textLabel.dashboard') }}</span></router-link></li>
        <li class="breadcrumb-item"><router-link to="/submenu/registries"><span>{{ t('textLabel.registry', 2) }}</span></router-link></li>
        <li class="breadcrumb-item active"><span class="active">{{ t('registry.configParameter', 2) }}</span></li>
      </ol>

      <div class="card mb-3 bg-gradient-dark border-secondary shadow-lg">
        <div class="card-body p-4">
          <div class="row d-flex justify-content-between align-items-center mb-4">
            <div class="col-auto">
              <h3 class="fw-bold text-white mb-0">
                {{ t('registry.configParameter', 2) }}
              </h3>
            </div>
            <div class="col-12 col-md-4 mt-3 mt-md-0 d-flex gap-2 justify-content-end">
              <div class="input-group">
                <span class="input-group-text bg-dark border-secondary text-secondary">
                  <i class="bi bi-search"></i>
                </span>
                <input v-model="configKeySearch" type="text" class="form-control bg-dark text-white border-secondary" :placeholder="t('button.search') + ' ' + t('registry.key') + '...'"/>
              </div>
            </div>
          </div>

          <div class="row mb-4">
            <div class="col-12 d-flex gap-2 align-items-center">
              <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#configParameterModal" @click="clearSelection">
                <i class="bi bi-plus-lg me-1"></i> {{ t('button.add') }} {{ t('registry.configParameter') }}
              </button>
            </div>
          </div>
          
          <div class="mt-2 table-responsive">
            <BaseTable :table="table" />
          </div>
        </div>
      </div>
    </div>

    <ConfigParameterModal :initial-data="selectedConfigParameter" @success="fetchConfigParameters" @close="clearSelection" />
  </section>
</template>

<style scoped>
.bg-gradient-dark {
  background: linear-gradient(145deg, #1a1a1a, #2a2a2a);
}
</style>
