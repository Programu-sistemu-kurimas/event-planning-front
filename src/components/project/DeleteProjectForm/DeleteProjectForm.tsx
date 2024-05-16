'use client';

import { Button } from '@/components/common';
import { FormError, HiddenInput } from '@/components/form';
import { useDeleteProject } from '@/lib/project';
import { useParams } from 'next/navigation';
import { FormEvent, useRef } from 'react';
import { FormProvider } from 'react-hook-form';

const DeleteProjectForm = () => {
    const { id } = useParams();

    const projectId = String(id);

    const { formAction, form, state } = useDeleteProject({ projectId });

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
                <div className="bg-errorLight px-2 py-4 rounded-full flex items-center text-xl lg:text-3xl text-secondaryLight justify-center">
                    Projektas bus ištrintas visam laikui
                </div>
                <HiddenInput name="projectId" value={projectId} />
                <div className="flex gap-4 items-center flex-col">
                    <FormError message={state.errorMessage} />
                    <Button type="submit" variant="secondary">
                        Patvirtinti
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
};

export default DeleteProjectForm;
