'use client';

import { Button } from '@/components/common';
import { FormError, FormInput, HiddenInput } from '@/components/form';
import { useAddWorkerToProject } from '@/lib/project';
import { useParams } from 'next/navigation';
import { FormEvent, useRef } from 'react';
import { FormProvider } from 'react-hook-form';

const AddWorkerToProjectForm = () => {
    const { id } = useParams();

    const projectId = String(id);

    const { formAction, form, state } = useAddWorkerToProject({ projectId });

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
                className="space-y-6"
                noValidate
            >
                <FormInput name="email" placeholder="Darbuotojo el. paštas" />
                <HiddenInput name="projectId" value={projectId} />
                <div className="flex gap-4 items-center flex-col">
                    <FormError message={state.errorMessage} />
                    <Button type="submit" variant="secondary">
                        Pridėti darbuotoją
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
};

export default AddWorkerToProjectForm;
