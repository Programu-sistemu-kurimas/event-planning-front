import { guestSchema } from '@/schemas';
import { z } from 'zod';

export type Guest = z.infer<typeof guestSchema>;
