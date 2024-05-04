import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { registerFormSchema } from './schema';
import { useFormState } from 'react-dom';
import { onRegisterAction } from './registerAction';

type RegisterFormValues = z.infer<typeof registerFormSchema>;

export const useRegister = () => {
    const [state, formAction] = useFormState(onRegisterAction, {
        errorMessage: '',
    });

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            name: '',
            surname: '',
            email: '',
            password: '',
            ...(state?.fields ?? {}),
        },
    });

    return { form, formAction, state };
};
