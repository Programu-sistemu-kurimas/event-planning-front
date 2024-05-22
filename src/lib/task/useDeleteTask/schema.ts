import { z } from 'zod';

export const deleteTaskFormSchema = z.object({
    taskId: z.string(),
    projectId: z.string(),
});
