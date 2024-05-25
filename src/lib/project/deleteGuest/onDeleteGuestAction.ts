'use server';

import { API_ROUTES, ROUTES } from '@/constants';
import { deleteGuestFormSchema } from './schema';
import { FormState } from '@/types/form';
import { apiFetch } from '@/lib/apiFetch';
import { revalidatePath } from 'next/cache';
import { applyRouteParams } from '@/lib/utils';
import { redirect } from 'next/navigation';

export const onDeleteGuestAction = async (
    _prevState: FormState,
    data: FormData
): Promise<FormState> => {
    const formData = Object.fromEntries(data);
    const validatedFormData = deleteGuestFormSchema.safeParse(formData);

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

    const res = await apiFetch(API_ROUTES.PROJECT.DELETE_GUEST, {
        method: 'DELETE',
        body: JSON.stringify({
            guestId: validatedFormData.data.guestId,
            projectId: validatedFormData.data.projectId,
        }),
    });

    if (!res.ok) {
        return {
            errorMessage: 'Įvyko klaida ištrinant svečią',
            fields: validatedFormData.data,
        };
    }

    const id = validatedFormData.data.projectId;

    revalidatePath(
        applyRouteParams(API_ROUTES.PROJECT.GUESTS, {
            id,
        })
    );

    redirect(
        applyRouteParams(ROUTES.PROJECTS.SINGLE_PROJECT, {
            id,
        })
    );
};
