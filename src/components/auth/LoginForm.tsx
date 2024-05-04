'use client';

import { Button } from '@/components/common/Button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/common/Form';
import { Input } from '@/components/common/Input';
import { useLogin } from '@/lib/auth';
import { FormEvent, useRef } from 'react';

export const LoginForm = () => {
    const { form, formAction, state } = useLogin();

    const formRef = useRef<HTMLFormElement>(null);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        return form.handleSubmit(() => {
            formAction(new FormData(formRef.current!));
        })(e);
    };

    return (
        <Form {...form}>
            <span className="text-destructive">{state?.errorMessage}</span>
            <form
                onSubmit={onSubmit}
                action={formAction}
                ref={formRef}
                className="space-y-8"
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="email@gmail.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="password1234" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex items-end justify-end">
                    <Button type="submit">Login</Button>
                </div>
            </form>
        </Form>
    );
};
