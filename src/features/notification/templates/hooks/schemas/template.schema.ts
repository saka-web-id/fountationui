import * as yup from 'yup';

export function useTemplateSchema() {

    return yup.object({
        notiTemplateName: yup.string().required(),
        notiTemplateSubject: yup.string().required(),
        notiTemplateType: yup.string().required(),
        notiTemplateProviderId: yup.number().required(),
        notiTemplateContentJson: yup.string().required().test('is-json', 'Invalid JSON', (value) => {
            try {
                JSON.parse(value || '{}');
                return true;
            } catch (e) {
                return false;
            }
        })
    });
}
