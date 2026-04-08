import type { TemplateDTO } from '../interfaces/template.interface';

export const mapTemplateToForm = (template: TemplateDTO) => {
    return {
        ...template,
        notiTemplateContentJson: JSON.stringify(template.notiTemplateContentJson, null, 2)
    };
};

export const mapFormToTemplate = (form: any): TemplateDTO => {
    return {
        ...form,
        notiTemplateContentJson: JSON.parse(form.notiTemplateContentJson)
    };
};
