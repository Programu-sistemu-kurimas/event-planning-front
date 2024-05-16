'use client';

import { Button } from '@/components/common';
import {
    FormError,
    FormInput,
    FormTextArea,
    HiddenInput,
} from '@/components/form';
import { useCreateTask } from '@/lib/task';
import { useParams } from 'next/navigation';
import { FormEvent, useRef } from 'react';
import { FormProvider } from 'react-hook-form';

const TaskCreationForm = () => {
    const { id } = useParams();

    const projectId = String(id);

    const { formAction, form, state } = useCreateTask({ projectId });

    const formRef = useRef<HTMLFormElement>(null);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        return form.handleSubmit(() => {
            formAction(new FormData(formRef.current!));
        })(e);
    };

    return (
        <FormProvider {...form}>
            <form
                onSubmit={onSubmit}
                action={formAction}
                ref={formRef}
                className="flex flex-col gap-12 max-w-3xl"
                noValidate
            >
                <div className="flex flex-col items-start gap-8">
                    <FormInput
                        name="taskName"
                        label="Pavadinimas"
                        displayErrors={false}
                        classNames={{
                            container: 'lg:w-1/2 w-full',
                        }}
                    />
                    <FormTextArea
                        name="taskDescription"
                        label="Aprašymas"
                        rows={4}
                        className="resize-none"
                        classNames={{
                            container: 'w-full',
                        }}
                    />
                    <HiddenInput name="projectId" value={projectId} />
                </div>
                <div className="flex flex-col gap-4 items-start">
                    <FormError message={state.errorMessage} />
                    <Button type="submit" variant="secondary">
                        Sukurti užduotį
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
};

export default TaskCreationForm;
