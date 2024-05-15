'use server';

import { API_ROUTES } from '@/constants';
import { quickCreateTaskFormSchema } from './schema';
import { FormState } from '@/types/form';
import { apiFetch } from '@/lib/apiFetch';
import { revalidatePath } from 'next/cache';

export const onQuickCreateTaskAction = async (
    _prevState: FormState,
    data: FormData
): Promise<FormState> => {
    const formData = Object.fromEntries(data);
    const validatedFormData = quickCreateTaskFormSchema.safeParse(formData);

    if (!validatedFormData.success) {
        const fields: Record<string, string> = {};

        for (const key of Object.keys(formData)) {
            fields[key] = formData[key].toString();
        }

        return {
            errorMessage: 'Klaidingai suvesti formos duomenys',
            fields,
        };
    }

    const res = await apiFetch(API_ROUTES.TASK.CREATE, {
        method: 'POST',
        body: JSON.stringify({
            projectId: validatedFormData.data.projectId,
            taskName: validatedFormData.data.taskName,
        }),
    });

    if (!res.ok) {
        return {
            errorMessage: 'Įvyko klaida sukuriant užduotį',
            fields: validatedFormData.data,
        };
    }

    const projectId = validatedFormData.data.projectId;

    revalidatePath(`${API_ROUTES.PROJECT.BASE}/${projectId}`);

    return {
        errorMessage: '',
        fields: {
            taskName: '',
            projectId: validatedFormData.data.projectId,
        },
    };
};
