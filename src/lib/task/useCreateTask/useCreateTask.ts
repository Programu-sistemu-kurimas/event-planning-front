import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createTaskFormSchema } from './schema';
import { useFormState } from 'react-dom';
import { onCreateTaskAction } from './onCreateTaskAction';

type CreateTaskFormValues = z.infer<typeof createTaskFormSchema>;

interface UseCreateTaskProps {
    projectId: string;
}

export const useCreateTask = ({ projectId }: UseCreateTaskProps) => {
    const [state, formAction] = useFormState(onCreateTaskAction, {
        errorMessage: '',
    });

    const form = useForm<CreateTaskFormValues>({
        resolver: zodResolver(createTaskFormSchema),
        defaultValues: {
            projectId,
            taskName: '',
            taskDescription: '',
            ...(state?.fields ?? {}),
        },
    });

    return { form, formAction, state };
};
