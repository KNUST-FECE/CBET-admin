import z from "zod";

export const ZLogin = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});