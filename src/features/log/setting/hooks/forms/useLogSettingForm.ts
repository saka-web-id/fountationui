// hooks/useRegisterForm.ts
import { useForm } from 'vee-validate'
import { useLogSettingSchema } from '../schemas/logsetting.schema';

export interface LogSettingPayload {
    logSettingId: number;
    logSettingEndpoint: string;
    logSettingMethod: string;
    logSettingLogFormat: string;
    logSettingEnabled: boolean;
    logSettingCompanyId: number;
    logSettingCreatedAt: string;
    logSettingUpdatedAt: string;
}

export const mapLogSettingFromApi = (apiData: any): LogSettingPayload => ({
    logSettingId: apiData.logSettingId,
    logSettingEndpoint: apiData.logSettingEndpoint,
    logSettingMethod: apiData.logSettingMethod,
    logSettingLogFormat: apiData.logSettingLogFormat,
    logSettingEnabled: apiData.logSettingEnabled,
    logSettingCompanyId: apiData.logSettingCompanyId,
    logSettingCreatedAt: apiData.logSettingCreatedAt,
    logSettingUpdatedAt: apiData.logSettingUpdatedAt
});


export function useLogSettingForm() {
    // useForm with schema
    const {  defineField, handleSubmit, setValues } = useForm<LogSettingPayload>({
        validationSchema: useLogSettingSchema,
        initialValues: {logSettingId: 0, logSettingEndpoint: "", logSettingMethod: "", logSettingLogFormat: "", logSettingCompanyId: 0, logSettingCreatedAt: "" }
    })

    // define fields
    const [logSettingId, logSettingIdAttrs] = defineField('logSettingId');
    const [logSettingEndpoint, logSettingEndpointAttrs] = defineField('logSettingEndpoint');
    const [logSettingMethod, logSettingMethodAttrs] = defineField('logSettingMethod');
    const [logSettingLogFormat, logSettingLogFormatAttrs] = defineField('logSettingLogFormat');
    const [logSettingEnabled, logSettingEnabledAttrs] = defineField('logSettingEnabled');
    const [logSettingCompanyId, logSettingCompanyIdAttrs] = defineField('logSettingCompanyId');
    const [logSettingCreatedAt, logSettingCreatedAtAttrs] = defineField('logSettingCreatedAt');
    const [logSettingUpdatedAt, logSettingUpdatedAtAttrs] = defineField('logSettingUpdatedAt');

    return {
        handleSubmit,
        setValues,
        logSettingId,
        logSettingIdAttrs,
        logSettingEndpoint,
        logSettingEndpointAttrs,
        logSettingMethod,
        logSettingMethodAttrs,
        logSettingLogFormat,
        logSettingLogFormatAttrs,
        logSettingEnabled,
        logSettingEnabledAttrs,
        logSettingCompanyId,
        logSettingCompanyIdAttrs,
        logSettingCreatedAt,
        logSettingCreatedAtAttrs,
        logSettingUpdatedAt,
        logSettingUpdatedAtAttrs
    }
}