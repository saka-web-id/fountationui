<script setup lang="ts">
import { useOauthTable } from '~/features/oauth/hooks/tables/useOauthTable';
import BaseTable from '~/components/table/BaseTable.vue'

const {
  table,
  globalFilter
} = useOauthTable();
</script>

<template>
  <section class="py-4">

    <div class="container">
      <ol class="breadcrumb ms-2 me-2">
        <li class="breadcrumb-item"><router-link to="/dashboard"><span>Home</span></router-link></li>
        <li class="breadcrumb-item active"><span>Oauth Providers</span></li>
      </ol>
      <div class="card ms-2 me-2 bg-gradient-dark">

        <div class="card-body ms-2 ps-0 me-2 pe-0">
          <div class="text-center pt-2 mb-0 pb-0" id="idform">
            <div class="input-group mb-2">
              <span class="d-flex w-25 ms-2 input-group-text">Company</span>
              <input class="form-control d-flex ms-0 ps-2 me-2 pe-2" type="text">
            </div>
            <div class="input-group mb-2">
              <span class="w-25 ms-2 input-group-text">Status</span>
              <input class="form-control w-25 ms-0 ps-2 me-2 pe-2" type="text">
            </div>
            <div class="text-end">
              <button class="btn btn-outline-primary btn-sm ms-2 me-2" type="button">Search</button>
            </div>
          </div>
          <div class="p-lg-4 ps-0 pe-0 mt-0 pt-3 mb-0 pb-4">
            
            <div class="row d-flex justify-content-end align-items-center me-2 mt-2 mb-2">
              <div class="col-auto">
                <input
                  v-model="globalFilter"
                  type="text"
                  class="form-control"
                  placeholder="Search..."
                />
              </div>
            </div>

            <div class="ms-2 me-2 mt-2 mb-2">
              <BaseTable :table="table" />
            </div>

            <div class="text-end">
              <button class="btn btn-primary" type="button" data-bs-target="#editModal" data-bs-toggle="modal">Add OAuth Provider</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>


<style scoped>

</style>