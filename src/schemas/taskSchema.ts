import { TaskStates } from '@/constants';
import { z } from 'zod';

export const taskSchema = z.object({
    id: z.string(),
    taskName: z.string(),
    description: z.string().nullable(),
    state: TaskStates,
});

export const tasksSchema = z.array(taskSchema);
