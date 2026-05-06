<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useCurrencyTable } from '../hooks/useCurrencyTable';
import { useCurrency } from '../hooks/useCurrency';
import BaseTable from '~/components/table/BaseTable.vue';
import type { CurrencyDTO } from "~/types/registry";

const {
  table,
  currencyNameSearch,
  fetchCurrencies,
  t
} = useCurrencyTable();

const { uploadCsv, downloadExampleCsv, loading: isUploading } = useCurrency();

const fileInput = ref<HTMLInputElement | null>(null);

const onFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (e) => {
    const text = e.target?.result as string;
    if (!text) return;

    const lines = text.split('\n').filter(line => line.trim() !== '');
    if (lines.length < 2) return;

    const headers = lines[0].split(',').map(h => h.trim());
    const nameIdx = headers.indexOf('repoCurrencyName');
    const symbolIdx = headers.indexOf('repoCurrencySymbol');
    const positionIdx = headers.indexOf('repoCurrencyPosition');
    const activeIdx = headers.indexOf('repoCurrencyActive');

    if (nameIdx === -1 || symbolIdx === -1 || positionIdx === -1 || activeIdx === -1) {
      alert("Invalid CSV format. Required columns: repoCurrencyName, repoCurrencySymbol, repoCurrencyPosition, repoCurrencyActive");
      return;
    }

    const currencies: CurrencyDTO[] = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      if (values.length >= headers.length) {
        currencies.push({
          repoCurrencyName: values[nameIdx],
          repoCurrencySymbol: values[symbolIdx],
          repoCurrencyPosition: values[positionIdx],
          repoCurrencyActive: values[activeIdx].toLowerCase() === 'true'
        });
      }
    }

    if (currencies.length > 0) {
      const success = await uploadCsv(currencies);
      if (success) {
        fetchCurrencies();
      }
    }
    
    // Reset file input
    if (fileInput.value) fileInput.value.value = '';
  };
  reader.readAsText(file);
};

onMounted(fetchCurrencies);
</script>

<template>
  <section class="pt-2 pb-2">
    <div class="container">
      <ol class="breadcrumb ms-4">
        <li class="breadcrumb-item"><router-link to="/dashboard"><span>{{ t('textLabel.dashboard') }}</span></router-link></li>
        <li class="breadcrumb-item"><router-link to="/submenu/registries"><span>{{ t('textLabel.registry', 2) }}</span></router-link></li>
        <li class="breadcrumb-item active"><span class="active">{{ t('registry.currency', 2) }}</span></li>
      </ol>

      <div class="card mb-3 bg-gradient-dark border-secondary shadow-lg">
        <div class="card-body p-4">
          <div class="row d-flex justify-content-between align-items-center mb-4">
            <div class="col-auto">
              <h3 class="fw-bold text-white mb-0">
                {{ t('registry.currency', 2) }}
              </h3>
            </div>
            <div class="col-12 col-md-4 mt-3 mt-md-0 d-flex gap-2 justify-content-end">
              <div class="input-group">
                <span class="input-group-text bg-dark border-secondary text-secondary">
                  <i class="bi bi-search"></i>
                </span>
                <input v-model="currencyNameSearch" type="text" class="form-control bg-dark text-white border-secondary" :placeholder="t('button.search') + ' ' + t('registry.name') + '...'"/>
              </div>
            </div>
          </div>

          <div class="row mb-4">
            <div class="col-12 d-flex gap-2 align-items-center">
              <button class="btn btn-outline-success btn-sm" @click="downloadExampleCsv">
                <i class="bi bi-download me-1"></i> {{ t('campaign.downloadExample') }}
              </button>
              <div class="position-relative">
                <button class="btn btn-outline-primary btn-sm" :disabled="isUploading" @click="fileInput?.click()">
                  <i class="bi bi-upload me-1"></i> {{ isUploading ? t('button.saving') : t('campaign.uploadCSV') }}
                </button>
                <input ref="fileInput" type="file" class="d-none" accept=".csv" @change="onFileChange">
              </div>
            </div>
          </div>
          
          <div class="mt-2 table-responsive">
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
