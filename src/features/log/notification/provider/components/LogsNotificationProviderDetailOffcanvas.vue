<script setup lang="ts">
import type { LogsProviderNotificationDetail } from '../interfaces/notificationProvider.interface';
import { useI18n } from 'vue-i18n';

defineProps<{
  selectedLog: LogsProviderNotificationDetail | null;
  detailLoading: boolean;
}>();

const { t } = useI18n();
</script>

<template>
  <div class="offcanvas offcanvas-end w-50" tabindex="-1" id="logNotificationProviderDetailOffcanvas" aria-labelledby="logNotificationProviderDetailOffcanvasLabel">
    <div class="offcanvas-header bg-light border-bottom">
      <h5 class="offcanvas-title" id="logNotificationProviderDetailOffcanvasLabel">{{ t('textLabel.logDetail') }}</h5>
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
              <td class="fw-bold" style="width: 30%">Log ID</td>
              <td><code>{{ selectedLog.id }}</code></td>
            </tr>
            <tr>
              <td class="fw-bold">Notification ID</td>
              <td><code>{{ selectedLog.notificationId }}</code></td>
            </tr>
            <tr>
              <td class="fw-bold">Company ID</td>
              <td><code>{{ selectedLog.companyId }}</code></td>
            </tr>
            <tr>
              <td class="fw-bold">Provider ID</td>
              <td><code>{{ selectedLog.providerId }}</code></td>
            </tr>
            <tr>
              <td class="fw-bold">{{ t('textLabel.method') }}</td>
              <td><span class="badge bg-primary">{{ selectedLog.requestMethod }}</span></td>
            </tr>
            <tr>
              <td class="fw-bold">URL</td>
              <td><code>{{ selectedLog.requestUrl }}</code></td>
            </tr>
            <tr>
              <td class="fw-bold">{{ t('textLabel.statusCode') }}</td>
              <td>
                <span :class="['badge', parseInt(selectedLog.responseCode) < 400 ? 'bg-success' : 'bg-danger']">
                  {{ selectedLog.responseCode }}
                </span>
              </td>
            </tr>
            <tr>
              <td class="fw-bold">{{ t('textLabel.executionTime') }}</td>
              <td>{{ selectedLog.executionTime }} ms</td>
            </tr>
            <tr>
              <td class="fw-bold">{{ t('textLabel.createdAt') }}</td>
              <td>{{ selectedLog.createdAt }}</td>
            </tr>
          </table>
        </div>
        
        <div class="mb-4">
          <h6 class="text-uppercase text-muted small fw-bold mb-3">Request Body</h6>
          <pre class="bg-dark text-light p-3 rounded shadow-sm" style="max-height: 200px; overflow-y: auto;">{{ selectedLog.requestBody || 'No Request Body' }}</pre>
        </div>

        <div class="mb-4">
          <h6 class="text-uppercase text-muted small fw-bold mb-3">Response Body</h6>
          <pre class="bg-dark text-light p-3 rounded shadow-sm" style="max-height: 200px; overflow-y: auto;">{{ selectedLog.responseBody || 'No Response Body' }}</pre>
        </div>

        <div>
          <h6 class="text-uppercase text-muted small fw-bold mb-3">Full Record JSON</h6>
          <pre class="bg-dark text-light p-3 rounded shadow-sm" style="max-height: 400px; overflow-y: auto;">{{ JSON.stringify(selectedLog, null, 2) }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
pre {
  font-size: 0.85rem;
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
