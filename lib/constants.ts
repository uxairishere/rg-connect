import * as z from 'zod';

export const formSchema = z.object({
    customerId: z.string().min(1, {
        message: "Customer ID is required",
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