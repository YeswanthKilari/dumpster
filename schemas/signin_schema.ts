import * as z from 'zod';

export const siginSchema = z.object({
    identifier: z.string().min(1, "email is required").email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
})