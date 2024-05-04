import { z } from 'zod';

export const loginFormSchema = z.object({
    email: z.string().trim().email({ message: 'Invalid email address' }),
    password: z.string().trim().min(1, {
        message: 'Password is required',
    }),
});

export const registerFormSchema = z.object({
    name: z.string().trim().min(1, {
        message: 'Name is required',
    }),
    surname: z.string().trim().min(1, {
        message: 'Surname is required',
    }),
    email: z.string().trim().email({ message: 'Invalid email address' }),
    password: z.string().trim().min(1, {
        message: 'Password is required',
    }),
});
