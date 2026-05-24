<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useApi } from "~/composables/useApi";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useForm, Field, ErrorMessage } from 'vee-validate';
import { usePermissionSchema } from "~/features/permission/hooks/schemas/permission.schema";
import {useAuthStore} from "~/stores/auth.ts";

const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const { permissionIdParam } = route.params;
const { data, get, post, put, error } = useApi();
const isEdit = ref(permissionIdParam != null && Number(permissionIdParam) > 0);
const schema = usePermissionSchema();
const auth = useAuthStore()

const { handleSubmit, setValues } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    resource: '',
    action: '',
    description: '',
    isSuperAdmin: false
  }
});

onMounted(async () => {
  if (isEdit.value) {
    await get('/v0/authorization/permission/detail/companyId/'+ auth.user?.company.companyId + '/userId/' + auth.user?.id + '/valueId/' + permissionIdParam);
    if (data.value) {
      setValues({
        name: data.value.permissionName,
        resource: data.value.permissionResource,
        action: data.value.permissionAction,
        description: data.value.permissionDescription,
        isSuperAdmin: data.value.isSuperAdmin
      });
    }
  }
});

const onSubmit = handleSubmit(async (values) => {
  const payload = {
    permissionId: isEdit.value ? Number(permissionIdParam) : null,
    permissionName: values.name,
    isSuperAdmin: values.isSuperAdmin,
    permissionResource: values.resource,
    permissionAction: values.action,
    permissionDescription: values.description,
    isAssigned: false
  };

  if (isEdit.value) {
    await put('/v0/authorization/permission/update/companyId/'+ auth.user?.company.companyId + '/userId/' + auth.user?.id + '/valueId/' + permissionIdParam, payload);
  } else {
    await post('/v0/authorization/permission/add/companyId/'+ auth.user?.company.companyId + '/userId/' + auth.user?.id , payload);
  }

  if (!error.value) {
    router.push({ name: 'permissionsetting' });
  }
});

</script>

<template>
  <section class="pt-2 pb-2">
    <div class="container">
      <ol class="breadcrumb ms-2 me-2">
        <li class="breadcrumb-item"><router-link to="/dashboard"><span>{{ t('textLabel.dashboard') }}</span></router-link></li>
        <li class="breadcrumb-item"><router-link to="/permissionsetting"><span>{{ t('textLabel.permission', 2) }}</span></router-link></li>
        <li class="breadcrumb-item active"><span class="active">{{ isEdit ? t('button.edit') : t('button.add') }}</span></li>
      </ol>
      <div class="card bg-gradient-dark">
        <div class="card-body">
          <form @submit.prevent="onSubmit">
            <div class="mb-3">
              <label class="form-label text-white">{{ t('textLabel.name') }}</label>
              <Field name="name" class="form-control" />
              <ErrorMessage name="name" class="text-danger" />
            </div>
            <div class="mb-3">
              <label class="form-label text-white">{{ t('textLabel.resource') }}</label>
              <Field name="resource" class="form-control" />
              <ErrorMessage name="resource" class="text-danger" />
            </div>
            <div class="mb-3">
              <label class="form-label text-white">{{ t('textLabel.action') }}</label>
              <Field name="action" as="select" class="form-select">
                <option value="" disabled>Select {{ t('textLabel.action') }}</option>
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
                <option value="PATCH">PATCH</option>
              </Field>
              <ErrorMessage name="action" class="text-danger" />
            </div>
            <div class="mb-3">
              <label class="form-label text-white">{{ t('textLabel.description') }}</label>
              <Field name="description" as="textarea" class="form-control" />
              <ErrorMessage name="description" class="text-danger" />
            </div>
            <div class="mb-3 form-check">
              <Field name="isSuperAdmin" type="checkbox" :value="true" class="form-check-input" id="checkSuper" />
              <label class="form-check-label text-white" for="checkSuper">Is Super Admin</label>
            </div>
            
            <div v-if="error" class="alert alert-danger mb-3">{{ error }}</div>

            <div class="text-end">
              <button type="button" class="btn btn-secondary me-2" @click="router.back()">{{ t('button.back') }}</button>
              <button type="submit" class="btn btn-primary">{{ isEdit ? t('button.save') : t('button.add') }}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
