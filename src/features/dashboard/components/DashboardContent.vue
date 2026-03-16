<script setup lang="ts">
/*import { onMounted } from 'vue';
import { fetchUser } from '../../../composables/useAuth';

onMounted(async () => {
  fetchUser();
});*/
</script>

<template>
  <section class="py-4">
    <div class="container d-flex flex-column align-items-center">
      <div class="w-100" style="max-width: 900px;">
        <ol class="breadcrumb mb-4">
          <li class="breadcrumb-item">
            <router-link to="/dashboard" class="text-decoration-none text-muted">
              <i class="fa fa-home me-1"></i> Home
            </router-link>
          </li>
          <li class="breadcrumb-item active text-light opacity-75">Dashboard</li>
        </ol>

        <div class="card shadow-lg border-0 rounded-4 bg-dark" style="background-color: #1e1e2d !important; color: #fff;">
          <div class="card-body p-4 d-flex flex-column overflow-auto chat-container" style="height: 65vh; min-height: 400px;">
            
            <!-- Receiver Message -->
            <div class="d-flex flex-row justify-content-start mb-4">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp" 
                   alt="Avatar" class="rounded-circle me-3 shadow-sm align-self-start mt-1" width="45" height="45" style="object-fit: cover;" />
              <div style="max-width: 75%;">
                <div class="p-3 bg-secondary bg-opacity-25 rounded-4 mb-1" style="border-top-left-radius: 4px !important;">
                  <p class="small mb-0" style="line-height: 1.5;">
                    Hello Morning,<br /><br />
                    What can I help for today? Any summary data you want?
                  </p>
                </div>
                <p class="small text-muted mb-0 ms-1 opacity-75">12:00 PM | Aug 26</p>
              </div>
            </div>

            <!-- Sender Message -->
            <div class="d-flex flex-row justify-content-end mb-4">
              <div class="text-end" style="max-width: 75%;">
                <div class="p-3 text-white rounded-4 mb-1" style="background-color: #0d6efd; border-top-right-radius: 4px !important;">
                  <p class="small mb-0" style="line-height: 1.5;">Please provide me total user register until now with graph.</p>
                </div>
                <p class="small text-muted mb-0 me-1 opacity-75">12:00 PM | Aug 26</p>
              </div>
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" 
                   alt="Avatar" class="rounded-circle ms-3 shadow-sm align-self-start mt-1" width="45" height="45" style="object-fit: cover;" />
            </div>

          </div>

          <!-- Chat Input -->
          <div class="card-footer bg-transparent border-top border-secondary border-opacity-25 p-3">
            <div class="d-flex align-items-center">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" 
                   alt="Avatar" class="rounded-circle me-3 shadow-sm" width="45" height="45" style="object-fit: cover;" />
              <div class="input-group border border-secondary border-opacity-50 rounded-pill overflow-hidden flex-nowrap shadow-sm transition-focus" style="background-color: #151521 !important;">
                <input type="text" class="form-control bg-transparent text-light border-0 shadow-none px-4 py-3" 
                       placeholder="Type your message..." />
                <button class="btn border-0 text-muted px-3 hover-text-primary d-flex align-items-center" type="button">
                  <i class="fa fa-paperclip"></i>
                </button>
                <button class="btn border-0 text-primary px-4 hover-text-primary-dark d-flex align-items-center" type="button">
                  <i class="fa fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.chat-container {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.15) transparent;
  scroll-behavior: smooth;
}
.chat-container::-webkit-scrollbar {
  width: 6px;
}
.chat-container::-webkit-scrollbar-track {
  background: transparent;
}
.chat-container::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 10px;
}
.transition-focus:focus-within {
  border-color: #0d6efd !important;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25) !important;
}
.hover-text-primary:hover i {
  color: #0d6efd !important;
  transition: color 0.2s ease-in-out;
}
.hover-text-primary-dark:hover i {
  color: #0a58ca !important;
  transition: color 0.2s ease-in-out;
}
input::placeholder {
  color: #6c757d !important;
  opacity: 1;
}
input:focus {
  outline: none;
}
</style>