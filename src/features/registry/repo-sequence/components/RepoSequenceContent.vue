<script setup lang="ts">
import { onMounted } from "vue";
import { useRepoSequenceTable } from '../hooks/useRepoSequenceTable';
import BaseTable from '~/components/table/BaseTable.vue';
import RepoSequenceModal from './RepoSequenceModal.vue';

const props = defineProps<{
  valueCompanyId: number;
}>();

const {
  table,
  repoSequenceSearch,
  fetchRepoSequences,
  selectedRepoSequence,
  clearSelection,
  t
} = useRepoSequenceTable(props.valueCompanyId);

onMounted(fetchRepoSequences);
</script>

<template>
  <section class="pt-2 pb-2">
    <div class="container">
      <ol class="breadcrumb ms-4">
        <li class="breadcrumb-item"><router-link to="/dashboard"><span>{{ t('textLabel.dashboard') }}</span></router-link></li>
        <li class="breadcrumb-item"><router-link to="/submenu/registries"><span>{{ t('textLabel.registry', 2) }}</span></router-link></li>
        <li class="breadcrumb-item"><router-link to="/registry/repo/sequence"><span>{{ t('registry.repoSequence') }}</span></router-link></li>
        <li class="breadcrumb-item active"><span class="active">{{ t('textLabel.list') }}</span></li>
      </ol>

      <div class="card mb-3 bg-gradient-dark border-secondary shadow-lg">
        <div class="card-body p-4">
          <div class="row d-flex justify-content-between align-items-center mb-4">
            <div class="col-auto">
              <h3 class="fw-bold text-white mb-0">
                {{ t('registry.repoSequence') }}
              </h3>
            </div>
            <div class="col-12 col-md-4 mt-3 mt-md-0 d-flex gap-2 justify-content-end">
              <div class="input-group">
                <span class="input-group-text bg-dark border-secondary text-secondary">
                  <i class="bi bi-search"></i>
                </span>
                <input v-model="repoSequenceSearch" type="text" class="form-control bg-dark text-white border-secondary" :placeholder="t('button.search') + ' ' + t('registry.code') + '...'"/>
              </div>
            </div>
          </div>

          <div class="row mb-4">
            <div class="col-12 d-flex gap-2 align-items-center">
              <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#repoSequenceModal" @click="clearSelection">
                <i class="bi bi-plus-lg me-1"></i> {{ t('button.add') }} {{ t('registry.repoSequence') }}
              </button>
            </div>
          </div>
          
          <div class="mt-2 table-responsive">
            <BaseTable :table="table" />
          </div>
        </div>
      </div>
    </div>

    <RepoSequenceModal 
      :initial-data="selectedRepoSequence" 
      :value-company-id="valueCompanyId"
      @success="fetchRepoSequences" 
      @close="clearSelection" 
    />
  </section>
</template>

<style scoped>
.bg-gradient-dark {
  background: linear-gradient(145deg, #1a1a1a, #2a2a2a);
}
</style>
