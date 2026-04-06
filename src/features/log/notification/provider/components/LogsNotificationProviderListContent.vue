<script setup lang="ts">
import { onMounted } from 'vue';
import { useNotificationProviderForm } from '../hooks/forms/useNotificationProviderForm';
import { useNotificationProviderTable } from '../hooks/tables/useNotificationProviderTable';
import BaseTable from '~/components/table/BaseTable.vue';
import LogsNotificationProviderDetailOffcanvas from './LogsNotificationProviderDetailOffcanvas.vue';

const {
  filters,
  companies,
  providers,
  notificationTypes
} = useNotificationProviderForm();

const {
  table,
  loading,
  selectedLog,
  detailLoading,
  fetchLogs,
  t
} = useNotificationProviderTable(filters);

onMounted(async () => {
  // Wait for initial providers to be fetched by the form hook before fetching logs
  // But actually the table hook watches providerId, so it will fetch automatically 
  // once providerId is set by useNotificationProviderForm's onMounted.
});
</script>

<template>
  <section class="pt-2 pb-2">
    <div class="container-fluid px-4">
      <ol class="breadcrumb mb-4">
        <li class="breadcrumb-item"><router-link to="/dashboard">{{ t('textLabel.dashboard') }}</router-link></li>
        <li class="breadcrumb-item active">Notification Provider Logs</li>
      </ol>

      <div class="card mb-3 bg-gradient-dark">
        <div class="card-body ms-0 ps-0 me-0 pe-0 mt-0 pt-0 pb-0">
          <div class="table-responsive pt-2">
            <div class="row d-flex justify-content-between align-items-center me-2 mt-2 mb-2">
              <div class="col-auto">
                <h4 class="ps-0 ps-md-3 fs-5 fs-md-3 ms-2">Notification Provider Logs</h4>
              </div>
            </div>

            <!-- Filters -->
            <div class="row mb-3 g-3 ms-2 me-2 mt-2">
              <div class="col-md-2">
                <label class="form-label">{{ t('textLabel.type') }}</label>
                <select v-model="filters.notificationType" class="form-select">
                  <option v-for="type in notificationTypes" :key="type" :value="type">
                    {{ type }}
                  </option>
                </select>
              </div>
              <div class="col-md-3">
                <label class="form-label">{{ t('textLabel.company').split('|')[0].trim() }}</label>
                <select v-model="filters.companyId" class="form-select">
                  <option :value="null" disabled>Select Company</option>
                  <option v-for="company in companies" :key="company.companyId" :value="company.companyId">
                    {{ company.companyName }}
                  </option>
                </select>
              </div>
              <div class="col-md-3">
                <label class="form-label">{{ t('textLabel.provider') }}</label>
                <select v-model="filters.providerId" class="form-select" :disabled="!filters.companyId">
                  <option :value="null" disabled>Select Provider</option>
                  <option v-for="provider in providers" :key="provider.providerId" :value="provider.providerId">
                    {{ provider.providerName }}
                  </option>
                </select>
              </div>
              <div class="col-md-2">
                <label class="form-label">{{ t('textLabel.dateFrom') }}</label>
                <input v-model="filters.dateFrom" type="date" class="form-control">
              </div>
              <div class="col-md-2">
                <label class="form-label">{{ t('textLabel.dateTo') }}</label>
                <input v-model="filters.dateTo" type="date" class="form-control">
              </div>
            </div>

            <div class="row mb-3 ms-2 me-2">
              <div class="col-md-2">
                <label class="form-label">{{ t('textLabel.pageSize') }}</label>
                <select v-model="filters.size" class="form-select">
                  <option :value="10">10</option>
                  <option :value="20">20</option>
                  <option :value="30">30</option>
                  <option :value="50">50</option>
                  <option :value="100">100</option>
                </select>
              </div>
              <div class="col-md-10 d-flex align-items-end justify-content-end">
                <button class="btn btn-primary" @click="fetchLogs" :disabled="loading || !filters.providerId">
                  <i class="bi bi-arrow-clockwise me-1"></i> Refresh
                </button>
              </div>
            </div>

            <!-- Table -->
            <div class="ms-2 me-2 mt-2 mb-2">
              <div v-if="loading" class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
              <div v-else-if="!filters.providerId" class="text-center py-5 text-muted">
                Please select a company and provider to view logs.
              </div>
              <BaseTable v-else :table="table" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Detail Offcanvas -->
    <LogsNotificationProviderDetailOffcanvas 
      :selected-log="selectedLog" 
      :detail-loading="detailLoading" 
    />
  </section>
</template>

<style scoped>
.table-hover tbody tr:hover {
  background-color: rgba(0, 123, 255, 0.05);
}
</style>
