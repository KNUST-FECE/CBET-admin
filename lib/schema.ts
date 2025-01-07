import z from "zod";

export const ZLogin = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});

export const ZNewResource = z.object({
    type: z.enum(["folder", "file"]),
    name: z.string(),
    file: z.instanceof(File).nullable()
})