import { z } from 'zod';

export const quickCreateTaskFormSchema = z.object({
    projectId: z.string(),
    taskName: z.string().trim().min(1, {
        message: 'Užduoties pavadinimas yra privalomas',
    }),
});
