import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createProjectFormSchema } from './schema';
import { useFormState } from 'react-dom';
import { onCreateProjectAction } from './onCreateProjectAction';

type CreateProjectFormValues = z.infer<typeof createProjectFormSchema>;

export const useCreateProject = () => {
    const [state, formAction] = useFormState(onCreateProjectAction, {
        errorMessage: '',
    });

    const form = useForm<CreateProjectFormValues>({
        resolver: zodResolver(createProjectFormSchema),
        defaultValues: {
            projectName: '',
            projectDescription: '',
            ...(state?.fields ?? {}),
        },
    });

    return { form, formAction, state };
};
