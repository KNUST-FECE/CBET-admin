import { ZLogin } from "./schema";
import { z } from "zod";

export type IQuery = {
    params: {[key: string]: string}
};

export type ILogin = z.infer<typeof ZLogin>;

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
    studentID: string
    indexNo: string
    department: string
    level: number
    shopID: string
    image: string
    likedProducts: [string]
    likedBlogs: [string]
    updatedAt: string
    createdAt: string
}

export interface IResource {
    id: string
    name: string
    type: string
    dataUrl: string
    dataType: string
    parentID: [string]
    fileCount: number
    folderCount: number
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
    itemID: string
    issueURL: string
    issueCategory: string
    issueDescription: string
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
