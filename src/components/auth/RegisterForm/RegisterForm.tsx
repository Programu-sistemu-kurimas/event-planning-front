'use client';

import { Button } from '@/components/common';
import { FormError, FormInput } from '@/components/form';
import { FormEvent, useRef } from 'react';
import { useRegister } from '@/lib/auth';
import { FormProvider } from 'react-hook-form';

const baseFormInputClassnames = {
    error: 'self-center',
};

const RegisterForm = () => {
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
                    <FormInput
                        name="name"
                        placeholder="Vardas"
                        classNames={baseFormInputClassnames}
                    />
                    <FormInput
                        name="surname"
                        placeholder="Pavardė"
                        classNames={baseFormInputClassnames}
                    />
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
                        Registruotis
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
};

export default RegisterForm;
