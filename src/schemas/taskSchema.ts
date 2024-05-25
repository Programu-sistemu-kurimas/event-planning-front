import { TaskStates } from '@/constants';
import { z } from 'zod';

export const taskSchema = z.object({
    id: z.string(),
    taskName: z.string(),
    description: z.string().nullable(),
    state: TaskStates,
});

export const assignedUserSchema = z.object({
    name: z.string(),
});

export const detailTaskSchema = z.object({
    id: z.string(),
    taskName: z.string(),
    taskDescription: z.string().nullable(),
    state: TaskStates,
    assignedUsers: z.array(assignedUserSchema),
});

export const tasksSchema = z.array(taskSchema);
