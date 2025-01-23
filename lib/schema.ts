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
    files: z.array(
        z.object({
          file: z.instanceof(File),
        })
      ),
});

export const ZResourceFilter = z.object({
    folder: z.string().default("").optional(),
    search: z.string().optional(),
    limit: z.number().optional(),
    page: z.number().optional(),
    type: z.array(z.string()).optional(),
    fileType: z.array(z.string()).optional(),
    status: z.array(z.string()).optional(),
    size: ZMinMax.optional(),
    createAt: ZMinMax.optional(),
    updatedAt: ZMinMax.optional(),
    sort: z.object({
        name: z.boolean().nullable(),
        fileType: z.boolean().nullable(),
        size: z.boolean().nullable(),
        status: z.boolean().nullable(),
        createdAt: z.boolean().nullable(),
        updatedAt: z.boolean().nullable(),
    }).optional(),
});

export const ZBlogFilter = z.object({
    search: z.string().nullable(),
    limit: z.number().nullable(),
    page: z.number().nullable(),
    sort: z.object({
        name: z.boolean(),
        category: z.boolean(),
        likes: z.boolean(),
        status: z.boolean(),
        createdAt: z.boolean(),
        updatedAt: z.boolean(),
    }).nullable(),
    filter: z.object({
        category: z.array(z.string()),
        tags: z.array(z.string()),
        status: z.array(z.string()),
        createAt: ZMinMax,
        updatedAt: ZMinMax
    }).nullable()
});

export const ZProductFilter = z.object({
    shop: z.string().optional(),
    search: z.string().optional(),
    limit: z.number().optional(),
    page: z.number().optional(),
    tags: z.array(z.string()).optional(),
    category: z.array(z.string()).optional(),
    published: z.array(z.string()).optional(),
    approved: z.array(z.string()).optional(),
    price: ZMinMax.optional(),
    stock: ZMinMax.optional(),
    createAt: ZMinMax.optional(),
    updatedAt: ZMinMax.optional(),
    sort: z.object({
        name: z.boolean(),
        price: z.boolean(),
        stock: z.boolean(),
        published: z.boolean(),
        approved: z.boolean(),
        category: z.boolean(),
        createdAt: z.boolean(),
        updatedAt: z.boolean(),
    }).optional(),
});

export const ZShopFilter = z.object({
    search: z.string().optional(),
    limit: z.number().optional(),
    page: z.number().optional(),
    socials: z.array(z.string()).optional(),
    productCount: ZMinMax.optional(),
    stock: ZMinMax.optional(),
    createAt: ZMinMax.optional(),
    updatedAt: ZMinMax.optional(),
    sort: z.object({
        name: z.boolean(),
        email: z.boolean(),
        productCount: z.boolean(),
        createdAt: z.boolean(),
        updatedAt: z.boolean(),
    }).optional(),
});

export const ZReportFilter = z.object({
    search: z.string().optional(),
    limit: z.number().optional(),
    page: z.number().optional(),
    category: z.array(z.string()).optional(),
    type: z.array(z.string()).optional(),
    serviced: z.array(z.string()).optional(),
    createAt: ZMinMax.optional(),
    updatedAt: ZMinMax.optional(),
    sort: z.object({
        user: z.boolean(),
        category: z.boolean(),
        type: z.boolean(),
        summary: z.boolean(),
        serviced: z.boolean(),
        createdAt: z.boolean(),
        updatedAt: z.boolean(),
    }).optional(),
});

export const ZUserFilter = z.object({
    search: z.string().optional(),
    limit: z.number().optional(),
    page: z.number().optional(),
    departemnt: z.array(z.string()).optional(),
    level: z.array(z.string()).optional(),
    createAt: ZMinMax.optional(),
    updatedAt: ZMinMax.optional(),
    sort: z.object({
        user: z.boolean(),
        studentNo: z.boolean(),
        indexNo: z.boolean(),
        department: z.boolean(),
        level: z.boolean(),
        createdAt: z.boolean(),
        updatedAt: z.boolean(),
    }).optional(),
});

export const ZMemberFilter = z.object({
    search: z.string().optional(),
    limit: z.number().optional(),
    page: z.number().optional(),
    role: z.array(z.string()).optional(),
    createAt: ZMinMax.optional(),
    updatedAt: ZMinMax.optional(),
    sort: z.object({
        name: z.boolean(),
        email: z.boolean(),
        role: z.boolean(),
        createdAt: z.boolean(),
        updatedAt: z.boolean(),
    }).optional(),
});