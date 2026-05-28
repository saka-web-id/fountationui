<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import { createColumnHelper, getCoreRowModel, useVueTable } from '@tanstack/vue-table';
import BaseGridView from '~/components/table/BaseGridView.vue';

const router = useRouter();
const { t } = useI18n();

interface StorageSettingItem {
  id: string;
  name: string;
  icon: string;
  route: { name: string };
  isPremium: boolean;
}

const settings = ref<StorageSettingItem[]>([
  {
    id: 'provider',
    name: t('registry.storageProvider'),
    icon: 'bi-cloud-server',
    route: { name: 'objectstorageprovider' },
    isPremium: false
  },
  {
    id: 'bucket',
    name: t('registry.storageBucket'),
    icon: 'bi-bucket',
    route: { name: 'objectstoragebucket' },
    isPremium: false
  },
  {
    id: 'upload',
    name: t('registry.objectUpload'),
    icon: 'bi-cloud-upload',
    route: { name: 'objectstorageupload' },
    isPremium: false
  }
]);

const columnHelper = createColumnHelper<StorageSettingItem>();
const columns = [
  columnHelper.accessor('name', {
    header: () => t('textLabel.name'),
    cell: info => info.getValue(),
  })
];

const table = useVueTable({
  get data() { return settings.value },
  columns,
  getCoreRowModel: getCoreRowModel(),
});

const globalFilter = ref("");

const handleNavigation = (item: StorageSettingItem) => {
  router.push(item.route);
};
</script>

<template>
  <section class="pt-2 pb-2">
    <div class="container">
      <ol class="breadcrumb ms-4">
        <li class="breadcrumb-item"><router-link to="/dashboard"><span>{{ t('textLabel.dashboard') }}</span></router-link></li>
        <li class="breadcrumb-item active"><span class="active">{{ t('registry.objectStorage') }}</span></li>
      </ol>
      <div class="card mb-3 bg-gradient-dark border-secondary shadow-lg">
        <div class="card-body p-4">
          <div class="row d-flex justify-content-between align-items-center mb-4">
            <div class="col-auto">
              <h3 class="fw-bold text-white mb-0">
                {{ t('registry.objectStorage') }}
              </h3>
            </div>
            <div class="col-12 col-md-4 mt-3 mt-md-0">
              <div class="input-group">
                <span class="input-group-text bg-dark border-secondary text-secondary">
                  <i class="bi bi-search"></i>
                </span>
                <input v-model="globalFilter" type="text" class="form-control bg-dark text-white border-secondary" :placeholder="t('button.search') + '...'"/>
              </div>
            </div>
          </div>
          
          <div class="mt-2">
            <BaseGridView :table="table">
              <template #item="{ row }">
                <div 
                  class="card h-100 bg-dark text-white border-secondary shadow-sm transition-all" 
                  :class="{ 
                    'hover-card': true
                  }"
                  @click="handleNavigation(row.original)" 
                  style="cursor: pointer"
                >
                  <div class="card-body text-center d-flex flex-column align-items-center justify-content-center py-5 position-relative">
                    <div class="icon-wrapper mb-4 rounded-circle bg-gradient-primary">
                      <i :class="['bi', row.original.icon, 'fs-1 text-white']"></i>
                    </div>
                    
                    <h4 class="card-title fw-bold mb-2">{{ row.original.name }}</h4>
                    
                    <div class="mt-3">
                      <span class="btn btn-sm btn-outline-primary rounded-pill px-4">
                        {{ t('button.adjust') || 'Configure' }}
                      </span>
                    </div>
                  </div>
                </div>
              </template>
            </BaseGridView>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hover-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.3) !important;
  border-color: var(--bs-primary) !important;
}

.bg-gradient-dark {
  background: linear-gradient(145deg, #1a1a1a, #2a2a2a);
}

.bg-gradient-primary {
  background: linear-gradient(135deg, var(--bs-primary), #0056b3);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
}

.transition-all {
  transition: all 0.3s ease;
}

.icon-wrapper {
  box-shadow: 0 4px 15px rgba(var(--bs-primary-rgb), 0.3);
}
</style>
