'use client';

import { Button } from '@/components/common';
import { FormError, FormSelect, HiddenInput } from '@/components/form';
import { ROLE_OPTIONS } from '@/constants';
import { useSetWorkerRole } from '@/lib/project';
import { useParams, useSearchParams } from 'next/navigation';
import { FormEvent, useRef } from 'react';
import { FormProvider } from 'react-hook-form';

const SetWorkerRoleForm = () => {
    const searchParams = useSearchParams();
    const { id } = useParams();

    const userId = String(searchParams.get('userId'));
    const projectId = String(id);

    const { formAction, form, state } = useSetWorkerRole({ projectId, userId });

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
                <FormSelect name="role" options={ROLE_OPTIONS} />
                <HiddenInput name="userId" value={userId} />
                <HiddenInput name="projectId" value={projectId} />
                <div className="flex gap-4 items-center flex-col">
                    <FormError message={state.errorMessage} />
                    <Button type="submit" variant="secondary">
                        Pakeisti rolę
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
};

export default SetWorkerRoleForm;
