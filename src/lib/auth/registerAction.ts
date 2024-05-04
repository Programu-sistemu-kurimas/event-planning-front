'use server';

import { signIn } from '@/auth';
import { redirect } from 'next/navigation';
import { API_ROUTES, ROUTES } from '@/constants';
import { registerFormSchema } from './schema';
import { FormState } from '@/types/formState';
import { apiFetch } from '@/lib/apiFetch';

export const onRegisterAction = async (
    _prevState: FormState,
    data: FormData
): Promise<FormState> => {
    const formData = Object.fromEntries(data);
    const validatedFormData = registerFormSchema.safeParse(formData);

    if (!validatedFormData.success) {
        const fields: Record<string, string> = {};

        for (const key of Object.keys(formData)) {
            fields[key] = formData[key].toString();
        }

        return {
            errorMessage: 'Invalid form data',
            fields,
        };
    }

    try {
        const res = await apiFetch(API_ROUTES.AUTH.REGISTER, {
            method: 'POST',
            body: JSON.stringify({
                ...validatedFormData.data,
            }),
        });

        if (!res.ok) throw new Error('Server error');
    } catch {
        return {
            errorMessage: 'Server error',
            fields: validatedFormData.data,
        };
    }

    try {
        await signIn('credentials', {
            email: data.get('email'),
            password: data.get('password'),
            redirect: false,
        });
    } catch (e) {
        redirect(ROUTES.AUTH.LOGIN);
    }

    redirect(ROUTES.HOME);
};
