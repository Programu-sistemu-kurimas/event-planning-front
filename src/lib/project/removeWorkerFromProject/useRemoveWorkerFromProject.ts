import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useFormState } from 'react-dom';
import { removeWorkerFromProjectFormSchema } from './schema';
import { onRemoveWorkerFromProjectAction } from './onRemoveWorkerFromProjectAction';

type RemoveWorkerFromProjectFormValues = z.infer<
    typeof removeWorkerFromProjectFormSchema
>;

interface UseRemoveWorkerFromProjectProps {
    projectId: string;
}

export const useRemoveWorkerFromProject = ({
    projectId,
}: UseRemoveWorkerFromProjectProps) => {
    const [state, formAction] = useFormState(onRemoveWorkerFromProjectAction, {
        errorMessage: '',
    });

    const form = useForm<RemoveWorkerFromProjectFormValues>({
        resolver: zodResolver(removeWorkerFromProjectFormSchema),
        defaultValues: {
            email: '',
            projectId,
            ...(state?.fields ?? {}),
        },
    });

    return { form, formAction, state };
};
