'use server';

import { applyRouteParams } from '@/lib/utils';
import { redirect } from 'next/navigation';
import { API_ROUTES, ROUTES } from '@/constants';
import { archiveProjectFormSchema } from './schema';
import { FormState } from '@/types/form';
import { apiFetch } from '@/lib/apiFetch';
import { revalidatePath } from 'next/cache';

export const onArchiveProjectAction = async (
    _prevState: FormState,
    data: FormData
): Promise<FormState> => {
    const formData = Object.fromEntries(data);
    const validatedFormData = archiveProjectFormSchema.safeParse(formData);

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
        applyRouteParams(API_ROUTES.PROJECT.ARCHIVE, {
            id: validatedFormData.data.projectId,
        }),
        {
            method: 'PUT',
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