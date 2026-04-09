import {useForm} from "vee-validate";
import {useUserSchema} from "~/features/user/hooks/schemas/user.schemas.ts";
import type { UserPayload, UserCompanyPayLoad } from "~/features/user/interfaces/user.interfaces.ts";

export const mapUserFromApi = (apiData: any): UserPayload => ({
    userId: apiData.userId,
    userEmail: apiData.userEmail,
    userPhone: apiData.userPhone,
    userName: apiData.userName,
    userStatus: apiData.userStatus,
    userIsVerified: apiData.userIsVerified,
    userLastLoginAt: apiData.userLastLoginAt,
    userCreatedAt: apiData.userCreatedAt,
    userUpdatedAt: apiData.userUpdatedAt,
    userLeaderId: apiData.userLeaderId,
    userNote: apiData.userNote,
    /*departmentId: 0,
    companyId: 0,*/
});

export const mapUserCompanyFromAPi = (apiData: any) : UserCompanyPayLoad => ({
   userId: apiData.userId,
   userName: apiData.userName,
   companyId: apiData.companyId,
   companyName: apiData.companyName,
   isDefault: apiData.isDefault
});

export function useUserForm() {
    // useForm with schema
    const {  defineField, handleSubmit, setValues } = useForm<UserPayload>({
        validationSchema: useUserSchema,
        initialValues: {userId: 0, userEmail: "", userPhone:"", userName:"", userStatus:"", userIsVerified:"", userLastLoginAt:"", userCreatedAt:"", userUpdatedAt:"", userLeaderId:0, userNote:""/*, departmentId:0, companyId:0*/ }
    })

    // define fields
    const [userId, userIdAttrs] = defineField('userId');
    const [userEmail, userEmailAttrs] = defineField('userEmail');
    const [userPhone, userPhoneAttrs] = defineField('userPhone');
    const [userName, userNameAttrs] = defineField('userName');
    const [userStatus, userStatusAttrs] = defineField('userStatus');
    const [userIsVerified, userIsVerifiedAttrs] = defineField('userIsVerified');
    const [userLastLoginAt, userLastLoginAtAttrs] = defineField('userIsVerified');
    const [userCreatedAt, userCreatedAtAttrs] = defineField('userCreatedAt');
    const [userUpdatedAt, userUpdatedAtAttrs] = defineField('userUpdatedAt');
    const [userLeaderId, userLeaderIdAttrs] = defineField('userLeaderId');
    const [userNote, userNoteAttrs] = defineField('userNote');
    /*const [companyId, companyIdAttrs] = defineField('companyId');
    const [departmentId, departmentIdAttrs] = defineField('departmentId');*/

    return {
        handleSubmit,
        setValues,
        userId,
        userIdAttrs,
        userEmail,
        userEmailAttrs,
        userPhone,
        userPhoneAttrs,
        userName,
        userNameAttrs,
        userStatus,
        userStatusAttrs,
        userIsVerified,
        userIsVerifiedAttrs,
        userLastLoginAt,
        userLastLoginAtAttrs,
        userCreatedAt,
        userCreatedAtAttrs,
        userUpdatedAt,
        userUpdatedAtAttrs,
        userLeaderId,
        userLeaderIdAttrs,
        userNote,
        userNoteAttrs
        /*,
        companyId,
        companyIdAttrs,
        departmentId,
        departmentIdAttrs*/
    }
}