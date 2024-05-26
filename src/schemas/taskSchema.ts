import { TaskStates } from '@/constants';
import { z } from 'zod';
import { workerSchema } from './workerSchema';

export const taskSchema = z.object({
    id: z.string(),
    taskName: z.string(),
    description: z.string().nullable(),
    state: TaskStates,
});

export const detailTaskSchema = z.object({
    id: z.string(),
    taskName: z.string(),
    taskDescription: z.string().nullable(),
    state: TaskStates,
    assignedUsers: z.array(workerSchema),
});

export const tasksSchema = z.array(taskSchema);
