import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { loginFormSchema } from './schema';
import { useFormState } from 'react-dom';
import { onLoginAction } from './loginAction';

type LoginFormValues = z.infer<typeof loginFormSchema>;

export const useLogin = () => {
    const [state, formAction] = useFormState(onLoginAction, {
        errorMessage: '',
    });

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: '',
            ...(state?.fields ?? {}),
        },
    });

    return { form, formAction, state };
};
