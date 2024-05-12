'use client';

import { Button } from '@/components/common';
import { FormError, FormInput } from '@/components/form';
import { useLogin } from '@/lib/auth';
import { FormEvent, useRef } from 'react';
import { FormProvider } from 'react-hook-form';

const baseFormInputClassnames = {
    error: 'self-center',
};

export const LoginForm = () => {
    const { formAction, form, state } = useLogin();

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
                noValidate
            >
                <div className="flex flex-col gap-5 w-[292px]">
                    <FormInput
                        name="email"
                        placeholder="El. paštas"
                        classNames={baseFormInputClassnames}
                    />
                    <FormInput
                        name="password"
                        placeholder="Slaptažodis"
                        classNames={baseFormInputClassnames}
                        type="password"
                    />
                </div>
                <div className="flex items-center gap-4 flex-col w-full">
                    <FormError message={state.errorMessage} />
                    <Button type="submit" variant="green">
                        Prisijungti
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
};
