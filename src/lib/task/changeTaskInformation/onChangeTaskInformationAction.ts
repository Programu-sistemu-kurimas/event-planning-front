'use server';

import { API_ROUTES } from '@/constants';
import { changeTaskInformationFormSchema } from './schema';
import { FormState } from '@/types/form';
import { apiFetch } from '@/lib/apiFetch';
import { revalidatePath } from 'next/cache';
import { applyRouteParams } from '@/lib/utils';

export const onChangeTaskInformationAction = async (
    _prevState: FormState,
    data: FormData
): Promise<FormState> => {
    const formData = Object.fromEntries(data);
    const validatedFormData =
        changeTaskInformationFormSchema.safeParse(formData);

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

    const res = await apiFetch(API_ROUTES.TASK.UPDATE, {
        method: 'PUT',
        body: JSON.stringify({
            projectId: validatedFormData.data.projectId,
            taskId: validatedFormData.data.taskId,
            taskName: validatedFormData.data.taskName,
            description: validatedFormData.data.description || null,
        }),
    });

    if (!res.ok) {
        return {
            errorMessage: 'Įvyko klaida keičiant užduoties informaciją',
            fields: validatedFormData.data,
        };
    }

    const taskId = validatedFormData.data.taskId;

    revalidatePath(
        applyRouteParams(API_ROUTES.TASK.GET_BY_ID, {
            id: taskId,
        })
    );

    return {
        errorMessage: '',
    };
};
