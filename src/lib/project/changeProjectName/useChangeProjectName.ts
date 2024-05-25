import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { changeProjectNameFormSchema } from './schema';
import { useFormState } from 'react-dom';
import { onChangeProjectNameAction } from './onChangeProjectNameAction';

type ChangeProjectNameFormValues = z.infer<typeof changeProjectNameFormSchema>;

interface UseChangeProjectNameProps {
    projectId: string;
    currentProjectName: string;
}

export const useChangeProjectName = ({
    projectId,
    currentProjectName,
}: UseChangeProjectNameProps) => {
    const [state, formAction] = useFormState(onChangeProjectNameAction, {
        errorMessage: '',
    });

    const form = useForm<ChangeProjectNameFormValues>({
        resolver: zodResolver(changeProjectNameFormSchema),
        defaultValues: {
            projectId,
            projectName: currentProjectName,
            ...(state?.fields ?? {}),
        },
    });

    return { form, formAction, state };
};
