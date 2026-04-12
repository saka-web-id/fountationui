<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import SidebarDashboard from '~/layouts/sidebar/SidebarDashboard.vue';
import HeaderDashboard from '~/layouts/headers/HeaderDashboard.vue';
import NotificationHistoryCompanyContent from '~/features/notification/history/components/NotificationHistoryCompanyContent.vue';

const { t } = useI18n();
</script>

<template>
    <div id="wrapper">
        <SidebarDashboard />
        <HeaderDashboard />
        <section class="pt-2 pb-2">
            <div class="container">
                <ol class="breadcrumb ms-2 me-2">
                    <li class="breadcrumb-item"><router-link to="/dashboard"><span>{{ t('textLabel.dashboard') }}</span></router-link></li>
                    <li class="breadcrumb-item active"><span class="active">{{ t('textLabel.notification') }} {{ t('textLabel.history') }}</span></li>
                </ol>
                <NotificationHistoryCompanyContent />
            </div>
        </section>
    </div>
</template>

<style scoped>
</style>
