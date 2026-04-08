<script setup lang="ts">
import { onMounted } from 'vue';
import BaseTable from '~/components/table/BaseTable.vue';
import { useTemplateCompanyTable } from '../hooks/tables/useTemplateCompanyTable';

const { table, globalFilter, fetchData, t } = useTemplateCompanyTable();
onMounted(fetchData);
</script>

<template>
  <section class="pt-2 pb-2">
    <div class="container">
      <ol class="breadcrumb ms-2 me-2">
        <li class="breadcrumb-item"><router-link to="/dashboard"><span>{{ t('textLabel.dashboard') }}</span></router-link></li>
        <li class="breadcrumb-item active"><span class="active">{{ t('textLabel.template') }}</span></li>
      </ol>
      <div class="card mb-3">
        <div class="card-body">
          <div class="row d-flex justify-content-between align-items-center mb-3">
            <div class="col-auto">
              <h4>{{ t('textLabel.company', 2) }}</h4>
            </div>
            <div class="col-auto">
              <input v-model="globalFilter" type="text" class="form-control" :placeholder="t('button.search') + '...'" />
            </div>
          </div>
          <BaseTable :table="table" />
        </div>
      </div>
    </div>
  </section>
</template>
