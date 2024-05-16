import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { deleteProjectFormSchema } from './schema';
import { useFormState } from 'react-dom';
import { onDeleteProjectAction } from './onDeleteProjectAction';

type DeleteProjectFormValues = z.infer<typeof deleteProjectFormSchema>;

interface UseDeleteProjectProps {
    projectId: string;
}

export const useDeleteProject = ({ projectId }: UseDeleteProjectProps) => {
    const [state, formAction] = useFormState(onDeleteProjectAction, {
        errorMessage: '',
    });

    const form = useForm<DeleteProjectFormValues>({
        resolver: zodResolver(deleteProjectFormSchema),
        defaultValues: {
            projectId,
        },
    });

    return { form, formAction, state };
};
