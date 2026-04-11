<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import CampaignList from '~/features/notification/campaign/components/CampaignList.vue';
import CampaignForm from '~/features/notification/campaign/components/CampaignForm.vue';
import HeaderDashboard from "~/layouts/headers/HeaderDashboard.vue";
import SidebarDashboard from "~/layouts/sidebar/SidebarDashboard.vue";

const route = useRoute();
const companyId = route.params.companyIdParam as string;

const viewMode = ref<'list' | 'add' | 'edit'>('list');
const selectedCampaignId = ref<number | undefined>(undefined);

const onAdd = () => {
    viewMode.value = 'add';
    selectedCampaignId.value = undefined;
};

const onEdit = (id: number) => {
    selectedCampaignId.value = id;
    viewMode.value = 'edit';
};

const onSaved = () => {
    viewMode.value = 'list';
};

const onCancel = () => {
    viewMode.value = 'list';
};
</script>

<template>
  <div id="wrapper">
    <SidebarDashboard />
    <HeaderDashboard />
  </div>
    <div class="container-fluid py-4">
        <div v-if="viewMode === 'list'">
            <CampaignList :company-id="companyId" @add="onAdd" @edit="onEdit" />
        </div>
        <div v-else>
            <CampaignForm 
                :company-id="companyId" 
                :campaign-id="selectedCampaignId" 
                @saved="onSaved" 
                @cancel="onCancel" 
            />
        </div>
    </div>
</template>
