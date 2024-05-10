import { workerSchema } from '@/schemas';
import { z } from 'zod';

export type Worker = z.infer<typeof workerSchema>;
