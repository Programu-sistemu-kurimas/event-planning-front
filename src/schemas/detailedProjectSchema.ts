import { z } from 'zod';
import { workersSchema } from './workerSchema';

export const detailedProjectSchema = z.object({
    id: z.string(),
    projectName: z.string(),
    description: z.string(),
    workers: workersSchema,
});
