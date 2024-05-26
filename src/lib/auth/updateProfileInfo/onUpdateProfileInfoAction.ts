'use server';

import { API_ROUTES } from '@/constants';
import { updateProfileInfoFormSchema } from './schema';
import { FormState } from '@/types/form';
import { apiFetch } from '@/lib/apiFetch';
import { revalidatePath } from 'next/cache';

export const onUpdateProfileInfoAction = async (
    _prevState: FormState,
    data: FormData
): Promise<FormState> => {
    const formData = Object.fromEntries(data);
    const validatedFormData = updateProfileInfoFormSchema.safeParse(formData);

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

    const res = await apiFetch(API_ROUTES.USER.UPDATE, {
        method: 'PUT',
        body: JSON.stringify({
            ...validatedFormData.data,
        }),
    });

    if (!res.ok) throw new Error('Nepavyko pakeisti profilio informacijos');

    revalidatePath(API_ROUTES.USER.INFO);

    return {
        errorMessage: '',
    };
};
