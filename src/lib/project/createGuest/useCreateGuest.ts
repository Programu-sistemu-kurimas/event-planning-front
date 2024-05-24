import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createGuestFormSchema } from './schema';
import { useFormState } from 'react-dom';
import { onCreateGuestAction } from './onCreateGuestAction';

type CreateGuestFormValues = z.infer<typeof createGuestFormSchema>;

interface UseCreateGuestProps {
    projectId: string;
}

export const useCreateGuest = ({ projectId }: UseCreateGuestProps) => {
    const [state, formAction] = useFormState(onCreateGuestAction, {
        errorMessage: '',
    });

    const form = useForm<CreateGuestFormValues>({
        resolver: zodResolver(createGuestFormSchema),
        defaultValues: {
            projectId,
            guestName: '',
            guestSurname: '',
            ...(state?.fields ?? {}),
        },
    });

    return { form, formAction, state };
};
