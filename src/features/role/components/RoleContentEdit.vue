<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useApi } from "~/composables/useApi";
import { computed, onMounted, ref } from "vue";
import { useRoute } from 'vue-router';
import { ErrorMessage, Field, Form } from "vee-validate";
import { useRoleSchema } from '../hooks/schemas/role.schema';
import {
  useRoleForm,
  type PermissionPayload,
  type RoleForm,
  type RolePayload,
  mapRoleFormFromApi
} from "~/features/role/hooks/forms/useRolePayload";
const { setValues: setValuesRoleForm, handleSubmit, roleName, roleDescription, permissionIds } = useRoleForm();

const { t } = useI18n();
const route = useRoute();
const { roleIdParam, companyIdParam } = route.params;
const isEdit = computed(() => !!route.params.roleIdParam);

const { data, loading, get, post } = useApi();
const { data: dataPermissions, get: getPermissions } = useApi();
const roleSchema = useRoleSchema();
const permissionsForm = ref<PermissionPayload[]>([]);

onMounted(async () => {

  await getPermissions('/api/v0/authorization/permission/list')
  permissionsForm.value = dataPermissions.value;

  if (isEdit.value) {
    await get(`/api/v0/authorization/role/permission/detail/` + companyIdParam + "/" + roleIdParam);

    setValuesRoleForm(mapRoleFormFromApi(data.value));

    permissionsForm.value = permissionsForm.value.map(p => ({
      ...p,
      isAssigned: permissionIds.value.includes(p.permissionId)
    }));

  }

});

const submitForm = handleSubmit(async ( roleForm: RoleForm) => {

  permissionsForm.value = permissionsForm.value.map(p => ({
    ...p,
    isAssigned: permissionIds.value.includes(p.permissionId)
  }));

  const finalPayload:RolePayload = {
    roleId: roleForm.roleId,
    roleName: roleForm.roleName,
    roleDescription: roleForm.roleDescription,
    permissions: permissionsForm.value
  };

  if (isEdit.value) {
    await post(`/api/v0/authorization/role/permission/update/${roleIdParam}`, finalPayload);
  } else {
    await post(`/api/v0/authorization/role/permission/add/${companyIdParam}`, finalPayload);
  }
});
</script>

<template>
  <section class="pt-2 pb-2">
    <div class="container">
      <ol class="breadcrumb ms-4">
        <li class="breadcrumb-item"><router-link to="/dashboard"><span>{{ t('textLabel.dashboard') }}</span></router-link></li>
        <li class="breadcrumb-item">
          <router-link :to="{ name: 'roles', params: { companyIdParam } }">
            <span>{{ t('textLabel.role', 2) }}</span>
          </router-link>
        </li>
        <li class="breadcrumb-item active"><span class="active">{{ t('button.edit', 2) }}</span></li>
      </ol>
      <div class="card mb-3 bg-gradient-dark">
        <div class="card-body ms-0 ps-0 me-0 pe-0 mt-0 pt-0 pb-0">
          <Form :validation-schema="roleSchema" id="idform" v-slot="{ meta }" class="text-center py-4" >
            <div class="text-center py-4" id="idform">
              <h4 class="text-start ms-2">Role Edit</h4>
              <div class="input-group mb-2">
                <span class="d-flex w-25 ms-2 input-group-text">Name</span>
<!--                <Field name="roleName" v-model="roleName" v-bind="roleNameAttrs" as="input" type="text" class="form-control d-flex ms-0 ps-2 me-2 pe-4" />-->
                <Field name="roleName" v-model="roleName" as="input" class="form-control d-flex ms-0 ps-2 me-2 pe-4" />
                <ErrorMessage name="roleName" class="text-start text-danger d-flex ms-0 ps-2 me-2 pe-4" />
              </div>
              <div class="input-group mb-2">
                <span class="w-25 ms-2 input-group-text">Description</span>
                <Field name="roleDescription" v-model="roleDescription" as="input" type="text" class="form-control d-flex ms-0 ps-2 me-2 pe-4" />
                <ErrorMessage name="roleDescription" class="text-start text-danger d-flex ms-0 ps-2 me-2 pe-4" />
              </div>

              <div class="table-responsive ms-2 me-2 mt-2 mb-2">
                <table class="table">
                  <thead>
                  <tr>
                    <th class="text-center">{{ t('textLabel.permission') }}</th>
                    <th class="text-center">{{ t('textLabel.description', 1) }}</th>
                    <th class="text-center">{{ t('textLabel.isAssigned') }}</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="permission in permissionsForm" :key="permission.permissionId">
                    <td class="text-left">{{ permission.permissionName }}</td>
                    <td class="text-left">{{ permission.permissionDescription }}</td>
                    <td class="text-center">
                      <Field type="checkbox" name="permissionIds" v-model="permissionIds" :checked="permission.isAssigned" :value="permission.permissionId" />
                    </td>
                  </tr>
                  </tbody>
                </table>
                <ErrorMessage name="permissions" class="text-danger text-start ms-2" />
              </div>
              <button :disabled="!meta.valid || loading"  class="btn btn-outline-primary ms-2 me-2" @click="submitForm" type="button">{{ loading ? t('button.saving') : t('button.save') }}</button>

            </div>
          </Form>
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