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
    name: z.string().min(3, "Field is compulsory")
});

export const ZNewFile = z.object({
    files: z.array(
        z.object({
            file: z.instanceof(File),
        })
    ),
});

export const ZRenameResource = z.object({
    name: z.string().min(3, "Field is compulsory")
});

export const ZNewMember = z.object({
    name: z.string().min(3, "Name is compulsory"),
    email: z.string().min(3, "Email is compulsory"),
    role: z.string().min(14, "Role is compulsary")
});

export const ZNewRole = z.object({
    name: z.string().min(3, "Name is compulsory"),
    resourcePermissions: z.array(z.string()),
    blogPermissions: z.array(z.string()),
    marketPermisions: z.array(z.string()),
    userPermissions: z.array(z.string()),
    memberPermissions: z.array(z.string()),
    reportPermissions: z.array(z.string()),
    rolePermissions: z.array(z.string())
});

export const ZNewUser = z.object({
    username: z.string().min(3, "Name is compulsory"),
    studentNo: z.string().min(3, "Name is compulsory"),
    indexNo: z.string().min(3, "Name is compulsory"),
    department: z.string().min(3, "Name is compulsory"),
    level: z.string().min(3, "Name is compulsory"),
});

export const ZNewBlog = z.object({
    name: z.string().min(3, "Name is compulsory"),
    category: z.string().min(3, "Category is compulsory"),
    tags: z.string().min(3, "Tags are compulsory"),
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
    createdAt: ZMinMax.optional(),
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
    search: z.string().optional(),
    limit: z.number().optional(),
    page: z.number().optional(),
    category: z.array(z.string()).optional(),
    status: z.array(z.string()).optional(),
    createdAt: ZMinMax.optional(),
    updatedAt: ZMinMax.optional(),
    sort: z.object({
        name: z.boolean(),
        category: z.boolean(),
        likes: z.boolean(),
        status: z.boolean(),
        createdAt: z.boolean(),
        updatedAt: z.boolean(),
    }).optional(),
});

export const ZProductFilter = z.object({
    shop: z.string().optional(),
    search: z.string().optional(),
    limit: z.number().optional(),
    page: z.number().optional(),
    category: z.array(z.string()).optional(),
    status: z.array(z.string()).optional(),
    approval: z.array(z.string()).optional(),
    price: ZMinMax.optional(),
    stock: ZMinMax.optional(),
    createdAt: ZMinMax.optional(),
    updatedAt: ZMinMax.optional(),
    sort: z.object({
        name: z.boolean(),
        price: z.boolean(),
        stock: z.boolean(),
        status: z.boolean(),
        approval: z.boolean(),
        category: z.boolean(),
        createdAt: z.boolean(),
        updatedAt: z.boolean(),
    }).optional(),
});

export const ZShopFilter = z.object({
    search: z.string().optional(),
    limit: z.number().optional(),
    page: z.number().optional(),
    productCount: ZMinMax.optional(),
    createdAt: ZMinMax.optional(),
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
    status: z.array(z.string()).optional(),
    createdAt: ZMinMax.optional(),
    updatedAt: ZMinMax.optional(),
    sort: z.object({
        user: z.boolean(),
        summary: z.boolean(),
        category: z.boolean(),
        type: z.boolean(),
        status: z.boolean(),
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
    createdAt: ZMinMax.optional(),
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
    status: z.array(z.string()).optional(),
    createdAt: ZMinMax.optional(),
    updatedAt: ZMinMax.optional(),
    sort: z.object({
        name: z.boolean(),
        email: z.boolean(),
        role: z.boolean(),
        createdAt: z.boolean(),
        updatedAt: z.boolean(),
    }).optional(),
});