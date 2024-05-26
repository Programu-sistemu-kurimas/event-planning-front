'use server';

import { applyRouteParams } from '@/lib/utils';
import { redirect } from 'next/navigation';
import { API_ROUTES, ROUTES } from '@/constants';
import { unarchiveProjectFormSchema } from './schema';
import { FormState } from '@/types/form';
import { apiFetch } from '@/lib/apiFetch';
import { revalidatePath } from 'next/cache';

export const onUnarchiveProjectAction = async (
    _prevState: FormState,
    data: FormData
): Promise<FormState> => {
    const formData = Object.fromEntries(data);
    const validatedFormData = unarchiveProjectFormSchema.safeParse(formData);

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

    const res = await apiFetch(
        applyRouteParams(API_ROUTES.PROJECT.UNARCHIVE, {
            id: validatedFormData.data.projectId,
        }),
        {
            method: 'POST',
        }
    );

    if (!res.ok) {
        return {
            errorMessage: 'Įvyko klaida archyvuojant projektą',
            fields: validatedFormData.data,
        };
    }

    revalidatePath(API_ROUTES.USER.PROJECTS);
    redirect(ROUTES.PROJECTS.BASE);
};
