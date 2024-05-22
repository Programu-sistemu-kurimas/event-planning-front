import { z } from 'zod';

export const guestSchema = z.object({
    id: z.string(),
    guestName: z.string(),
    guestSurname: z.string(),
});

export const guestsSchema = z.array(guestSchema);
