<script setup lang="ts">
import { onMounted } from 'vue';
import { useCampaignTable } from '../hooks/tables/useCampaignTable';
import BaseTable from '~/components/table/BaseTable.vue';

const props = defineProps<{
    companyId: string;
}>();

const emit = defineEmits(['add', 'edit']);

const { table, globalFilter, fetchData, onEdit, t } = useCampaignTable(props.companyId);

onMounted(fetchData);

onEdit((id) => {
    emit('edit', id);
});
</script>

<template>
    <div class="card p-4">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h4 class="mb-0">{{ t('campaign.listTitle') }}</h4>
            <button class="btn btn-primary" @click="emit('add')">
                <i class="fas fa-plus me-2"></i>{{ t('button.add') }}
            </button>
        </div>

        <div class="mb-3">
            <input v-model="globalFilter" type="text" class="form-control" :placeholder="t('textLabel.search')">
        </div>

        <BaseTable :table="table" />
    </div>
</template>
