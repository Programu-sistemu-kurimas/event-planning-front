import { z } from 'zod';

export const loginFormSchema = z.object({
    email: z
        .string()
        .trim()
        .email({ message: 'Neteisingas el. pašto formatas' }),
    password: z.string().trim().min(1, {
        message: 'Slaptažodis yra privalomas',
    }),
});

export const registerFormSchema = z.object({
    name: z.string().trim().min(1, {
        message: 'Vardas yra privalomas',
    }),
    surname: z.string().trim().min(1, {
        message: 'Pavardė yra privaloma',
    }),
    email: z
        .string()
        .trim()
        .email({ message: 'Neteisingas el. pašto formatas' }),
    password: z.string().trim().min(1, {
        message: 'Slaptažodis yra privalomas',
    }),
});
