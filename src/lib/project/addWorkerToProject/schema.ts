import { z } from 'zod';

export const addWorkerToProjectFormSchema = z.object({
    email: z
        .string()
        .trim()
        .email({ message: 'Neteisingas el. pašto formatas' }),
    projectId: z.string(),
});
