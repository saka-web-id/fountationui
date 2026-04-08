import { useForm } from 'vee-validate'
import { useTemplateSchema } from '../schemas/template.schema'

export function useTemplateForm() {
    const schema = useTemplateSchema()
    
    const { defineField, handleSubmit, setValues, resetForm, errors } = useForm({
        validationSchema: schema,
        initialValues: {
            notiTemplateId: 0,
            notiTemplateCompanyId: 0,
            notiTemplateProviderId: 0,
            notiTemplateName: '',
            notiTemplateType: 'EMAIL' as any,
            notiTemplateSubject: '',
            notiTemplateContentJson: '{}',
            notiTemplateContentCompiled: ''
        }
    })

    const [notiTemplateId] = defineField('notiTemplateId')
    const [notiTemplateCompanyId] = defineField('notiTemplateCompanyId')
    const [notiTemplateProviderId] = defineField('notiTemplateProviderId')
    const [notiTemplateName] = defineField('notiTemplateName')
    const [notiTemplateType] = defineField('notiTemplateType')
    const [notiTemplateSubject] = defineField('notiTemplateSubject')
    const [notiTemplateContentJson] = defineField('notiTemplateContentJson')
    const [notiTemplateContentCompiled] = defineField('notiTemplateContentCompiled')

    return {
        handleSubmit,
        setValues,
        resetForm,
        errors,
        notiTemplateId,
        notiTemplateCompanyId,
        notiTemplateProviderId,
        notiTemplateName,
        notiTemplateType,
        notiTemplateSubject,
        notiTemplateContentJson,
        notiTemplateContentCompiled
    }
}
