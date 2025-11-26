<script setup lang="ts">

</script>

<template>
  <section class="py-4">

    <div class="container">
      <ol class="breadcrumb ms-4 me-4">
        <li class="breadcrumb-item"><router-link to="/dashboard"><span>Home</span></router-link></li>
        <li class="breadcrumb-item active"><span>Oauth Providers</span></li>
      </ol>
      <div class="card ms-2 me-2 bg-gradient-dark">

        <div class="card-body ms-2 ps-0 me-2 pe-0">
          <div class="text-center pt-2 mb-0 pb-0" id="idform">
            <div class="input-group mb-2"><span class="d-flex w-25 ms-2 input-group-text">Company</span><input class="form-control d-flex ms-0 ps-2 me-2 pe-2" type="text"></div>
            <div class="input-group mb-2"><span class="w-25 ms-2 input-group-text">Status</span><input class="form-control w-25 ms-0 ps-2 me-2 pe-2" type="text"></div>
            <div class="text-end"><button class="btn btn-outline-primary btn-sm ms-2 me-2" type="button">Search</button></div>
          </div>
          <div class="p-lg-4 ps-0 pe-0 mt-0 pt-3 mb-0 pb-4">
            <div class="table-responsive">
              <table class="table table-bordered">
                <thead>
                <tr>
                  <th class="text-center">Name</th>
                  <th class="text-center">Company</th>
                  <th class="text-center">Being used for</th>
                  <th class="text-center">Verified</th>
                  <th class="text-center">Action</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td class="text-center">Google OAuth</td>
                  <td class="text-center">PT Auan DBB</td>
                  <td class="text-center">Email</td>
                  <td class="text-center">Yes</td>
                  <td class="text-center">
                    <div class="btn-group btn-group-sm" role="group"><button class="btn btn-primary" type="button" data-bs-target="#editModal" data-bs-toggle="modal">Edit</button><button class="btn btn-danger" type="button" data-bs-target="#deleteModal" data-bs-toggle="modal">Delete</button></div>
                  </td>
                </tr>
                <tr>
                  <td class="text-center">Microsoft 365</td>
                  <td class="text-center">PT Assarrra</td>
                  <td class="text-center">None</td>
                  <td class="text-center">No</td>
                  <td class="text-center">
                    <div class="btn-group btn-group-sm" role="group"><button class="btn btn-primary" type="button" data-bs-target="#editModal" data-bs-toggle="modal">Edit</button><button class="btn btn-danger" type="button" data-bs-target="#deleteModal" data-bs-toggle="modal">Delete</button></div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="text-end"><button class="btn btn-primary" type="button" data-bs-target="#editModal" data-bs-toggle="modal">Add OAuth Provider</button></div>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<style scoped>

</style>