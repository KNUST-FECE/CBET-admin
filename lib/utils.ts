import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
*  RETURNS THE BASE URL BASED ON THE ENVIRONMENT
*/
export const baseUrl = () => {

    if(process.env.NEXT_PUBLIC_VERCEL_ENV === "production")
        return (`https://${process.env.NEXT_PUBLIC_VERCEL_URL}`)
    else
        return (`http://${process.env.NEXT_PUBLIC_VERCEL_URL}`)
    
};

export function addTimeStamp<T>(list: Record<string, any>[], isUpdate = false):T[] {
    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();

    return list.map(item => isUpdate ? 
        ({ ...item, updatedAt}) : 
        ({ ...item, createdAt, updatedAt})
    ) as T[];
}

export function getFilterString<T extends Record<string, any>>(filter: T): string {
    const params: Record<string, string> = {};

    Object.entries(filter).forEach(([key, value]) => {
        if (value === null || value === undefined || value === '' || value === 0) {
            return;
        }
        if (typeof value === "string" || typeof value === "number") {
            params[key] = value.toString();
        } else if (Array.isArray(value) && value.length !== 0) {
            params[key] = "l;" + value.join(",");
        } else if (typeof value === "object" && "min" in value && "max" in value) {
            if(!value.min && !value.max) return;
            params[key] = `min:${value.min},max:${value.max}`;
        } else if (key === "sort" && typeof value === "object") {
            // Handle sort object (e.g., { name: true, email: false })
            const sortKeys = Object.entries(value)
                .filter(([sortKey, sortValue]) => sortValue !== undefined && sortKey !== "name")
                .map(([sortKey, sortValue]) => `${sortKey}:${sortValue? "asc":"dsc"}`)
                .join(",");
            if (sortKeys) {
                params[key] = sortKeys;
            }
        }
    });

    return new URLSearchParams(params).toString();
}

export function getFilterObject<T>(searchParams: URLSearchParams, schema: z.ZodType<T>): T {
    const filterObject: Record<string, unknown> = {};

    searchParams.forEach((value, key) => {
        if (value.includes(":")) {
            const nested = Object.fromEntries(
                value.split(",").map((pair) => {
                    let keyPair = pair.split(/:(.+)/,2) as [string, string|boolean];
                    if(key === "sort") {
                        keyPair[1] === "asc" ? 
                            keyPair[1] = true : 
                            keyPair[1] = false
                    }
                    return keyPair;
                })
            );
            filterObject[key] = nested;
        }
        else if (value.includes(";")) {
            //value has the form key = l;data1,data2
            filterObject[key] = value.split(";")[1].split(",");
        } 
        else {
            const numberValue = Number(value);
            filterObject[key] = isNaN(numberValue) ? value : numberValue;
        }
    });
    
    return schema.parse(filterObject) as T;
}

export const convertFileSize = (sizeInBytes: number, digits?: number) => {
    if (sizeInBytes < 1024) {
        return sizeInBytes + " Bytes"; // Less than 1 KB, show in Bytes
    } else if (sizeInBytes < 1024 * 1024) {
        const sizeInKB = sizeInBytes / 1024;
        return sizeInKB.toFixed(digits || 1) + " KB"; // Less than 1 MB, show in KB
    } else if (sizeInBytes < 1024 * 1024 * 1024) {
        const sizeInMB = sizeInBytes / (1024 * 1024);
        return sizeInMB.toFixed(digits || 1) + " MB"; // Less than 1 GB, show in MB
    } else {
        const sizeInGB = sizeInBytes / (1024 * 1024 * 1024);
        return sizeInGB.toFixed(digits || 1) + " GB"; // 1 GB or more, show in GB
    }
};

export const getFileDetails = (fileName: string) => {
    const list = fileName.split(".");
    const name = list[0];
    const type = list.pop()?.toLowerCase() ?? "file";

    //TODO: split the filetype rather to get the real type (image/Png) split by "/" the pick the png
    //TODO: means pass (File)file.type to the function and also file.name and pick them and pass them as an object


    return {name, type};
};

export const toCamelCase = (sentence: string): string => {
    return sentence
    .toLowerCase()
    .split(/[\s_-]+/)
    .map((word, index) =>
        index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join('');
}
  
export const getFileIcon = ( extension: string | undefined ) => {
    switch (extension) {
      case "pdf":
        return "/assets/icons/file-pdf.svg";
      case "doc":
        return "/assets/icons/file-doc.svg";
      case "docx":
        return "/assets/icons/file-docx.svg";
      case "csv":
        return "/assets/icons/file-csv.svg";
      case "txt":
        return "/assets/icons/file-txt.svg";
      case "xls":
      case "xlsx":
        return "/assets/icons/file-document.svg";
      case "svg":
        return "/assets/icons/file-image.svg";
    }
};

export function buildQuery(filters: Record<string, any>, searchKeys: string[]) {
    const query: Record<string, any> = {};
    const sort: Record<string, 1 | -1> = {};
    const page: number = filters.page ?? 1;
    const limit: number = filters.limit ?? 100;
    const skip = (page - 1) * limit;

    for (const [key, value] of Object.entries(filters)) {
        if (value === undefined || value === null) continue;

        if ( key === "folder") {
            !!value ?
                (query.$expr = { $eq: [ { $arrayElemAt: ["$parentID", -1] }, value ]}) : 
                (query.parentID = { $size: 0 })
        } else if (key === "search") {
            query.$or = searchKeys.map(skey => ({ [skey] : { $regex: value, $options: "i" }}))
        } else if (Array.isArray(value)) {
            query[key] = { $in: value };
        } else if (typeof value === "object" && value !== null && key !== "sort") {
            const { min, max } = value;
            query[key] = {
                ...(min !== undefined ? { $gte: min } : {}),
                ...(max !== undefined ? { $lte: max } : {}),
            };
        }
    }

    if (filters.sort) {
        for (const [key, value] of Object.entries(filters.sort)) {
            if (value === undefined) continue;
            value === true ? sort[key] = 1 : sort[key] = -1;
        }
    }

    return { query, sort, limit, skip };
}