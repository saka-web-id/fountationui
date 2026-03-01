import * as yup from 'yup';

export function useLogSettingSchema() {

    return yup.object({
        logSettingLogFormat: yup.string().required("Please select a Log Format."),
        logSettingEnabled: yup.string().required("Please select Enable or Disable.")
    });
}
