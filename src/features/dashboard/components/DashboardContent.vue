<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

/*const user = ref(null);
const isAuthenticated = ref(false);*/

onMounted(async () => {

 /* const res = await fetch("http://www.myproject.local:8080/user/detail", {
    credentials: "include" // important: send cookies
  });*/

  axios.get('http://www.myproject.local:8080/user/detail', { withCredentials: true })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });

  console.log("HELLO WORLD");

  /*if (res.ok) {

    const data = await res.json();
    isAuthenticated.value = data.authenticated;
    console.log("BODY = " + data.authenticated);
    if (data.authenticated) {
      user.value = data;
      console.log("User = " + user.value);
    }
  } else {
    isAuthenticated.value = false;
  }*/
});
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
          <div class="text-center py-4" id="idform">
            <div class="input-group mb-2"><span class="d-flex w-25 ms-2 input-group-text">Company</span><input class="form-control d-flex ms-0 ps-5 me-2 pe-4" type="text"></div>
            <div class="input-group mb-2"><span class="w-25 ms-2 input-group-text">Status</span><input class="form-control w-25 ms-0 ps-5 me-2 pe-4" type="text"></div>
            <div class="text-end"><button class="btn btn-outline-primary btn-sm ms-2 me-2" type="button">Search</button></div>
          </div>
          <div class="text-end">
            <div class="table-responsive ms-2 me-2 mt-2 mb-2">
              <table class="table">
                <thead>
                <tr>
                  <th>No</th>
                  <th>Department</th>
                  <th>Manager</th>
                  <th>Employees</th>
                  <th>Assets</th>
                  <th class="text-center">Action</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>1</td>
                  <td>IT Depart.</td>
                  <td>Sakawijaya</td>
                  <td>50</td>
                  <td>50</td>
                  <td class="text-center">
                    <div class="btn-group" role="group"><button class="btn btn-primary" type="button">Edit</button><button class="btn btn-danger" type="button">Delete</button></div>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>GA Depart.</td>
                  <td>Surohige</td>
                  <td>5</td>
                  <td>5</td>
                  <td class="text-center">
                    <div class="btn-group" role="group"><button class="btn btn-primary" type="button">Edit</button><button class="btn btn-danger" type="button">Delete</button></div>
                  </td>
                </tr>
                </tbody>
              </table>
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