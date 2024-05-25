'use client';

import { Button } from '@/components/common';
import { FormError, HiddenInput } from '@/components/form';
import { useDeleteGuest } from '@/lib/project';
import { useParams, useSearchParams } from 'next/navigation';
import { FormEvent, useRef } from 'react';
import { FormProvider } from 'react-hook-form';

const DeleteGuestForm = () => {
    const { id } = useParams();
    const searchParams = useSearchParams();

    const projectId = String(id);
    const guestId = String(searchParams.get('guestId'));

    const { formAction, form, state } = useDeleteGuest({ guestId, projectId });

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
                    Svečias bus ištrintas visam laikui
                </div>
                <HiddenInput name="projectId" value={projectId} />
                <HiddenInput name="guestId" value={guestId} />
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

export default DeleteGuestForm;
