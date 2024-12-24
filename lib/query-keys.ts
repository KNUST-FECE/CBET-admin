import * as Types from "./types";

export const keys = {
    resources: (filter: Types.ResourceFilterType) => ["resources", filter] as const,
    resource: (id: string) => ["resources", id] as const,

    blogs: (filter: Types.BlogFilterType) => ["blogs", filter] as const,
    blog: (id: string) => ["blogs", id] as const,

    shops: (filter: Types.ShopFilterType) => ["shops", filter] as const,
    shop:(id: string) => ["shops", id] as const,

    products: (filter: Types.ProductFilterType) => ["products", filter] as const,
    product: (id: string) => ["products", id] as const,

    users: (filter: Types.UserFilterType) => ["users", filter] as const,
    user: (id: string) => ["users", id] as const,

    members: (filter: Types.MemberFilterType) => ["members", filter] as const,
    member: (id: string) => ["members", id] as const,

    reports: (filter: Types.ReportFilterType) => ["reports", filter] as const,
    report: (id: string) => ["reports", id] as const,

    settings: ["settings"] as const,
    roles: ["roles"] as const
}