'use client';

import { Button } from '@/components/common';
import { FormError, FormInput, HiddenInput } from '@/components/form';
import { useChangeProjectName } from '@/lib/project';
import { useParams, useSearchParams } from 'next/navigation';
import { FormEvent, useRef } from 'react';
import { FormProvider } from 'react-hook-form';

const ChangeProjectNameForm = () => {
    const { id } = useParams();
    const searchParams = useSearchParams();

    const projectId = String(id);
    const currentProjectName = String(searchParams.get('currentProjectName'));

    const { formAction, form, state } = useChangeProjectName({
        projectId,
        currentProjectName,
    });

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
                <HiddenInput name="projectId" value={projectId} />
                <FormInput name="projectName" />
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

export default ChangeProjectNameForm;
