import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { deleteGuestFormSchema } from './schema';
import { useFormState } from 'react-dom';
import { onDeleteGuestAction } from './onDeleteGuestAction';

type DeleteGuestFormValues = z.infer<typeof deleteGuestFormSchema>;

interface UseDeleteGuestProps {
    projectId: string;
    guestId: string;
}

export const useDeleteGuest = ({ projectId, guestId }: UseDeleteGuestProps) => {
    const [state, formAction] = useFormState(onDeleteGuestAction, {
        errorMessage: '',
    });

    const form = useForm<DeleteGuestFormValues>({
        resolver: zodResolver(deleteGuestFormSchema),
        defaultValues: {
            projectId,
            guestId,
            ...(state?.fields ?? {}),
        },
    });

    return { form, formAction, state };
};
