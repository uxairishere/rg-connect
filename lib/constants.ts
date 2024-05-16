import * as z from 'zod';

export const formSchema = z.object({
    profileId: z.string().min(1, {
        message: "Profile ID is required",
    }),
    loginCode: z.string().min(1, {
        message: "Login code is required",
    }),
    username: z.string().min(1, {
        message: "Username is required",
    }),
    password: z.string().min(1, {
        message: "Password is required",
    }),
})