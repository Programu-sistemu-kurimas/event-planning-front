import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { unarchiveProjectFormSchema } from './schema';
import { useFormState } from 'react-dom';
import { onUnarchiveProjectAction } from './onUnarchiveProjectAction';

type UnarchiveProjectFormValues = z.infer<typeof unarchiveProjectFormSchema>;

interface UseUnarchiveProjectProps {
    projectId: string;
}

export const useUnarchiveProject = ({
    projectId,
}: UseUnarchiveProjectProps) => {
    const [state, formAction] = useFormState(onUnarchiveProjectAction, {
        errorMessage: '',
    });

    const form = useForm<UnarchiveProjectFormValues>({
        resolver: zodResolver(unarchiveProjectFormSchema),
        defaultValues: {
            projectId,
        },
    });

    return { form, formAction, state };
};
