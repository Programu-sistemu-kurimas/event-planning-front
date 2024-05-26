import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useFormState } from 'react-dom';
import { onUpdateProfileInfoAction } from './onUpdateProfileInfoAction';
import { updateProfileInfoFormSchema } from './schema';

type UpdateProfileInfoFormValues = z.infer<typeof updateProfileInfoFormSchema>;

interface UseUpdateProfileInfoProps {
    currentName: string;
    currentSurname: string;
    currentEmail: string;
}

export const useUpdateProfileInfo = ({
    currentName,
    currentSurname,
    currentEmail,
}: UseUpdateProfileInfoProps) => {
    const [state, formAction] = useFormState(onUpdateProfileInfoAction, {
        errorMessage: '',
    });

    const form = useForm<UpdateProfileInfoFormValues>({
        resolver: zodResolver(updateProfileInfoFormSchema),
        defaultValues: {
            name: currentName,
            surname: currentSurname,
            email: currentEmail,
            ...(state?.fields ?? {}),
        },
    });

    return { form, formAction, state };
};
