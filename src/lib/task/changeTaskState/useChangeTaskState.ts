import { TaskStates } from '@/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { changeTaskStateFormSchema } from './schema';
import { useFormState } from 'react-dom';
import { onChangeTaskStateAction } from './onChangeTaskStateAction';

type ChangeTaskStateFormValues = z.infer<typeof changeTaskStateFormSchema>;

interface UseChangeTaskStateProps {
    projectId: string;
    taskId: string;
    currentState: z.infer<typeof TaskStates>;
}

export const useChangeTaskState = ({
    projectId,
    taskId,
    currentState,
}: UseChangeTaskStateProps) => {
    const [state, formAction] = useFormState(onChangeTaskStateAction, {
        errorMessage: '',
    });

    const form = useForm<ChangeTaskStateFormValues>({
        resolver: zodResolver(changeTaskStateFormSchema),
        defaultValues: {
            projectId,
            taskId,
            state: currentState,
            ...(state?.fields ?? {}),
        },
    });

    return { form, formAction, state };
};
