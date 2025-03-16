import * as Schema from "./schema";
import { z } from "zod";
import '@tanstack/react-table';
import { RowData } from "@tanstack/react-table";

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    headClass: string
    cellClass: string
  }
}

export type IQuery = {
    params: {[key: string]: string},
    searchParams: { [key: string]: string | string[] | undefined }
};

export type IResourceType = "folder" | "file";

export type ILogin = z.infer<typeof Schema.ZLogin>;
export type INewFolder = z.infer<typeof Schema.ZNewFolder>;
export type INewFile = z.infer<typeof Schema.ZNewFile>;
export type INewMember = z.infer<typeof Schema.ZNewMember>;
export type INewUser = z.infer<typeof Schema.ZNewUser>;
export type INewRole = z.infer<typeof Schema.ZNewRole>;
export type INewBlog = z.infer<typeof Schema.ZNewBlog>;
export type IRenameResource = z.infer<typeof Schema.ZRenameResource>;
export type IResourceFilter = z.infer<typeof Schema.ZResourceFilter>;
export type IBlogFilter = z.infer<typeof Schema.ZBlogFilter>;
export type IProductFilter = z.infer<typeof Schema.ZProductFilter>;
export type IShopFilter = z.infer<typeof Schema.ZShopFilter>;
export type IReportFilter = z.infer<typeof Schema.ZReportFilter>;
export type IUserFilter = z.infer<typeof Schema.ZUserFilter>;
export type IMemberFilter = z.infer<typeof Schema.ZMemberFilter>;

export interface IMember {
    id: string
    name: string
    email: string
    password: string
    status: string
    emailVerified: string
    image: string
    roleID: string
    updatedAt: string
    createdAt: string
}

export interface IUser {
    id: string
    name: string
    studentNo: string
    indexNo: string
    department: string
    level: number
    shopID: string
    image: string
    likedProducts: string[]
    likedBlogs: string[]
    updatedAt: string
    createdAt: string
}

export interface IResource {
    id: string
    name: string
    type: IResourceType
    fileUrl: string | null
    fileType: string | null
    parentID: string[]
    fileCount: number
    folderCount: number
    creatorID: string
    status: string
    size: string
    updatedAt: Date
    createdAt: Date
}

export interface IBlog {
    id: string
    name: string
    authorID: string
    category: string
    tags: string[]
    likes: number
    status: string
    coverUrl: string
    content: string
    updatedAt: string
    createdAt: string
}

export interface IProduct {
    id: string
    name: string
    price: number
    discount: number
    description: string
    category: string
    inStock: number
    tags: string[]
    images: string[]
    shopID: string
    likes: number
    status: boolean
    approval: boolean
    deniedMessage: string
    updatedAt: string
    createdAt: string
}

export interface IShop {
    id: string
    name: string
    avatar: string
    email: string
    contacts: [string]
    socials: {
        facebook: string
        instagram: string
        twitter: string
    }[]
    productCount: number
    userID: string
    updatedAt: string
    createdAt: string
}

export interface IReport {
    id: string
    userID: string
    category: string
    issueID: string
    url: string
    type: string
    summary: string
    status: boolean
    updatedAt: string
    createdAt: string
}

export interface IRole {
    id: string
    name: string
    resourcePermissions: string[]
    blogPermissions: string[]
    marketPermisions: string[]
    userPermissions: string[]
    memberPermissions: string[]
    reportPermissions: string[]
    rolePermissions: string[]
    updatedAt: string
    createdAt: string
}

export type IDataAction = {
    totalSelected: number,
    onClose: () => void,
    actions: {
        label: string,
        trigger: () => void,
        single?: boolean
    }[]
}

export type IFolderTrace = Pick<IResource, "id" | "name">;