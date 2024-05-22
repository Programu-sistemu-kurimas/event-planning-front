import { z } from 'zod';

export const archiveProjectFormSchema = z.object({
    projectId: z.string(),
});
