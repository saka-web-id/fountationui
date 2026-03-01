<script setup lang="ts">

</script>

<template>
  <section class="pt-2 pb-2">

    <div class="container">
      <ol class="breadcrumb ms-4 me-4">
        <li class="breadcrumb-item"><router-link to="/dashboard"><span>Home</span></router-link></li>
        <li class="breadcrumb-item active"><span>Activity Logs</span></li>
      </ol>
      <div class="card mb-3 bg-gradient-dark">
        <div class="card-body ms-0 ps-0 me-0 pe-0 mt-0 pt-0 pb-0">
          <div class="text-center py-4" id="idform">
            <h4 class="text-start ms-2">Activity Logs</h4>
            <ul class="list-group list-group-flush">
              <li class="list-group-item d-flex mt-1 pt-0 mb-0 pb-1">
                <div class="text-start w-75 mt-0 mb-0 pb-0"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-info-circle me-2" style="width: 24px;height: 24px;color: var(--bs-blue);">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"></path>
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"></path>
                </svg><span class="me-2 mt-0 pt-0 mb-0">Sakawijaya - PT IHS Indonesia</span><small class="text-secondary me-0 mt-0 pt-0 mb-0">Login timestamp</small></div>
                <div class="text-end w-25"><sub>2025-09-17 23:47:00</sub></div>
              </li>
              <li class="list-group-item d-flex mt-1 pt-0 mb-0 pb-1">
                <div class="text-start w-75 mt-0 mb-0 pb-0"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-exclamation-diamond me-2" style="width: 24px;height: 24px;color: var(--bs-warning);">
                  <path d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z"></path>
                  <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"></path>
                </svg><span class="me-2 mt-0 pt-0 mb-0">John Doe - PT ABC Corp</span><small class="text-secondary me-0 mt-0 pt-0 mb-0">Login multiple time use several device</small></div>
                <div class="text-end w-25"><sub>2025-09-17 23:47:00</sub></div>
              </li>
              <li class="list-group-item d-flex mt-1 pt-0 mb-0 pb-1">
                <div class="text-start w-75 mt-0 mb-0 pb-0"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-exclamation-diamond me-2" style="width: 24px;height: 24px;color: var(--bs-warning);">
                  <path d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z"></path>
                  <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"></path>
                </svg><span class="me-2 mt-0 pt-0 mb-0">John Doe - PT ABC Corp</span><small class="text-secondary me-0 mt-0 pt-0 mb-0">Login multiple time use several device</small></div>
                <div class="text-end w-25"><sub>2025-09-17 23:47:00</sub></div>
              </li>
              <li class="list-group-item d-flex mt-1 pt-0 mb-0 pb-1">
                <div class="text-start w-75 mt-0 mb-0 pb-0"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-exclamation-diamond me-2" style="width: 24px;height: 24px;color: var(--bs-warning);">
                  <path d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z"></path>
                  <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"></path>
                </svg><span class="me-2 mt-0 pt-0 mb-0">John Doe - PT ABC Corp</span><small class="text-secondary me-0 mt-0 pt-0 mb-0">Login multiple time use several device</small></div>
                <div class="text-end w-25"><sub>2025-09-17 23:47:00</sub></div>
              </li>
              <li class="list-group-item d-flex mt-1 pt-0 mb-0 pb-1">
                <div class="text-start w-75 mt-0 mb-0 pb-0"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-exclamation-diamond me-2" style="width: 24px;height: 24px;color: var(--bs-warning);">
                  <path d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z"></path>
                  <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"></path>
                </svg><span class="me-2 mt-0 pt-0 mb-0">John Doe - PT ABC Corp</span><small class="text-secondary me-0 mt-0 pt-0 mb-0">Login multiple time use several device</small></div>
                <div class="text-end w-25"><sub>2025-09-17 23:47:00</sub></div>
              </li>
              <li class="list-group-item d-flex mt-1 pt-0 mb-0 pb-1">
                <div class="text-start w-75 mt-0 mb-0 pb-0"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-exclamation-octagon me-2" style="width: 24px;height: 24px;color: var(--bs-red);">
                  <path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1z"></path>
                  <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"></path>
                </svg><span class="me-2 mt-0 pt-0 mb-0">System</span><small class="text-secondary me-0 mt-0 pt-0 mb-0">System problem - database limited</small></div>
                <div class="text-end w-25"><sub>2025-09-17 23:47:00</sub></div>
              </li>
            </ul><button class="btn btn-primary" type="button">Read More</button>
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