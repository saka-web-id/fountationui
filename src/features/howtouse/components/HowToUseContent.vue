<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const currentVideoUrl = ref('https://www.youtube.com/embed/VziTO1dgeCw');
const watchedVideos = ref<string[]>([]);

onMounted(() => {
  const saved = localStorage.getItem('fountation_watched_videos');
  if (saved) {
    watchedVideos.value = JSON.parse(saved);
  }
});

const playVideo = (url: string, id: string) => {
  currentVideoUrl.value = url;
  if (!watchedVideos.value.includes(id)) {
    watchedVideos.value.push(id);
    localStorage.setItem('fountation_watched_videos', JSON.stringify(watchedVideos.value));
  }
};

const isWatched = (id: string) => watchedVideos.value.includes(id);
</script>

<template>
  <div class="row">
    <div class="col col-lg-10 col-xxl-12 mx-auto">
      <div class="card border-0 shadow-sm bg-gradient-dark">
        <div class="card-body">
          <div class="p-lg-4 py-3">
            <div class="text-center mb-5 py-3 py-lg-1">
              <h3 class="text-uppercase fs-4 fw-bold mb-3 text-primary">{{ t('app.howToUse.title') }}</h3>
              <p class="text-muted mb-4">{{ t('app.howToUse.description') }}</p>
              
              <div class="video-container shadow-sm rounded overflow-hidden mx-auto" style="max-width: 800px;">
                <div class="ratio ratio-16x9">
                  <iframe 
                    :src="currentVideoUrl" 
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
            </div>

            <div class="row gy-4 row-cols-1 row-cols-sm-2 row-cols-md-3">
              <!-- Tutorial Video -->
              <div class="col">
                <div 
                  class="card border-0 project-item h-100 shadow-sm transition-all bg-transparent"
                  :class="{ 'opacity-75': isWatched('tutorial') }"
                  @click="playVideo('https://www.youtube.com/embed/VziTO1dgeCw', 'tutorial')"
                  style="cursor: pointer;"
                >
                  <div class="position-relative">
                    <img class="img-fluid aspect-ratio-1x1 object-fit-cover card-img-top" src="/src/assets/img/howto/howto-use-fountation.svg" alt="Tutorial">
                    <div v-if="isWatched('tutorial')" class="position-absolute top-0 end-0 m-2">
                      <span class="badge bg-success shadow-sm">
                        <i class="fas fa-check-circle me-1"></i> {{ t('textLabel.watched') || 'Watched' }}
                      </span>
                    </div>
                  </div>
                  <div class="card-body">
                    <h4 class="fs-6 fw-bold mb-1">
                      <a href="javascript:void(0)" class="text-decoration-none text-dark stretched-link">
                        {{ t('app.howToUse.tutorial.title') }}
                      </a>
                    </h4>
                    <p class="mb-0 small text-muted">{{ t('app.howToUse.tutorial.description') }}</p>
                  </div>
                </div>
              </div>

              <!-- Install Video -->
              <div class="col">
                <div 
                  class="card border-0 project-item h-100 shadow-sm transition-all bg-transparent"
                  :class="{ 'opacity-75': isWatched('install') }"
                  @click="playVideo('https://www.youtube.com/embed/PdE_NKyY_o0', 'install')"
                  style="cursor: pointer;"
                >
                  <div class="position-relative">
                    <img class="img-fluid aspect-ratio-1x1 object-fit-cover card-img-top" src="/src/assets/img/howto/howto-install-fountation.svg" alt="Install">
                    <div v-if="isWatched('install')" class="position-absolute top-0 end-0 m-2">
                      <span class="badge bg-success shadow-sm">
                        <i class="fas fa-check-circle me-1"></i> {{ t('textLabel.watched') || 'Watched' }}
                      </span>
                    </div>
                  </div>
                  <div class="card-body">
                    <h4 class="fs-6 fw-bold mb-1">
                      <a href="javascript:void(0)" class="text-decoration-none text-dark stretched-link">
                        {{ t('app.howToUse.install.title') }}
                      </a>
                    </h4>
                    <p class="mb-0 small text-muted">{{ t('app.howToUse.install.description') }}</p>
                  </div>
                </div>
              </div>

              <!-- Framework Info Video -->
              <div class="col">
                <div 
                  class="card border-0 project-item h-100 shadow-sm transition-all bg-transparent"
                  :class="{ 'opacity-75': isWatched('framework') }"
                  @click="playVideo('https://www.youtube.com/embed/n036kBC1HEw', 'framework')"
                  style="cursor: pointer;"
                >
                  <div class="position-relative">
                    <img class="img-fluid aspect-ratio-1x1 object-fit-cover card-img-top" src="/src/assets/img/howto/framework-information-fountation.svg" alt="Framework">
                    <div v-if="isWatched('framework')" class="position-absolute top-0 end-0 m-2">
                      <span class="badge bg-success shadow-sm">
                        <i class="fas fa-check-circle me-1"></i> {{ t('textLabel.watched') || 'Watched' }}
                      </span>
                    </div>
                  </div>
                  <div class="card-body">
                    <h4 class="fs-6 fw-bold mb-1">
                      <a href="javascript:void(0)" class="text-decoration-none text-dark stretched-link">
                        {{ t('app.howToUse.frameworkInformation.title') }}
                      </a>
                    </h4>
                    <p class="mb-0 small text-muted">{{ t('app.howToUse.frameworkInformation.description') }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.transition-all {
  transition: all 0.3s ease;
}
.project-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
}
.aspect-ratio-16x9 {
  aspect-ratio: 16 / 9;
}
</style>