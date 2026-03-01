<script setup lang="ts">

</script>

<template>
  <section class="pt-2 pb-2">
    <ol class="breadcrumb ms-4">
      <li class="breadcrumb-item"><router-link to="/dashboard"><span>Home</span></router-link></li>
      <li class="breadcrumb-item"><router-link to="/user"><span>Users</span></router-link></li>
      <li class="breadcrumb-item active"><span>Password</span></li>
    </ol>
    <div class="container">
      <div class="card mb-3 bg-gradient-dark">
        <div class="card-body ms-0 ps-0 me-0 pe-0 mt-0 pt-0 pb-0">
          <div class="text-center py-4" id="idform">
            <h4 class="text-start ms-2">User Password</h4>
            <div class="input-group mb-2"><span class="d-flex w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">Old Password</span><input class="form-control" type="password"></div>
            <div class="input-group mb-2"><span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">New Password</span><input class="form-control" type="password" inputmode="email"></div>
            <div class="input-group mb-2"><span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">Confirm Password</span><input class="form-control" type="password"></div>
            <div class="text-start ms-3"><small class="text-center" style="color: var(--bs-secondary);">*Administrator no need to input Old Password</small></div>
            <div class="text-start">
              <div class="input-group mb-2"></div><button class="btn btn-outline-primary ms-2 me-2" type="submit">Save</button>
            </div>
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