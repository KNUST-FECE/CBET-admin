import { ZLogin, ZNewResource } from "./schema";
import { z } from "zod";
import '@tanstack/react-table' //or vue, svelte, solid, qwik, etc.
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

export type ILogin = z.infer<typeof ZLogin>;
export type INewResource = z.infer<typeof ZNewResource>;

export interface IMember {
    id: string
    name: string
    email: string
    password: string
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
    type: string
    dataUrl: string
    fileType: string
    parentID: string[]
    fileCount: number
    folderCount: number
    creatorID: string
    status: string
    size: number
    updatedAt: string
    createdAt: string
}

export interface IBlog {
    id: string
    name: string
    authorID: string
    category: string
    tags: string[]
    likes: number
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
    published: boolean
    approved: boolean
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
    serviced: boolean
    updatedAt: string
    createdAt: string
}

export interface IRole {
    id: string
    name: string
    permissions: {
        [key: string]: boolean
    }
    updatedAt: string
    createdAt: string
}

export type IResourceFilter = {

}

export type IBlogFilter = {

}

export type IShopFilter = {

}

export type IProductFilter = {

}

export type IUserFilter = {

}

export type IMemberFilter = {

}

export type IReportFilter = {
    
}
