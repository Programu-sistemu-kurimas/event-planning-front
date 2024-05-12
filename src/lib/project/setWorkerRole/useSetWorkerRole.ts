import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useFormState } from 'react-dom';
import { setWorkerRoleFormSchema } from './schema';
import { onSetWorkerRoleAction } from './onSetWorkerRoleAction';
import { Roles } from '@/constants';

type SetWorkerRoleFormValues = z.infer<typeof setWorkerRoleFormSchema>;

interface UseSetWorkerRoleProps {
    projectId: string;
    userId: string;
}

export const useSetWorkerRole = ({
    projectId,
    userId,
}: UseSetWorkerRoleProps) => {
    const [state, formAction] = useFormState(onSetWorkerRoleAction, {
        errorMessage: '',
    });

    const form = useForm<SetWorkerRoleFormValues>({
        resolver: zodResolver(setWorkerRoleFormSchema),
        defaultValues: {
            userId,
            projectId,
            role: Roles.Enum.User,
            ...(state?.fields ?? {}),
        },
    });

    return { form, formAction, state };
};
