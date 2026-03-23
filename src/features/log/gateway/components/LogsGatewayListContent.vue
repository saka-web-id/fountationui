<script setup lang="ts">
import { ref, onMounted, watch, computed, h } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useI18n } from 'vue-i18n';
import { getLogsGateway, getLogGatewayDetail, type LogsGateway } from '~/services/log/gateway/LogsGatewayService.ts';
import { Offcanvas } from 'bootstrap';
import { createColumnHelper } from '@tanstack/vue-table'
import { useDataTable } from '~/composables/useDataTable'
import BaseTable from '~/components/table/BaseTable.vue'

const { t } = useI18n();
const auth = useAuthStore();

const logs = ref<LogsGateway[]>([]);
const totalItems = ref(0);
const loading = ref(false);

const filterEndpoint = ref('');
const filterDateFrom = ref(new Date().toISOString().split('T')[0]);
const filterDateTo = ref(new Date().toISOString().split('T')[0]);

const selectedLog = ref<LogsGateway | null>(null);
const detailLoading = ref(false);
let offcanvasInstance: Offcanvas | null = null;
const paginationState = ref({
  pageIndex: 0,
  pageSize: 10,
});

const columnHelper = createColumnHelper<LogsGateway>()

const columns = [
  columnHelper.accessor('logGatewayEndPoint', {
    header: () => t('textLabel.endpoint'),
    cell: info => h('code', info.getValue()),
  }),
  columnHelper.accessor('logGatewayMethod', {
    header: () => h('span', { class: 'd-none d-md-inline' }, t('textLabel.method')),
    cell: info => h('span', { class: 'd-none d-md-inline badge bg-info text-dark' }, info.getValue()),
    meta: { className: 'd-none d-md-table-cell' }
  }),
  columnHelper.accessor('logGatewayStatusCode', {
    header: () => t('textLabel.statusCode'),
    cell: info => h('span', {
      class: ['badge', info.getValue() < 400 ? 'bg-success' : 'bg-danger']
    }, info.getValue()),
  }),
  columnHelper.accessor('logGatewayExecutionTime', {
    header: () => h('span', { class: 'd-none d-md-inline' }, t('textLabel.executionTime')),
    cell: info => h('span', { class: 'd-none d-md-inline ' }, info.getValue()),
    meta: { className: 'd-none d-md-table-cell' }
  }),
  columnHelper.accessor('logGatewayCreatedAt', {
    header: () => t('textLabel.createdAt'),
    cell: info => formatDate(info.getValue()),
    meta: { className: 'd-none d-md-table-cell' }
  }),
  columnHelper.display({
    id: 'actions',
    header: () => t('textLabel.action'),
    cell: info => h('button', {
      class: 'btn btn-primary btn-sm',
      onClick: (e: Event) => {
        e.stopPropagation();
        showDetail(info.row.original.logGatewayId);
      }
    }, [
      h('i', { class: 'bi bi-eye me-1' }),
      t('button.view')
    ]),
  }),
]

const { table } = useDataTable(logs, columns, {
  manualPagination: true,
  pageCount: computed(() => Math.ceil(totalItems.value / paginationState.value.pageSize)) as unknown as number,
  state: {
    pagination: paginationState.value // Inisialisasi awal
  },
  // Sinkronisasi manual jika composable mengubah internal state-nya
  onPaginationChange: (updater) => {
    if (typeof updater === 'function') {
      paginationState.value = updater(paginationState.value);
    } else {
      paginationState.value = updater;
    }
  }
})

const fetchLogs = async () => {
  if (!auth.user) return;
  loading.value = true;
  try {
    const response = await getLogsGateway(auth.user.company.companyId, auth.user.id, {
      endpoint: filterEndpoint.value,
      dateFrom: filterDateFrom.value,
      dateTo: filterDateTo.value,
      page: paginationState.value.pageIndex,
      size: paginationState.value.pageSize
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

watch([filterEndpoint, filterDateFrom, filterDateTo, () => paginationState.value.pageSize], () => {
  paginationState.value.pageIndex = 0;
  fetchLogs();
});

watch(() => paginationState.value.pageIndex, fetchLogs);

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
                <h4 class="ps-0 ps-md-3 fs-5 fs-md-3 ms-2">{{ t('textLabel.gatewayLogs') }}</h4>
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
