'use client';

import { FormInput, FormTextArea, HiddenInput } from '@/components/form';
import { debounce } from '@/lib/debounce';
import { useChangeTaskInformation } from '@/lib/task';
import { useParams } from 'next/navigation';
import { FormEvent, FunctionComponent, useRef } from 'react';
import { FormProvider } from 'react-hook-form';

interface ChangeTaskInformationFormProps {
    currentTaskName: string;
    currentTaskDescription: string | null;
}

const ChangeTaskInformationForm: FunctionComponent<
    ChangeTaskInformationFormProps
> = ({ currentTaskDescription, currentTaskName }) => {
    const { id, taskId } = useParams();

    const projectId = String(id);
    const parsedTaskId = String(taskId);

    const { formAction, form } = useChangeTaskInformation({
        projectId,
        taskId: parsedTaskId,
        currentTaskName,
        currentTaskDescription,
    });

    const formRef = useRef<HTMLFormElement>(null);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        return form.handleSubmit(() => {
            formAction(new FormData(formRef.current!));
        })(e);
    };

    const debouncedFormSubmit = debounce(
        () => formRef?.current?.requestSubmit(),
        500
    );

    return (
        <FormProvider {...form}>
            <form
                onSubmit={onSubmit}
                action={formAction}
                ref={formRef}
                className="flex flex-col items-start gap-8 max-w-3xl"
                noValidate
            >
                <FormInput
                    name="taskName"
                    label="Pavadinimas"
                    classNames={{
                        container: 'lg:w-1/2 w-full',
                    }}
                    onChange={debouncedFormSubmit}
                />
                <FormTextArea
                    name="description"
                    label="Aprašymas"
                    rows={4}
                    className="resize-none"
                    classNames={{
                        container: 'w-full',
                    }}
                    onChange={debouncedFormSubmit}
                />
                <HiddenInput name="projectId" value={projectId} />
                <HiddenInput name="taskId" value={parsedTaskId} />
            </form>
        </FormProvider>
    );
};

export default ChangeTaskInformationForm;
