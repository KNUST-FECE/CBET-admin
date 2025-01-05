import * as Types from "./types";

export const keys = {
    resources: (filter: Types.IResourceFilter) => ["resources", filter] as const,
    resource: (id: string) => ["resources", id] as const,
    departmentStats: (dep: string) => ["resources","department-stat", dep] as const,
    folders: (id: string) => ["resources", "folders", id] as const,

    blogs: (filter: Types.IBlogFilter) => ["blogs", filter] as const,
    recentBlogs: ["blogs", "recent"] as const,
    blog: (id: string) => ["blogs", id] as const,

    shops: (filter: Types.IShopFilter) => ["shops", filter] as const,
    shop: (id: string) => ["shops", id] as const,

    products: (filter: Types.IProductFilter) => ["products", filter] as const,
    recentProducts: ["products", "recent"] as const,
    product: (id: string) => ["products", id] as const,

    users: (filter: Types.IUserFilter) => ["users", filter] as const,
    user: (id: string) => ["users", id] as const,

    members: (filter: Types.IMemberFilter) => ["members", filter] as const,
    member: (id: string) => ["members", id] as const,

    reports: (filter: Types.IReportFilter) => ["reports", filter] as const,
    report: (id: string) => ["reports", id] as const,

    settings: ["settings"] as const,
    roles: ["roles"] as const,
}