import { z } from 'zod';

const VALUES = ['ToDo', 'InProgress', 'Done'] as const;

export const TaskStates = z.enum(VALUES);
