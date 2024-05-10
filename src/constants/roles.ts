import { z } from 'zod';

const VALUES = ['Admin', 'User'] as const;

export const Roles = z.enum(VALUES);
