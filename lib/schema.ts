import z from "zod";

const ZMinMax = z.object({
    min: z.string(),
    max: z.string()
})

export const ZLogin = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});

export const ZNewResource = z.object({
    type: z.enum(["folder", "file"]),
    name: z.string(),
    file: z.instanceof(File).nullable()
});

export const ZResourceFilter = z.object({
    folder: z.string().nullable(),
    search: z.string().nullable(),
    limit: z.number(),
    page: z.number(),
    sort: z.object({
        name: z.boolean(),
        type: z.boolean(),
        fileType: z.boolean(),
        size: z.boolean(),
        status: z.boolean(),
        createdAt: z.boolean(),
        updatedAt: z.boolean(),
    }),
    filter: z.object({
        type: z.array(z.string()),
        fileType: z.array(z.string()),
        status: z.array(z.string()),
        size: ZMinMax,
        createAt: ZMinMax,
        updatedAt: ZMinMax
    })
});