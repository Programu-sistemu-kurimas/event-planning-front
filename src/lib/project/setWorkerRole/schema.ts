import { Roles } from '@/constants';
import { z } from 'zod';

export const setWorkerRoleFormSchema = z.object({
    userId: z.string(),
    projectId: z.string(),
    role: Roles,
});
