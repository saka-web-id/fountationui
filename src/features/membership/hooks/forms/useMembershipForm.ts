// hooks/useRegisterForm.ts
import { useForm } from 'vee-validate'
import { useMembershipSchema } from '../schemas/membership.schema';

export interface MembershipPayload {
    membershipPlanId: number;
    membershipPlanName: string;
    membershipPlanPrice: number;
    membershipPlanBillingCycle: string;
    membershipPlanCompanyId: number;
    membershipPlanFeatures: string;
    membershipPlanCreatedAt: string;
}

export const mapMembershipFromApi = (apiData: any): MembershipPayload => ({
    membershipPlanId: apiData.membershipPlanId,
    membershipPlanName: apiData.membershipPlanName,
    membershipPlanPrice: apiData.membershipPlanPrice,
    membershipPlanBillingCycle: apiData.membershipPlanBillingCycle,
    membershipPlanCompanyId: apiData.membershipPlanCompanyId,
    membershipPlanFeatures: apiData.membershipPlanFeatures,
    membershipPlanCreatedAt: apiData.membershipPlanCreatedAt
});


export function useMembershipForm() {
    // useForm with schema
    const {  defineField, handleSubmit, setValues } = useForm<MembershipPayload>({
        validationSchema: useMembershipSchema,
        initialValues: {membershipPlanId: 0, membershipPlanName: "", membershipPlanPrice:0, membershipPlanBillingCycle:"", membershipPlanCompanyId:0, membershipPlanFeatures:"", membershipPlanCreatedAt:"" }
    })

    // define fields
    const [membershipPlanId, membershipPlanIdAttrs] = defineField('membershipPlanId');
    const [membershipPlanName, membershipPlanNameAttrs] = defineField('membershipPlanName');
    const [membershipPlanPrice, membershipPlanPriceAttrs] = defineField('membershipPlanPrice');
    const [membershipPlanBillingCycle, membershipPlanBillingCycleAttrs] = defineField('membershipPlanBillingCycle');
    const [membershipPlanCompanyId, membershipPlanCompanyIdAttrs ] = defineField('membershipPlanCompanyId');
    const [membershipPlanFeatures, membershipPlanFeaturesAttrs] = defineField('membershipPlanFeatures');
    const [membershipPlanCreatedAt, membershipPlanCreatedAtAttrs] = defineField('membershipPlanCreatedAt');

    return {
        handleSubmit,
        setValues,
        membershipPlanId,
        membershipPlanIdAttrs,
        membershipPlanName,
        membershipPlanNameAttrs,
        membershipPlanPrice,
        membershipPlanPriceAttrs,
        membershipPlanBillingCycle,
        membershipPlanBillingCycleAttrs,
        membershipPlanCompanyId,
        membershipPlanCompanyIdAttrs,
        membershipPlanFeatures,
        membershipPlanFeaturesAttrs,
        membershipPlanCreatedAt,
        membershipPlanCreatedAtAttrs,
    }
}