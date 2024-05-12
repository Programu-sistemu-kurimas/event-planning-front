import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useFormState } from 'react-dom';
import { addWorkerToProjectFormSchema } from './schema';
import { onAddWorkerToProjectAction } from './onAddWorkerToProjectAction';

type AddWorkerToProjectFormValues = z.infer<
    typeof addWorkerToProjectFormSchema
>;

interface UseAddWorkerToProjectProps {
    projectId: string;
}

export const useAddWorkerToProject = ({
    projectId,
}: UseAddWorkerToProjectProps) => {
    const [state, formAction] = useFormState(onAddWorkerToProjectAction, {
        errorMessage: '',
    });

    const form = useForm<AddWorkerToProjectFormValues>({
        resolver: zodResolver(addWorkerToProjectFormSchema),
        defaultValues: {
            email: '',
            projectId,
            ...(state?.fields ?? {}),
        },
    });

    return { form, formAction, state };
};
