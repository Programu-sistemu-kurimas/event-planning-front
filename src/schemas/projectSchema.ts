import { z } from 'zod';

export const projectSchema = z.object({
    projectId: z.string(),
    name: z.string(),
    description: z.string(),
});

export const projectsSchema = z.array(projectSchema);
