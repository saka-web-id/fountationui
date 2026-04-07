import { ref } from 'vue';
import { useForm } from 'vee-validate';
import { notificationCategorySchema } from '~/features/notification/settings/category/hooks/schemas/notificationCategory.schema.ts';
import type { NotificationCategory, NotificationCategoryPayload } from '~/features/notification/settings/category/interfaces/notificationCategory.interfaces.ts';
import { useApi } from '~/composables/useApi.ts';
import { useAuthStore } from '~/stores/auth.ts';
import { toNotificationCategory, toNotificationCategoryPayload } from '~/features/notification/settings/category/api/notificationCategory.mapper.ts';
import type {ProviderPayload} from "~/features/notification/providers/interfaces/provider.payload.ts";

export function useNotificationCategoryForm(companyIdParam: number) {
    const auth = useAuthStore();
    const schema = notificationCategorySchema();
    const isEditing = ref(false);
    const categoryId = ref<number | null>(null);

    const {
        /*values,*/
        errors,
        defineField,
        handleSubmit,
        resetForm,
        setValues
    } = useForm<NotificationCategory>({
        validationSchema: schema,
        initialValues: {
            companyId: companyIdParam,
            defaultProviderId: 0,
            name: '',
            description: '',
            priority: 5,
            retryPolicy: { max_retries: 3, backoff: 'exponential' }
        }
    });

    const [name, nameProps] = defineField('name');
    const [description, descriptionProps] = defineField('description');
    const [priority, priorityProps] = defineField('priority');
    const [defaultProviderId, defaultProviderIdProps] = defineField('defaultProviderId');
    const [retryPolicy, retryPolicyProps] = defineField('retryPolicy');

    const { post, put, get, loading, data: apiData } = useApi<NotificationCategoryPayload>();
    const { get: getProviders, data: providersData } = useApi<ProviderPayload[]>();

    const fetchProviders = async (type: string) => {
        await getProviders(`/v0/notification/provider/list/companyId/${auth.user?.company.companyId}/userId/${auth.user?.id}/valueCompanyId/${companyIdParam}/notificationType/${type}`);
    };

    const fetchDetail = async (id: number) => {
        categoryId.value = id;
        isEditing.value = true;
        await get(`/v0/notification/category/detail/companyId/${auth.user?.company.companyId}/userId/${auth.user?.id}/categoryId/${id}`);
        if (apiData.value) {
            setValues(toNotificationCategory(apiData.value));
        }
    };

    const submit = handleSubmit(async (formValues) => {
        // 1. Generate the payload
        const rawPayload = toNotificationCategoryPayload(formValues);

        // 2. Remove all keys that are undefined
        const payload = Object.fromEntries(
            Object.entries(rawPayload).filter(([_, value]) => value !== undefined)
        );

        console.log("Cleaned Payload:", payload);

        if (isEditing.value && categoryId.value) {
            await put(`/v0/notification/category/update/companyId/${auth.user?.company.companyId}/userId/${auth.user?.id}`, payload);
        } else {
            await post(`/v0/notification/category/add/companyId/${auth.user?.company.companyId}/userId/${auth.user?.id}`, payload);
        }
    });

    return {
        name, nameProps,
        description, descriptionProps,
        priority, priorityProps,
        defaultProviderId, defaultProviderIdProps,
        retryPolicy, retryPolicyProps,
        errors,
        loading,
        submit,
        resetForm,
        fetchDetail,
        fetchProviders,
        providers: providersData,
        isEditing
    };
}
