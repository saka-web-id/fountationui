<script setup lang="ts">
import { onMounted } from 'vue';
import { useLogsApiTable } from '~/features/log/api/hooks/tables/useLogsApiTable';
import BaseTable from '~/components/table/BaseTable.vue'

const {
  table,
  loading,
  filterEndpoint,
  filterDateFrom,
  filterDateTo,
  selectedLog,
  detailLoading,
  fetchLogs,
  formatDate,
  t
} = useLogsApiTable();

onMounted(fetchLogs);
</script>

<template>
  <section class="pt-2 pb-2">
    <div class="container-fluid px-4">
      <ol class="breadcrumb mb-4">
        <li class="breadcrumb-item"><router-link to="/dashboard">{{ t('textLabel.dashboard') }}</router-link></li>
        <li class="breadcrumb-item active">{{ t('textLabel.apiLogs') }}</li>
      </ol>

      <div class="card mb-3 bg-gradient-dark">
        <div class="card-body ms-0 ps-0 me-0 pe-0 mt-0 pt-0 pb-0">
          <div class="table-responsive pt-2">
            <div class="row d-flex justify-content-between align-items-center me-2 mt-2 mb-2">
              <div class="col-auto">
                <h4 class="ps-0 ps-md-3 fs-5 fs-md-3 ms-2">{{ t('textLabel.apiLogs') }}</h4>
              </div>
            </div>
            <!-- Filters -->
            <div class="row mb-3 g-3 ms-2 me-2 mt-2">
              <div class="col-md-4">
                <label class="form-label">{{ t('textLabel.endpoint') }}</label>
                <input v-model="filterEndpoint" type="text" class="form-control" :placeholder="t('button.search') + '...'">
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ t('textLabel.dateFrom') }}</label>
                <input v-model="filterDateFrom" type="date" class="form-control">
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ t('textLabel.dateTo') }}</label>
                <input v-model="filterDateTo" type="date" class="form-control">
              </div>
            </div>

            <!-- Table -->
            <div class="ms-2 me-2 mt-2 mb-2">
              <div v-if="loading" class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
              <BaseTable v-else :table="table" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Detail Offcanvas -->
    <div class="offcanvas offcanvas-end w-50" tabindex="-1" id="logApiDetailOffcanvas" aria-labelledby="logApiDetailOffcanvasLabel">
      <div class="offcanvas-header bg-light border-bottom">
        <h5 class="offcanvas-title" id="logApiDetailOffcanvasLabel">{{ t('textLabel.logDetail') }}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <div v-if="detailLoading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status"></div>
        </div>
        <div v-else-if="selectedLog">
          <div class="mb-4">
            <h6 class="text-uppercase text-muted small fw-bold mb-3">General Information</h6>
            <table class="table table-sm border-0">
              <tr>
                <td class="fw-bold" style="width: 30%">{{ t('textLabel.correlationId') }}</td>
                <td><code>{{ selectedLog.logCorrelationId }}</code></td>
              </tr>
              <tr>
                <td class="fw-bold">{{ t('textLabel.endpoint') }}</td>
                <td><code>{{ selectedLog.logEndPoint }}</code></td>
              </tr>
              <tr>
                <td class="fw-bold">{{ t('textLabel.method') }}</td>
                <td><span class="badge bg-primary">{{ selectedLog.logMethod }}</span></td>
              </tr>
              <tr>
                <td class="fw-bold">{{ t('textLabel.statusCode') }}</td>
                <td>
                  <span :class="['badge', selectedLog.logStatusCode < 400 ? 'bg-success' : 'bg-danger']">
                    {{ selectedLog.logStatusCode }}
                  </span>
                </td>
              </tr>
              <tr>
                <td class="fw-bold">{{ t('textLabel.executionTime') }}</td>
                <td>{{ selectedLog.logExecutionTime }} ms</td>
              </tr>
              <tr>
                <td class="fw-bold">{{ t('textLabel.createdAt') }}</td>
                <td>{{ formatDate(selectedLog.logCreatedAt) }}</td>
              </tr>
            </table>
          </div>
          
          <div v-if="selectedLog.logRequest" class="mb-4">
            <h6 class="text-uppercase text-muted small fw-bold mb-3">Request Body</h6>
            <pre class="bg-dark text-light p-3 rounded shadow-sm" style="max-height: 200px; overflow-y: auto;">{{ selectedLog.logRequest.logRequestBody || 'No Request Body' }}</pre>
          </div>

          <div v-if="selectedLog.logResponse" class="mb-4">
            <h6 class="text-uppercase text-muted small fw-bold mb-3">Response Body</h6>
            <pre class="bg-dark text-light p-3 rounded shadow-sm" style="max-height: 200px; overflow-y: auto;">{{ selectedLog.logResponse.logResponseBody || 'No Response Body' }}</pre>
          </div>

          <div>
            <h6 class="text-uppercase text-muted small fw-bold mb-3">Full Record JSON</h6>
            <pre class="bg-dark text-light p-3 rounded shadow-sm" style="max-height: 400px; overflow-y: auto;">{{ JSON.stringify(selectedLog, null, 2) }}</pre>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<style scoped>
pre {
  font-size: 0.85rem;
  white-space: pre-wrap;
  word-break: break-all;
}
.table-hover tbody tr:hover {
  background-color: rgba(0, 123, 255, 0.05);
}
</style>
