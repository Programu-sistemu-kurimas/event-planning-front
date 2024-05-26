import { z } from 'zod';

export const removeWorkerFromProjectFormSchema = z.object({
    email: z
        .string()
        .trim()
        .email({ message: 'Neteisingas el. pašto formatas' }),
    projectId: z.string(),
});
