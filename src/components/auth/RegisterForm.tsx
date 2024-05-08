'use client';

import { Alert, Button } from '@/components/common';
import { FormInput } from '@/components/form';
import { FormEvent, useRef } from 'react';
import { useRegister } from '@/lib/auth';
import { FormProvider } from 'react-hook-form';

export const RegisterForm = () => {
    const { form, formAction, state } = useRegister();

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
                className="flex-col flex items-center gap-16"
            >
                <div className="flex flex-col gap-5 w-[292px]">
                    <FormInput name="name" placeholder="Vardas" />
                    <FormInput name="surname" placeholder="Pavardė" />
                    <FormInput name="email" placeholder="El. paštas" />
                    <FormInput name="password" placeholder="Slaptažodis" />
                </div>
                <div className="flex items-center gap-5 flex-col w-full">
                    {state.errorMessage && <Alert>{state.errorMessage}</Alert>}
                    <Button type="submit" variant="green">
                        Registruotis
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
};
