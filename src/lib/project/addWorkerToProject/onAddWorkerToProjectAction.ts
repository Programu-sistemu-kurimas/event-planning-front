'use server';

import { redirect } from 'next/navigation';
import { API_ROUTES, ROUTES } from '@/constants';
import { addWorkerToProjectFormSchema } from './schema';
import { FormState } from '@/types/form';
import { apiFetch } from '@/lib/apiFetch';
import { revalidatePath } from 'next/cache';
import { applyRouteParams } from '@/lib/utils';

export const onAddWorkerToProjectAction = async (
    _prevState: FormState,
    data: FormData
): Promise<FormState> => {
    const formData = Object.fromEntries(data);
    const validatedFormData = addWorkerToProjectFormSchema.safeParse(formData);

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

    const res = await apiFetch(API_ROUTES.PROJECT.ADD_USER, {
        method: 'POST',
        body: JSON.stringify({
            email: validatedFormData.data.email,
            projectId: validatedFormData.data.projectId,
        }),
    });

    if (!res.ok) {
        return {
            errorMessage: 'Nepavyko pridėti darbuotojo prie projekto',
            fields: validatedFormData.data,
        };
    }

    const id = validatedFormData.data.projectId;

    revalidatePath(
        applyRouteParams(API_ROUTES.PROJECT.GET_BY_ID, {
            id,
        })
    );
    redirect(
        applyRouteParams(ROUTES.PROJECTS.SINGLE_PROJECT, {
            id,
        })
    );
};
