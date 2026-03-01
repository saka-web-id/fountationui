<script setup lang="ts">
/*import { onMounted } from 'vue';
import { fetchUser } from '../../../composables/useAuth';

onMounted(async () => {
  fetchUser();
});*/
</script>

<template>
  <section class="pt-2 pb-2">

    <div class="container">
      <ol class="breadcrumb ms-4 me-4">
        <li class="breadcrumb-item"><router-link to="/dashboard"><span>Home</span></router-link></li>
        <li class="breadcrumb-item active"><span>Dashboard</span></li>
      </ol>

      <div class="card mb-3 bg-gradient-dark">
        <div class="card-body ms-0 ps-0 me-0 pe-0 mt-0 pt-0 pb-0">
          <div class="position-relative ms-1 pe-3 pt-3 bg-gradient-dark">
            <div class="d-flex flex-row justify-content-start"><img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp" alt="Avatar 0" width="45" height="100%" />
              <div>
                <p class="bg-body-tertiary rounded-3 p-2 ms-3 mb-1 small">Hello Morning,<br /><br /><br /><br />What can i help for today ? Any summary data you want ?</p>
                <p class="text-muted rounded-3 float-end ms-3 mb-3 small">12:00 PM | Aug 26</p>
              </div>
            </div>
            <div class="d-flex flex-row justify-content-end">
              <div>
                <p class="text-white bg-info rounded-3 p-2 me-3 mb-1 small">Please provide me total user register until now with graph.</p>
                <p class="text-muted rounded-3 me-3 mb-3 small">12:00 PM | Aug 26</p>
              </div><img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" width="45" height="45" />
            </div>
          </div>
          <div class="text-muted d-flex justify-content-start align-items-center ms-1 pe-3 mt-2 pt-3">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" alt="Avatar 3" width="40" height="40" />
            <input class="form-control-lg form-control" type="text" />
            <a class="ms-2 text-muted;" href="#"><i class="fa fa-paperclip fas"></i></a>
            <a class="ms-2 text-muted;" href="#"><i class="fa fa-paper-plane-o"></i></a>
          </div>
        </div>
      </div>

      <div class="card bg-gradient-dark">
        <div class="card-body ms-0 ps-0 me-0 pe-0 mt-0 pt-0 pb-0"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>