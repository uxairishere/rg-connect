import * as z from 'zod';

export const formSchema = z.object({
    profileId: z.string().trim().min(1, {
        message: "Profile ID is required",
    }),
    loginCode: z.string().trim().min(1, {
        message: "Login code is required",
    }),
    username: z.string().trim().min(1, {
        message: "Username is required",
    }),
    password: z.string().trim().min(1, {
        message: "Password is required",
    }),
})