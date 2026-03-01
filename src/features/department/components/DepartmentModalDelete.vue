<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <div class="modal fade" role="dialog" tabindex="-1" id="myModal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">{{ t('textLabel.departmentDelete') }}</h4><button class="btn-close" type="button" aria-label="Close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <p>{{ t('textLabel.departmentDeleteConfirmation') }}</p>
        </div>
        <div class="modal-footer"><button class="btn btn-light" type="button" data-bs-dismiss="modal">{{ t('button.close') }}</button><button class="btn btn-primary" type="button">{{ t('button.save') }}</button></div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>