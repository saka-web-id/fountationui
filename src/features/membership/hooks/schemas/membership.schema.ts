import * as yup from 'yup';

export function useMembershipSchema() {

    return yup.object({
        membershipPlanName: yup.string()
            .min(3)
            .required(),
        membershipPlanPrice: yup.number().required("Please input the price"),
        membershipPlanFeatures:
            yup.string().test("json", "Invalid JSON format", (value) => {
                try {

                    if (typeof value === "string") {
                        const parsed = JSON.parse(value);

                        // reject null
                        if (parsed === null) return false;

                        // reject empty object {}
                        if (typeof parsed === "object" && !Array.isArray(parsed) && Object.keys(parsed).length === 0) {
                            return false;
                        }

                        // reject empty array []
                        if (Array.isArray(parsed) && parsed.length === 0) {
                            return false;
                        }
                    }

                    return true;
                } catch (error) {
                    return false;
                }
            }),
    });

}
