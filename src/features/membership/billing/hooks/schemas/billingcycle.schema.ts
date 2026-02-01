import * as yup from 'yup';

export function useBillingCycleSchema() {

    return yup.object({
        billingCycleName: yup.string()
            .min(3)
            .required(),
        billingCycleDuration: yup.number().required("Please input the price").min(1, 'Billing duration must be at least 1 day')
    });

}
