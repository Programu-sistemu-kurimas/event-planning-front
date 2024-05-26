import { z } from 'zod';

export const unarchiveProjectFormSchema = z.object({
    projectId: z.string(),
});
