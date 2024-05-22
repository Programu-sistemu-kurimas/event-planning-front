import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { archiveProjectFormSchema } from './schema';
import { useFormState } from 'react-dom';
import { onArchiveProjectAction } from './onArchiveProjectAction';

type ArchiveProjectFormValues = z.infer<typeof archiveProjectFormSchema>;

interface UseArchiveProjectProps {
    projectId: string;
}

export const useArchiveProject = ({ projectId }: UseArchiveProjectProps) => {
    const [state, formAction] = useFormState(onArchiveProjectAction, {
        errorMessage: '',
    });

    const form = useForm<ArchiveProjectFormValues>({
        resolver: zodResolver(archiveProjectFormSchema),
        defaultValues: {
            projectId,
        },
    });

    return { form, formAction, state };
};
