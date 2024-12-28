import { Type } from "lucide-react";
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
    updatedAt: string
    createdAt: string
}

export interface IResource {
    id: string
    name: string
    type: string
    dataUrl: string
    parentID: [string]
    fileCount: number
    folderCount: number
    size: number
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
