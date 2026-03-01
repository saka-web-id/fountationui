import {useForm} from "vee-validate";
import {useRoleSchema} from "~/features/role/hooks/schemas/role.schema.ts";

export interface RoleForm {
    roleId: number;
    roleName: string;
    roleDescription: string;
    permissionIds: number[]; // ✔ ONLY IDs
}

export interface RolePayload {
    roleId: number;
    roleName: string;
    roleDescription: string;
    permissions: PermissionPayload[];
}


export interface PermissionPayload {
    permissionId: number;
    permissionName: string;
    permissionResource: string;
    permissionAction: string;
    permissionDescription: string;
    isAssigned: boolean;
}

export const mapRoleFormFromApi = (apiData: RolePayload): RoleForm => ({
    roleId: Number(apiData.roleId),
    roleName: apiData.roleName,
    roleDescription: apiData.roleDescription,
    permissionIds: apiData.permissions.filter(p => p.isAssigned).map(p => p.permissionId)
})

export const mapUserFromApi = (apiData: any): RolePayload => ({
    roleId: Number(apiData.roleId),
    roleName: apiData.roleName,
    roleDescription: apiData.roleDescription,
    permissions: apiData.permissions
});

export function useRoleForm() {
  const { defineField, handleSubmit, setValues } = useForm<RoleForm> ({
      validationSchema: useRoleSchema,
      initialValues: {
          roleId: 0,
          roleName: "",
          roleDescription:"",
          permissionIds:[]
      }
  })

    const [roleId, roleIdAttrs] = defineField('roleId');
    const [roleName, roleNameAttrs] = defineField('roleName');
    const [roleDescription, roleDescriptionAttrs] = defineField('roleDescription');
    const [permissionIds, permissionIdsAttrs] = defineField('permissionIds');

    return {
        handleSubmit,
        setValues,
        roleId,
        roleIdAttrs,
        roleName,
        roleNameAttrs,
        roleDescription,
        roleDescriptionAttrs,
        permissionIds,
        permissionIdsAttrs
    }
}

export function useRolePayload() {
    // useForm with schema
    const {  defineField, handleSubmit, setValues } = useForm<RolePayload>({
        validationSchema: useRoleSchema,
        initialValues: {
            roleId: 0,
            roleName: "",
            roleDescription:"",
            permissions: [
                {
                    permissionId: 0,
                    permissionName: "",
                    permissionResource: "",
                    permissionAction: "",
                    permissionDescription: "",
                    isAssigned: false
                }
            ],
        }
    })

    // define fields
    const [roleId, roleIdAttrs] = defineField('roleId');
    const [roleName, roleNameAttrs] = defineField('roleName');
    const [roleDescription, roleDescriptionAttrs] = defineField('roleDescription');
    const [permissions, permissionsAttrs ] = defineField('permissions');

    return {
        handleSubmit,
        setValues,
        roleId,
        roleIdAttrs,
        roleName,
        roleNameAttrs,
        roleDescription,
        roleDescriptionAttrs,
        permissions,
        permissionsAttrs
    }
}