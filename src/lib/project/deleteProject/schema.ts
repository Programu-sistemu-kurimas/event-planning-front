import { z } from 'zod';

export const deleteProjectFormSchema = z.object({
    projectId: z.string(),
});
