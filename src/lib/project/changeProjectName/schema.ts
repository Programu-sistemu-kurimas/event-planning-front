import { z } from 'zod';

export const changeProjectNameFormSchema = z.object({
    projectName: z.string().trim().min(1, {
        message: 'Pavadinimas yra privalomas',
    }),
    projectId: z.string(),
});
