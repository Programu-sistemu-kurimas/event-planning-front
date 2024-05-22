import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { deleteTaskFormSchema } from './schema';
import { useFormState } from 'react-dom';
import { onDeleteTaskAction } from './onDeleteTaskAction';

type DeleteTaskFormValues = z.infer<typeof deleteTaskFormSchema>;

interface UseDeleteTaskProps {
    projectId: string;
    taskId: string;
}

export const useDeleteTask = ({ projectId, taskId }: UseDeleteTaskProps) => {
    const [state, formAction] = useFormState(onDeleteTaskAction, {
        errorMessage: '',
    });

    const form = useForm<DeleteTaskFormValues>({
        resolver: zodResolver(deleteTaskFormSchema),
        defaultValues: {
            projectId,
            taskId,
            ...(state?.fields ?? {}),
        },
    });

    return { form, formAction, state };
};
