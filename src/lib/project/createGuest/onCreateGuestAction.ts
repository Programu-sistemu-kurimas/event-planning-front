'use server';

import { API_ROUTES } from '@/constants';
import { createGuestFormSchema } from './schema';
import { FormState } from '@/types/form';
import { apiFetch } from '@/lib/apiFetch';
import { revalidatePath } from 'next/cache';
import { applyRouteParams } from '@/lib/utils';

export const onCreateGuestAction = async (
    _prevState: FormState,
    data: FormData
): Promise<FormState> => {
    const formData = Object.fromEntries(data);
    const validatedFormData = createGuestFormSchema.safeParse(formData);

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

    const res = await apiFetch(API_ROUTES.PROJECT.CREATE_GUEST, {
        method: 'POST',
        body: JSON.stringify({
            projectId: validatedFormData.data.projectId,
            guestName: validatedFormData.data.guestName,
            guestSurname: validatedFormData.data.guestSurname,
        }),
    });

    if (!res.ok) {
        return {
            errorMessage: 'Įvyko klaida pridedant svečią',
            fields: validatedFormData.data,
        };
    }

    const id = validatedFormData.data.projectId;

    revalidatePath(
        applyRouteParams(API_ROUTES.PROJECT.GUESTS, {
            id,
        })
    );

    return {
        errorMessage: '',
    };
};
