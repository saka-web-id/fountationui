<script setup lang="ts">
import { onMounted, onUnmounted, shallowRef, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { useApi } from '~/composables/useApi';
import { useAuthStore } from '~/stores/auth';
import type { TemplateDTO } from '~/features/notification/templates/interfaces/template.interface';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import grapesjsmjml from 'grapesjs-mjml';

const props = defineProps<{
  templateId: number;
}>();

const router = useRouter();
const auth = useAuthStore();

const { data: template, get: getTemplate } = useApi<TemplateDTO>();
const { put: updateTemplate } = useApi();
const editor = shallowRef<any>(null);

onMounted(async () => {
  await getTemplate(`/v0/notification/templates/detail/companyId/${auth.user?.company.companyId}/userId/${auth.user?.id}/templateId/${props.templateId}`);

  if (template.value) {
    editor.value = grapesjs.init({
      container: '#gjs',
      fromElement: false,
      height: '100%',
      width: 'auto',
      storageManager: false,
      plugins: [grapesjsmjml],
      pluginsOpts: {
        'grapesjs-mjml': {
          resetBlocks: false,
        }
      },
      blockManager: {
        appendTo: '#blocks-container',
      }
    });

    const contentJson = template.value.notiTemplateContentJson;
    if (contentJson && Object.keys(contentJson).length > 0) {
      editor.value.loadProjectData(contentJson);
    } else {
      editor.value.setComponents(`
        <mjml>
          <mj-body>
            <mj-section>
              <mj-column>
                <mj-text>Content here</mj-text>
              </mj-column>
            </mj-section>
          </mj-body>
        </mjml>
      `);
    }

    nextTick(() => {
      if (editor.value) {
        editor.value.Blocks.render();
      }
    });
  }
});

onUnmounted(() => {
  if (editor.value) {
    editor.value.destroy();
    editor.value = null;
  }
});

const save = async () => {
  if (!editor.value || !template.value) return;

  const contentJson = editor.value.getProjectData();
  const contentCompiled = editor.value.getHtml();

  const payload: TemplateDTO = {
    ...template.value,
    notiTemplateContentJson: contentJson,
    notiTemplateContentCompiled: contentCompiled
  };

  await updateTemplate(`/v0/notification/templates/update/companyId/${auth.user?.company.companyId}/userId/${auth.user?.id}/templateId/${props.templateId}`, payload);
};

const goBack = () => {
    router.back();
};
</script>

<template>
  <div class="designer-container">
    <header class="designer-header d-flex justify-content-between align-items-center p-2 bg-dark text-white">
      <div>
        <button class="btn btn-outline-light btn-sm me-2" @click="goBack" style="position: relative; z-index: 1001;">
          <i class="fas fa-arrow-left"></i> Back
        </button>
        <span>Designing: {{ template?.notiTemplateName }}</span>
      </div>
      <button class="btn btn-success btn-sm" @click="save">
        <i class="fas fa-save"></i> Save Template
      </button>
    </header>

    <main class="editor-main">
      <div id="gjs"></div>

      <aside class="sidebar">
        <div class="sidebar-header">Blocks</div>
        <div id="blocks-container"></div>
      </aside>
    </main>
  </div>
</template>

<style scoped>
.designer-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.designer-header {
  height: 56px;
  flex-shrink: 0;
  z-index: 1000;
  border-bottom: 1px solid #111;
}

.editor-main {
  display: flex;
  flex: 1;
  overflow: hidden;
  position: relative;
}

#gjs {
  flex: 1;
  height: 100%;
}

.sidebar {
  width: 280px;
  background-color: #2d2d2d;
  border-left: 1px solid #444;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

#blocks-container {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}

:deep(.gjs-pn-views),
:deep(.gjs-pn-commands),
:deep(.gjs-pn-options) {
  display: none !important;
}

:deep(.gjs-toolbar) {
  display: block !important;
  z-index: 9999 !important;
  opacity: 1 !important;
  visibility: visible !important;
}

:deep(.gjs-highlighter) {
  pointer-events: none;
}

:deep(.gjs-cv-canvas) {
  width: 100% !important;
  height: 100% !important;
  top: 0 !important;
}
</style>
