import { z } from 'zod';

export const updateProfileInfoFormSchema = z.object({
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
});
