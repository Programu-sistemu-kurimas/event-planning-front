'use server';

import { signIn } from '@/auth';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/constants';
import { loginFormSchema } from './schema';
import { FormState } from '@/types/formState';

export const onLoginAction = async (
    _prevState: FormState,
    data: FormData
): Promise<FormState> => {
    const formData = Object.fromEntries(data);
    const validatedFormData = loginFormSchema.safeParse(formData);

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
        await signIn('credentials', {
            email: data.get('email'),
            password: data.get('password'),
            redirect: false,
        });
    } catch (e) {
        return {
            errorMessage: 'Unauthorized',
            fields: validatedFormData.data,
        };
    }

    redirect(ROUTES.HOME);
};
