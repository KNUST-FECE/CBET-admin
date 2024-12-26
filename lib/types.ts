import { Type } from "lucide-react";
import { ZLogin } from "./schema";
import { z } from "zod";

export type IQuery = {
    params: {[key: string]: string}
};

export type ILogin = z.infer<typeof ZLogin>;

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
