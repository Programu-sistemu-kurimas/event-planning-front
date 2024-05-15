import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { quickCreateTaskFormSchema } from './schema';
import { useFormState } from 'react-dom';
import { onQuickCreateTaskAction } from './onQuickCreateTaskAction';

type QuickCreateTaskFormValues = z.infer<typeof quickCreateTaskFormSchema>;

interface UseQuickCreateTaskProps {
    projectId: string;
}

export const useQuickCreateTask = ({ projectId }: UseQuickCreateTaskProps) => {
    const [state, formAction] = useFormState(onQuickCreateTaskAction, {
        errorMessage: '',
    });

    const form = useForm<QuickCreateTaskFormValues>({
        resolver: zodResolver(quickCreateTaskFormSchema),
        defaultValues: {
            projectId,
            taskName: '',
            ...(state?.fields ?? {}),
        },
    });

    return { form, formAction, state };
};
