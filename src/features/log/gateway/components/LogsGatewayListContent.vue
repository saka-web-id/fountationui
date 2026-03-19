<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useI18n } from 'vue-i18n';
import { getLogsGateway, getLogGatewayDetail, type LogsGateway } from '~/services/log/gateway/LogsGatewayService.ts';
import { Offcanvas } from 'bootstrap';

const { t } = useI18n();
const auth = useAuthStore();

const logs = ref<LogsGateway[]>([]);
const totalItems = ref(0);
const currentPage = ref(0);
const pageSize = ref(10);
const loading = ref(false);

const filterEndpoint = ref('');
const filterDateFrom = ref(new Date().toISOString().split('T')[0]);
const filterDateTo = ref(new Date().toISOString().split('T')[0]);

const selectedLog = ref<LogsGateway | null>(null);
const detailLoading = ref(false);
let offcanvasInstance: Offcanvas | null = null;

const fetchLogs = async () => {
  if (!auth.user) return;
  loading.value = true;
  try {
    const response = await getLogsGateway(auth.user.company.companyId, auth.user.id, {
      endpoint: filterEndpoint.value,
      dateFrom: filterDateFrom.value,
      dateTo: filterDateTo.value,
      page: currentPage.value,
      size: pageSize.value
    });
    logs.value = response.logGatewayData;
    totalItems.value = response.logGatewayTotalItems;
  } catch (error) {
    console.error("Failed to fetch logs:", error);
  } finally {
    loading.value = false;
  }
};

const showDetail = async (id: number) => {
  if (!auth.user) return;
  detailLoading.value = true;
  selectedLog.value = null;
  
  const element = document.getElementById('logDetailOffcanvas');
  if (element) {
    offcanvasInstance = new Offcanvas(element);
    offcanvasInstance.show();
  }

  try {
    selectedLog.value = await getLogGatewayDetail(auth.user.company.companyId, auth.user.id, id);
  } catch (error) {
    console.error("Failed to fetch log detail:", error);
  } finally {
    detailLoading.value = false;
  }
};

const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleString();
};

onMounted(fetchLogs);

watch([filterEndpoint, filterDateFrom, filterDateTo, pageSize], () => {
  currentPage.value = 0;
  fetchLogs();
});

watch(currentPage, fetchLogs);

const totalPages = () => Math.ceil(totalItems.value / pageSize.value);

</script>

<template>
  <section class="pt-2 pb-2">
    <div class="container-fluid px-4">
      <ol class="breadcrumb mb-4">
        <li class="breadcrumb-item"><router-link to="/dashboard">{{ t('textLabel.dashboard') }}</router-link></li>
        <li class="breadcrumb-item active">{{ t('textLabel.gatewayLogs') }}</li>
      </ol>

      <div class="card mb-3 bg-gradient-dark">
        <div class="card-body ms-0 ps-0 me-0 pe-0 mt-0 pt-0 pb-0">
          <div class="table-responsive pt-2">
            <div class="row d-flex justify-content-between align-items-center me-2 mt-2 mb-2">
              <div class="col-auto">
                <h4 class="ps-3">{{ t('textLabel.gatewayLogs') }}</h4>
              </div>
            </div>
            <!-- Filters -->
            <div class="row mb-3 g-3 ms-2 me-2 mt-2">
              <div class="col-md-4">
              <label class="form-label">{{ t('textLabel.endpoint') }}</label>
              <input v-model="filterEndpoint" type="text" class="form-control" :placeholder="t('button.search') + '...'">
            </div>
            <div class="col-md-3">
              <label class="form-label">{{ t('textLabel.dateFrom') }}</label>
              <input v-model="filterDateFrom" type="date" class="form-control">
            </div>
            <div class="col-md-3">
              <label class="form-label">{{ t('textLabel.dateTo') }}</label>
              <input v-model="filterDateTo" type="date" class="form-control">
            </div>
            <div class="col-md-2">
              <label class="form-label">{{ t('textLabel.pageSize') }}</label>
              <select v-model="pageSize" class="form-select">
                <option :value="10">10</option>
                <option :value="25">25</option>
                <option :value="50">50</option>
                <option :value="100">100</option>
              </select>
            </div>
          </div>

          <!-- Table -->
          <div class="ms-2 me-2 mt-2 mb-2">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>{{ t('textLabel.endpoint') }}</th>
                  <th class="d-none d-md-table-cell">{{ t('textLabel.method') }}</th>
                  <th class="d-none d-md-table-cell">{{ t('textLabel.statusCode') }}</th>
                  <th class="d-none d-md-table-cell">{{ t('textLabel.executionTime') }}</th>
                  <th class="d-none d-md-table-cell">{{ t('textLabel.createdAt') }}</th>
                  <th class="text-center">{{ t('textLabel.action') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="loading">
                  <td colspan="6" class="text-center py-5">
                    <div class="spinner-border text-primary" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </td>
                </tr>
                <tr v-else-if="logs.length === 0">
                  <td colspan="6" class="text-center py-4 text-muted">{{ t('textLabel.noData') }}</td>
                </tr>
                <tr v-for="log in logs" :key="log.logGatewayId" @click="showDetail(log.logGatewayId)" style="cursor: pointer">
                  <td><code>{{ log.logGatewayEndPoint }}</code></td>
                  <td class="d-none d-md-table-cell"><span class="badge bg-info text-dark">{{ log.logGatewayMethod }}</span></td>
                  <td class="d-none d-md-table-cell">
                    <span :class="['badge', log.logGatewayStatusCode < 400 ? 'bg-success' : 'bg-danger']">
                      {{ log.logGatewayStatusCode }}
                    </span>
                  </td>
                  <td class="d-none d-md-table-cell">{{ log.logGatewayExecutionTime }} ms</td>
                  <td class="d-none d-md-table-cell">{{ formatDate(log.logGatewayCreatedAt) }}</td>
                  <td class="text-center">
                    <button class="btn btn-primary btn-sm" @click.stop="showDetail(log.logGatewayId)">
                      <i class="bi bi-eye me-1"></i> {{ t('button.view') }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="d-flex justify-content-between align-items-center mt-3 ms-4 me-4 mb-3">
            <div class="text-muted small">
              Showing {{ (currentPage * pageSize) + 1 }} to {{ Math.min((currentPage + 1) * pageSize, totalItems) }} of {{ totalItems }} entries
            </div>
            <nav v-if="totalPages() > 1">
              <ul class="pagination mb-0">
                <li class="page-item" :class="{ disabled: currentPage === 0 }">
                  <a class="page-link" href="#" @click.prevent="currentPage--">{{ t('textLabel.previous') }}</a>
                </li>
                <li v-for="p in totalPages()" :key="p" class="page-item" :class="{ active: currentPage === p - 1 }">
                  <a class="page-link" href="#" @click.prevent="currentPage = p - 1">{{ p }}</a>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages() - 1 }">
                  <a class="page-link" href="#" @click.prevent="currentPage++">{{ t('textLabel.next') }}</a>
                </li>
              </ul>
            </nav>
          </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Detail Offcanvas -->
    <div class="offcanvas offcanvas-end w-50" tabindex="-1" id="logDetailOffcanvas" aria-labelledby="logDetailOffcanvasLabel">
      <div class="offcanvas-header bg-light border-bottom">
        <h5 class="offcanvas-title" id="logDetailOffcanvasLabel">{{ t('textLabel.logDetail') }}</h5>
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
                <td><code>{{ selectedLog.logGatewayCorrelationId }}</code></td>
              </tr>
              <tr>
                <td class="fw-bold">{{ t('textLabel.endpoint') }}</td>
                <td><code>{{ selectedLog.logGatewayEndPoint }}</code></td>
              </tr>
              <tr>
                <td class="fw-bold">{{ t('textLabel.method') }}</td>
                <td><span class="badge bg-info text-dark">{{ selectedLog.logGatewayMethod }}</span></td>
              </tr>
              <tr>
                <td class="fw-bold">{{ t('textLabel.statusCode') }}</td>
                <td>
                  <span :class="['badge', selectedLog.logGatewayStatusCode < 400 ? 'bg-success' : 'bg-danger']">
                    {{ selectedLog.logGatewayStatusCode }}
                  </span>
                </td>
              </tr>
              <tr>
                <td class="fw-bold">{{ t('textLabel.clientIp') }}</td>
                <td>{{ selectedLog.logGatewayClientIp }}</td>
              </tr>
              <tr>
                <td class="fw-bold">{{ t('textLabel.executionTime') }}</td>
                <td>{{ selectedLog.logGatewayExecutionTime }} ms</td>
              </tr>
              <tr>
                <td class="fw-bold">{{ t('textLabel.createdAt') }}</td>
                <td>{{ formatDate(selectedLog.logGatewayCreatedAt) }}</td>
              </tr>
            </table>
          </div>
          
          <div>
            <h6 class="text-uppercase text-muted small fw-bold mb-3">Raw JSON Data</h6>
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
