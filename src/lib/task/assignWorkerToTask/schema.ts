import { z } from 'zod';

export const assignWorkerToTaskFormSchema = z.object({
    userId: z.string(),
    taskId: z.string(),
});
