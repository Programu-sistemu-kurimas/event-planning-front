import { z } from 'zod';

export const createProjectFormSchema = z.object({
    projectName: z.string().trim().min(1, {
        message: 'Pavadinimas yra privalomas',
    }),
    projectDescription: z.string().trim().min(1, {
        message: 'Aprašymas yra privalomas',
    }),
});
