<script setup lang="ts">
import {auth} from "~/stores/auth.ts";

</script>

<template>
  <section class="py-4">
    <div class="container">
      <ol class="breadcrumb ms-4 me-4">
        <li class="breadcrumb-item"><router-link to="/dashboard"><span>Home</span></router-link></li>
        <li class="breadcrumb-item"><a href="#"><span>Profile</span></a></li>
        <li class="breadcrumb-item active"><span>My Profile</span></li>
      </ol>

      <div class="card ms-2 me-2 bg-gradient-dark">
        <div class="card-body ms-2 ps-0 me-2 pe-0">
          <div class="p-lg-4 ps-0 pe-0 py-3">
            <div class="row gy-4 gy-md-0 mx-auto">
              <div class="col-12 col-md-6 col-lg-5 col-xxl-4 ms-0 ps-0 pe-1">
                <h5 class="text-start ms-2">Sakawijaya</h5>
                <div class="mb-0 form-floating"><label class="form-label" for="idinputemail">Email :</label><input class="mt-0 pt-4 mb-0 form-control-plaintext" type="email" id="idinputemail" value="sakawijaya@gmail.com"></div>
                <div class="mb-0 form-floating"><label class="form-label" for="idinputemail-1">Phone :</label><input class="mt-0 pt-4 mb-0 form-control-plaintext" type="email" id="idinputemail-1" value="08158224448"></div>
                <ul class="nav nav-pills flex-column ms-2 me-2 mt-2 pt-0">
                  <li class="nav-item mt-2 mb-0 active"><router-link to="/profileinformation" class="nav-link text-center active">Personal Information</router-link> </li>
                  <li class="nav-item mt-2 active"><router-link to="/profilepassword" class="nav-link text-center" style="background: #2f3337;">Change Password</router-link></li>
                  <li class="nav-item mt-2"><router-link to="/profile2fa" class="nav-link text-center" style="background: #2f3337;">2FA Authentification</router-link></li>
                </ul>
              </div>
              <div class="col">
                <div class="card mb-3 bg-gradient-dark">
                  <div class="card-body ms-0 ps-0 me-0 pe-0 mt-0 pt-0 pb-0">
                    <div class="text-center py-4" id="idform">
                      <h4 class="text-start ms-2">Change Password</h4>
                      <div class="input-group mb-2"><span class="d-flex w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">Name</span><input class="form-control d-flex ms-0 ps-2 me-2 pe-4" type="text" :value="auth.user?.name" ></div>
                      <div class="input-group mb-2"><span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">Email</span><input class="form-control me-2 pe-2" type="number"></div>
                      <div class="input-group mb-2"><span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">Phone</span><input class="form-control me-2 pe-2" type="number"></div>
                      <div class="input-group mb-2"><span class="w-25 ms-2 input-group-text" style="font-size: calc(0.6em + 0.5vw);">Company</span><input class="form-control me-2 pe-2" type="number"></div><button class="btn btn-outline-primary btn-sm ms-2 me-2" type="button">Save</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  </section>
</template>

<style scoped>

</style>