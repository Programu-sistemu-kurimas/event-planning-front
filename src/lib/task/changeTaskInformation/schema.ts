import { z } from 'zod';

export const changeTaskInformationFormSchema = z.object({
    projectId: z.string(),
    taskId: z.string(),
    taskName: z.string().trim().min(1, {
        message: 'Užduoties pavadinimas yra privalomas',
    }),
    description: z.string(),
});
