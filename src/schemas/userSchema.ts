import { z } from 'zod';

export const userSchema = z.object({
    id: z.string(),
    name: z.string(),
    surname: z.string(),
    email: z.string().email(),
    token: z.string(),
});

export const usersSchema = z.array(
    z.object({
        id: z.string(),
        userName: z.string(),
        userSurname: z.string(),
        email: z.string().email(),
    })
);
