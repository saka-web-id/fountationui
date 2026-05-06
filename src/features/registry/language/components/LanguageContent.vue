<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useLanguageTable } from '../hooks/useLanguageTable';
import { useLanguage } from '../hooks/useLanguage';
import BaseTable from '~/components/table/BaseTable.vue';
import type { LanguageDTO } from "~/types/registry";

const {
  table,
  languageNameSearch,
  fetchLanguages,
  t
} = useLanguageTable();

const { uploadCsv, downloadExampleCsv, loading: isUploading } = useLanguage();

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
    const nameIdx = headers.indexOf('repoLanguageName');
    const codeIdx = headers.indexOf('repoLanguageCode');
    const isoCodeIdx = headers.indexOf('repoLanguageIsoCode');
    const activeIdx = headers.indexOf('repoLanguageActive');
    const directionIdx = headers.indexOf('repoLanguageDirection');

    if (nameIdx === -1 || codeIdx === -1 || isoCodeIdx === -1 || activeIdx === -1 || directionIdx === -1) {
      alert("Invalid CSV format. Required columns: repoLanguageName, repoLanguageCode, repoLanguageIsoCode, repoLanguageActive, repoLanguageDirection");
      return;
    }

    const languages: LanguageDTO[] = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      if (values.length >= headers.length) {
        languages.push({
          repoLanguageName: values[nameIdx],
          repoLanguageCode: values[codeIdx],
          repoLanguageIsoCode: values[isoCodeIdx],
          repoLanguageActive: values[activeIdx].toLowerCase() === 'true',
          repoLanguageDirection: values[directionIdx]
        });
      }
    }

    if (languages.length > 0) {
      const success = await uploadCsv(languages);
      if (success) {
        fetchLanguages();
      }
    }
    
    // Reset file input
    if (fileInput.value) fileInput.value.value = '';
  };
  reader.readAsText(file);
};

onMounted(fetchLanguages);
</script>

<template>
  <section class="pt-2 pb-2">
    <div class="container">
      <ol class="breadcrumb ms-4">
        <li class="breadcrumb-item"><router-link to="/dashboard"><span>{{ t('textLabel.dashboard') }}</span></router-link></li>
        <li class="breadcrumb-item"><router-link to="/submenu/registries"><span>{{ t('textLabel.registry', 2) }}</span></router-link></li>
        <li class="breadcrumb-item active"><span class="active">{{ t('registry.language', 2) }}</span></li>
      </ol>

      <div class="card mb-3 bg-gradient-dark border-secondary shadow-lg">
        <div class="card-body p-4">
          <div class="row d-flex justify-content-between align-items-center mb-4">
            <div class="col-auto">
              <h3 class="fw-bold text-white mb-0">
                {{ t('registry.language', 2) }}
              </h3>
            </div>
            <div class="col-12 col-md-4 mt-3 mt-md-0 d-flex gap-2 justify-content-end">
              <div class="input-group">
                <span class="input-group-text bg-dark border-secondary text-secondary">
                  <i class="bi bi-search"></i>
                </span>
                <input v-model="languageNameSearch" type="text" class="form-control bg-dark text-white border-secondary" :placeholder="t('button.search') + ' ' + t('registry.name') + '...'"/>
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
