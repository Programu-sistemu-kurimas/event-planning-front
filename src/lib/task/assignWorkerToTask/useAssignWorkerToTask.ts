import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { assignWorkerToTaskFormSchema } from './schema';
import { useFormState } from 'react-dom';
import { onAssignWorkerToTaskAction } from './onAssignWorkerToTaskAction';

type AssignWorkerToTaskFormValues = z.infer<
    typeof assignWorkerToTaskFormSchema
>;

interface UseAssignWorkerToTaskProps {
    taskId: string;
}

export const useAssignWorkerToTask = ({
    taskId,
}: UseAssignWorkerToTaskProps) => {
    const [state, formAction] = useFormState(onAssignWorkerToTaskAction, {
        errorMessage: '',
    });

    const form = useForm<AssignWorkerToTaskFormValues>({
        resolver: zodResolver(assignWorkerToTaskFormSchema),
        defaultValues: {
            taskId,
            userId: '',
            ...(state?.fields ?? {}),
        },
    });

    return { form, formAction, state };
};
