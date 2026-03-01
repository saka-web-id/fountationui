// hooks/useRegisterForm.ts
import { useForm } from 'vee-validate'
import { useBillingCycleSchema } from '../schemas/billingcycle.schema';

export interface BillingCyclePayload {
    billingCycleId: number;
    billingCycleCompanyId: number;
    billingCycleName: string;
    billingCycleDuration: number;
    billingCycleCreatedAt: string;
}

export const mapBillingCycleFromApi = (apiData: any): BillingCyclePayload => ({
    billingCycleId: apiData.billingCycleId,
    billingCycleCompanyId: apiData.billingCycleCompanyId,
    billingCycleName: apiData.billingCycleName,
    billingCycleDuration: apiData.billingCycleDuration,
    billingCycleCreatedAt: apiData.billingCycleCreatedAt
});


export function useBillingCycleForm() {
    // useForm with schema
    const {  defineField, handleSubmit, setValues } = useForm<BillingCyclePayload>({
        validationSchema: useBillingCycleSchema,
        initialValues: {billingCycleId: 0, billingCycleCompanyId: 0, billingCycleName:"", billingCycleDuration:0, billingCycleCreatedAt:"" }
    })

    // define fields
    const [billingCycleId, billingCycleIdAttrs] = defineField('billingCycleId');
    const [billingCycleCompanyId, billingCycleCompanyIdAttrs] = defineField('billingCycleCompanyId');
    const [billingCycleName, billingCycleNameAttrs] = defineField('billingCycleName');
    const [billingCycleDuration, billingCycleDurationAttrs] = defineField('billingCycleDuration');
    const [billingCycleCreatedAt, billingCycleCreatedAtAttrs] = defineField('billingCycleCreatedAt');

    return {
        handleSubmit,
        setValues,
        billingCycleId,
        billingCycleIdAttrs,
        billingCycleCompanyId,
        billingCycleCompanyIdAttrs,
        billingCycleName,
        billingCycleNameAttrs,
        billingCycleDuration,
        billingCycleDurationAttrs,
        billingCycleCreatedAt,
        billingCycleCreatedAtAttrs
    }
}