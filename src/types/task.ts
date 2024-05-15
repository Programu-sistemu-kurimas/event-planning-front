import { taskSchema } from '@/schemas';
import { z } from 'zod';

export type Task = z.infer<typeof taskSchema>;
