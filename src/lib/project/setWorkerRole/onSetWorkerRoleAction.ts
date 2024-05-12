'use server';

import { redirect } from 'next/navigation';
import { API_ROUTES, ROUTES } from '@/constants';
import { setWorkerRoleFormSchema } from './schema';
import { FormState } from '@/types/form';
import { apiFetch } from '@/lib/apiFetch';
import { revalidatePath } from 'next/cache';

export const onSetWorkerRoleAction = async (
    _prevState: FormState,
    data: FormData
): Promise<FormState> => {
    const formData = Object.fromEntries(data);
    const validatedFormData = setWorkerRoleFormSchema.safeParse(formData);

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

    const res = await apiFetch(API_ROUTES.PROJECT.SET_ROLE, {
        method: 'POST',
        body: JSON.stringify({
            userId: validatedFormData.data.userId,
            projectId: validatedFormData.data.projectId,
            role: validatedFormData.data.role,
        }),
    });

    if (!res.ok) {
        return {
            errorMessage: 'Nepavyko nustatyti darbuotojo rolės',
            fields: validatedFormData.data,
        };
    }

    const projectId = validatedFormData.data.projectId;

    revalidatePath(`${API_ROUTES.PROJECT.BASE}/${projectId}`);
    redirect(`${ROUTES.PROJECTS.BASE}/${projectId}`);
};
