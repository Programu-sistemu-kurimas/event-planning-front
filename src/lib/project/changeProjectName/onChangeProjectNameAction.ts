'use server';

import { redirect } from 'next/navigation';
import { API_ROUTES, ROUTES } from '@/constants';
import { changeProjectNameFormSchema } from './schema';
import { FormState } from '@/types/form';
import { apiFetch } from '@/lib/apiFetch';
import { revalidatePath } from 'next/cache';
import { applyRouteParams } from '@/lib/utils';

export const onChangeProjectNameAction = async (
    _prevState: FormState,
    data: FormData
): Promise<FormState> => {
    const formData = Object.fromEntries(data);
    const validatedFormData = changeProjectNameFormSchema.safeParse(formData);

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

    const res = await apiFetch(API_ROUTES.PROJECT.UPDATE, {
        method: 'PUT',
        body: JSON.stringify({
            projectName: validatedFormData.data.projectName,
            projectId: validatedFormData.data.projectId,
        }),
    });

    if (!res.ok) {
        return {
            errorMessage: 'Įvyko klaida keičiant projekto pavadinimą',
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
