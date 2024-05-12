'use server';

import { redirect } from 'next/navigation';
import { API_ROUTES, ROUTES } from '@/constants';
import { createProjectFormSchema } from './schema';
import { FormState } from '@/types/form';
import { apiFetch } from '@/lib/apiFetch';
import { revalidatePath } from 'next/cache';

export const onCreateProjectAction = async (
    _prevState: FormState,
    data: FormData
): Promise<FormState> => {
    const formData = Object.fromEntries(data);
    const validatedFormData = createProjectFormSchema.safeParse(formData);

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

    const res = await apiFetch(API_ROUTES.PROJECT.CREATE, {
        method: 'POST',
        body: JSON.stringify({
            projectName: validatedFormData.data.projectName,
            projectDescription: validatedFormData.data.projectDescription,
        }),
    });

    if (!res.ok) {
        return {
            errorMessage: 'Įvyko klaida saugant naują projektą',
            fields: validatedFormData.data,
        };
    }

    revalidatePath(API_ROUTES.USER.PROJECTS);
    redirect(ROUTES.PROJECTS.BASE);
};
