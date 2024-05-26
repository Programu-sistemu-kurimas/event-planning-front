import { TaskStates } from '@/constants';
import { z } from 'zod';

export const changeTaskStateFormSchema = z.object({
    projectId: z.string(),
    taskId: z.string(),
    state: TaskStates,
});
