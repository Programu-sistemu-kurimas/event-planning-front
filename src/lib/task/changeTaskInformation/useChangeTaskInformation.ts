import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { changeTaskInformationFormSchema } from './schema';
import { useFormState } from 'react-dom';
import { onChangeTaskInformationAction } from './onChangeTaskInformationAction';

type ChangeTaskInformationValues = z.infer<
    typeof changeTaskInformationFormSchema
>;

interface UseChangeTaskInformationProps {
    projectId: string;
    taskId: string;
    currentTaskName: string;
    currentTaskDescription: string | null;
}

export const useChangeTaskInformation = ({
    projectId,
    taskId,
    currentTaskName,
    currentTaskDescription,
}: UseChangeTaskInformationProps) => {
    const [state, formAction] = useFormState(onChangeTaskInformationAction, {
        errorMessage: '',
    });

    const form = useForm<ChangeTaskInformationValues>({
        resolver: zodResolver(changeTaskInformationFormSchema),
        defaultValues: {
            projectId,
            taskId,
            taskName: currentTaskName,
            description: currentTaskDescription || '',
            ...(state?.fields ?? {}),
        },
    });

    return { form, formAction, state };
};
