import z from "zod";

const ZMinMax = z.object({
    min: z.string(),
    max: z.string()
})

export const ZLogin = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});

export const ZNewFolder = z.object({
    name: z.string()
});

export const ZNewFile = z.object({
    files: z.array(z.instanceof(File))
});

export const ZResourceFilter = z.object({
    folder: z.string().nullable(),
    search: z.string().nullable(),
    limit: z.number().nullable(),
    page: z.number().nullable(),
    sort: z.object({
        name: z.boolean(),
        fileType: z.boolean(),
        size: z.boolean(),
        status: z.boolean(),
        createdAt: z.boolean(),
        updatedAt: z.boolean(),
    }).nullable(),
    filter: z.object({
        type: z.array(z.string()),
        fileType: z.array(z.string()),
        status: z.array(z.string()),
        size: ZMinMax,
        createAt: ZMinMax,
        updatedAt: ZMinMax
    }).nullable()
});

export const ZProductFilter = z.object({
    shop: z.string().nullable(),
    search: z.string().nullable(),
    limit: z.number().nullable(),
    page: z.number().nullable(),
    sort: z.object({
        name: z.boolean(),
        price: z.boolean(),
        stock: z.boolean(),
        published: z.boolean(),
        approved: z.boolean(),
        category: z.boolean(),
        createdAt: z.boolean(),
        updatedAt: z.boolean(),
    }).nullable(),
    filter: z.object({
        tags: z.array(z.string()),
        category: z.array(z.string()),
        published: z.array(z.string()),
        approved: z.array(z.string()),
        price: ZMinMax,
        stock: ZMinMax,
        createAt: ZMinMax,
        updatedAt: ZMinMax
    }).nullable()
});

export const ZShopFilter = z.object({
    search: z.string().nullable(),
    limit: z.number().nullable(),
    page: z.number().nullable(),
    sort: z.object({
        name: z.boolean(),
        email: z.boolean(),
        productCount: z.boolean(),
        createdAt: z.boolean(),
        updatedAt: z.boolean(),
    }).nullable(),
    filter: z.object({
        socials: z.array(z.string()),
        productCount: ZMinMax,
        stock: ZMinMax,
        createAt: ZMinMax,
        updatedAt: ZMinMax
    }).nullable()
});

export const ZReportFilter = z.object({
    search: z.string().nullable(),
    limit: z.number().nullable(),
    page: z.number().nullable(),
    sort: z.object({
        user: z.boolean(),
        category: z.boolean(),
        type: z.boolean(),
        summary: z.boolean(),
        serviced: z.boolean(),
        createdAt: z.boolean(),
        updatedAt: z.boolean(),
    }).nullable(),
    filter: z.object({
        category: z.array(z.string()),
        type: z.array(z.string()),
        serviced: z.array(z.string()),
        createAt: ZMinMax,
        updatedAt: ZMinMax
    }).nullable()
});

export const ZUserFilter = z.object({
    search: z.string().nullable(),
    limit: z.number().nullable(),
    page: z.number().nullable(),
    sort: z.object({
        user: z.boolean(),
        studentNo: z.boolean(),
        indexNo: z.boolean(),
        department: z.boolean(),
        level: z.boolean(),
        createdAt: z.boolean(),
        updatedAt: z.boolean(),
    }).nullable(),
    filter: z.object({
        departemnt: z.array(z.string()),
        level: z.array(z.string()),
        createAt: ZMinMax,
        updatedAt: ZMinMax
    }).nullable()
});

export const ZMemberFilter = z.object({
    search: z.string().nullable(),
    limit: z.number().nullable(),
    page: z.number().nullable(),
    sort: z.object({
        name: z.boolean(),
        email: z.boolean(),
        role: z.boolean(),
        createdAt: z.boolean(),
        updatedAt: z.boolean(),
    }).nullable(),
    filter: z.object({
        role: z.array(z.string()),
        createAt: ZMinMax,
        updatedAt: ZMinMax
    }).nullable()
});