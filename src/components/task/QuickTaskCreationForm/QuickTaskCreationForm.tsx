'use client';

import { Button } from '@/components/common';
import { FormError, FormInput, HiddenInput } from '@/components/form';
import { useQuickCreateTask } from '@/lib/task';
import { useParams } from 'next/navigation';
import { FormEvent, useRef } from 'react';
import { FormProvider } from 'react-hook-form';

const QuickTaskCreationForm = () => {
    const { id } = useParams();

    const projectId = String(id);

    const { formAction, form, state } = useQuickCreateTask({ projectId });

    const formRef = useRef<HTMLFormElement>(null);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        return form.handleSubmit(() => {
            formAction(new FormData(formRef.current!));
            form.reset();
        })(e);
    };

    return (
        <FormProvider {...form}>
            <form
                onSubmit={onSubmit}
                action={formAction}
                ref={formRef}
                className="flex flex-col gap-4"
                noValidate
            >
                <div className="flex gap-12 items-end">
                    <FormInput
                        name="taskName"
                        label="Naujos užduoties pavadinimas"
                        displayErrors={false}
                    />
                    <HiddenInput name="projectId" value={projectId} />
                    <Button
                        type="submit"
                        variant="secondary"
                        size="md"
                        className="mb-2"
                    >
                        +
                    </Button>
                </div>
                <FormError message={state.errorMessage} />
            </form>
        </FormProvider>
    );
};

export default QuickTaskCreationForm;
