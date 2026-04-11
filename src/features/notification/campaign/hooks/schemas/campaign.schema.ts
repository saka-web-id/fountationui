import * as yup from 'yup';

export const useCampaignSchema = yup.object({
    notiCampaignTitle: yup.string().required('Campaign title is required'),
    notiCampaignTemplateId: yup.number().min(1, 'Template selection is required').required('Template is required'),
    notiCampaignDescription: yup.string().optional(),
    notiCampaignScheduledAt: yup.string().required('Schedule date is required'),
    notiCampaignMetadata: yup.string().test('is-json', 'Invalid JSON metadata', (value) => {
        if (!value) return true;
        try {
            JSON.parse(value);
            return true;
        } catch (e) {
            return false;
        }
    })
});
