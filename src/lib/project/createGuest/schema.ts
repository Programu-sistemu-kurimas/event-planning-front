import { z } from 'zod';

export const createGuestFormSchema = z.object({
    projectId: z.string(),
    guestName: z.string().trim().min(1, {
        message: 'Svečio vardas yra privalomas',
    }),
    guestSurname: z.string().trim().min(1, {
        message: 'Svečio pavardė yra privaloma',
    }),
});
