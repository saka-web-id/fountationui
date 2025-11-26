<script setup lang="ts">

</script>

<template>
  <div class="modal fade" role="dialog" tabindex="-1" id="editModal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Add / Edit OAuth Provider</h4><button class="btn-close" type="button" aria-label="Close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <div class="w-100 mt-0">
            <div><span class="ms-2" style="--bs-body-color: var(--bs-secondary);color: var(--bs-secondary);">Name</span></div><input class="d-inline-block w-100 ms-1 ps-2 me-0 pe-7" type="text">
          </div>
          <div class="w-100 mt-2">
            <div><span class="ms-2" style="--bs-body-color: var(--bs-secondary);color: var(--bs-secondary);">Authorization Endpoint URL</span></div><input class="d-inline-block w-100 ms-1 ps-2 me-0 pe-7" type="text">
          </div>
          <div class="w-100 mt-2">
            <div><span class="ms-2" style="--bs-body-color: var(--bs-secondary);color: var(--bs-secondary);">Token Endpoint URL</span></div><input class="d-inline-block w-100 ms-1 ps-2 me-0 pe-7" type="text">
          </div>
          <div class="w-100 mt-2">
            <div><span class="ms-2" style="--bs-body-color: var(--bs-secondary);color: var(--bs-secondary);">Client ID</span></div><input class="d-inline-block w-100 ms-1 ps-2 me-0 pe-7" type="text">
          </div>
          <div class="w-100 mt-2">
            <div><span class="ms-2" style="--bs-body-color: var(--bs-secondary);color: var(--bs-secondary);">Client Secret</span></div><input class="d-inline-block w-100 ms-1 ps-2 me-0 pe-7" type="text">
          </div>
          <div class="w-100 mt-2">
            <div><span class="ms-2" style="--bs-body-color: var(--bs-secondary);color: var(--bs-secondary);">Scope</span></div><input class="d-inline-block w-100 ms-1 ps-2 me-0 pe-7" type="text">
          </div>
        </div>
        <div class="modal-footer"><button class="btn btn-light" type="button" data-bs-dismiss="modal">Close</button><button class="btn btn-primary" type="button">Save</button></div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>