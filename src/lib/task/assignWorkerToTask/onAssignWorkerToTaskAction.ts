'use server';

import { API_ROUTES } from '@/constants';
import { assignWorkerToTaskFormSchema } from './schema';
import { FormState } from '@/types/form';
import { apiFetch } from '@/lib/apiFetch';
import { revalidatePath } from 'next/cache';
import { applyRouteParams } from '@/lib/utils';

export const onAssignWorkerToTaskAction = async (
    _prevState: FormState,
    data: FormData
): Promise<FormState> => {
    const formData = Object.fromEntries(data);
    const validatedFormData = assignWorkerToTaskFormSchema.safeParse(formData);

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

    const res = await apiFetch(API_ROUTES.TASK.ADD_USER, {
        method: 'POST',
        body: JSON.stringify({
            userId: validatedFormData.data.userId,
            taskId: validatedFormData.data.taskId,
        }),
    });

    if (!res.ok) {
        return {
            errorMessage: 'Įvyko klaida priskiriant darbuotoją prie užduoties',
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
