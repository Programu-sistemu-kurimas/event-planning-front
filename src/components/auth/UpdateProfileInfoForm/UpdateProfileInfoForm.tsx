'use client';

import { Button } from '@/components/common';
import { FormError, FormInput } from '@/components/form';
import { FormEvent, FunctionComponent, useRef } from 'react';
import { useUpdateProfileInfo } from '@/lib/auth';
import { FormProvider } from 'react-hook-form';

interface UpdateProfileInfoFormProps {
    currentName: string;
    currentSurname: string;
    currentEmail: string;
}

const UpdateProfileInfoForm: FunctionComponent<UpdateProfileInfoFormProps> = ({
    currentName,
    currentSurname,
    currentEmail,
}) => {
    const { form, formAction, state } = useUpdateProfileInfo({
        currentName,
        currentSurname,
        currentEmail,
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
                className="flex-col flex gap-20"
            >
                <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-8">
                        <p className="text-3xl w-48">Vardas</p>
                        <FormInput name="name" />
                    </div>
                    <div className="flex items-center gap-8">
                        <p className="text-3xl w-48">Pavardė</p>
                        <FormInput name="surname" />
                    </div>
                    <div className="flex items-center gap-8">
                        <p className="text-3xl w-48">El. paštas</p>
                        <FormInput name="email" />
                    </div>
                </div>
                <div className="flex items-start gap-4 flex-col w-full">
                    <FormError message={state.errorMessage} />
                    <Button type="submit" variant="secondary">
                        Atnaujinti informaciją
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
};

export default UpdateProfileInfoForm;
