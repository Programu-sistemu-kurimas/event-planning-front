'use client';

import { Button } from '@/components/common';
import { FormError, FormInput, FormTextArea } from '@/components/form';
import { useCreateProject } from '@/lib/project';
import { FormEvent, useRef } from 'react';
import { FormProvider } from 'react-hook-form';

const CreateProjectForm = () => {
    const { formAction, form, state } = useCreateProject();

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
                className="flex-col flex gap-12 max-w-3xl"
                noValidate
            >
                <div className="flex flex-col items-start gap-8">
                    <FormInput
                        name="projectName"
                        label="Pavadinimas"
                        classNames={{
                            container: 'lg:w-1/2 w-full',
                        }}
                    />
                    <FormTextArea
                        name="projectDescription"
                        label="Aprašymas"
                        rows={4}
                        className="resize-none"
                        classNames={{
                            container: 'w-full',
                        }}
                    />
                </div>
                <div className="flex gap-4 flex-col items-start">
                    <FormError message={state.errorMessage} />
                    <div className="flex items-center gap-8">
                        <Button
                            type="submit"
                            variant="secondary"
                            className="flex-1"
                        >
                            Sukurti naują projektą
                        </Button>
                    </div>
                </div>
            </form>
        </FormProvider>
    );
};

export default CreateProjectForm;
