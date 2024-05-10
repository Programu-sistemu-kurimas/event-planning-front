import { Roles } from '@/constants';
import { z } from 'zod';

export const workerSchema = z.object({
    id: z.string(),
    name: z.string(),
    surname: z.string(),
    email: z.string().email(),
    role: Roles,
});

export const workersSchema = z.array(workerSchema);
