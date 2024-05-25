import { z } from 'zod';

export const deleteGuestFormSchema = z.object({
    guestId: z.string(),
    projectId: z.string(),
});
