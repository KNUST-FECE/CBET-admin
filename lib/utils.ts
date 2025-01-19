import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useSearchParams } from "next/navigation";
import { z } from "zod";
import { IFolderTrace } from "./types";

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

export function getFilterString<T extends Record<string, any>>(filter: T): string {
    const params: Record<string, string> = {};

    Object.entries(filter).forEach(([key, value]) => {
        if (value === null || value === undefined) {
            // Skip null or undefined values
            return;
        }
        if (typeof value === "string" || typeof value === "number") {
            // Directly add primitive types
            params[key] = value.toString();
        } else if (Array.isArray(value)) {
            // Join array values with commas
            params[key] = value.join(",");
        } else if (typeof value === "object" && "min" in value && "max" in value) {
            // Handle MinMax object (e.g., { min: "10", max: "100" })
            params[key] = `min:${value.min},max:${value.max}`;
        } else if (key === "sort" && typeof value === "object") {
            // Handle sort object (e.g., { name: true, email: false })
            const sortKeys = Object.entries(value)
                .filter(([, sortValue]) => sortValue === true) // Only include true values
                .map(([sortKey]) => sortKey)
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
                value.split(",").map((pair) => pair.split(":") as [string, string])
            );
            filterObject[key] = nested;
        }
        else if (value.includes(",")) {
            filterObject[key] = value.split(",");
        } 
        else {
            const numberValue = Number(value);
            filterObject[key] = isNaN(numberValue) ? value : numberValue;
        }
    });

    // Validate and return the parsed object
    return schema.parse(filterObject);
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

export const getFileType = (fileName: string) => {
    const type = fileName.split(".").pop()?.toLowerCase();

    if (!type) 
        return "file";

    return type;
};
  
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

export const getFileMeta = (file:File) => {
    // TODO: work on the file

    return { name: "File Name", fileType: "pdf", size: "20 MB"}
}

export const saveFile = async (file:File) => {
    // TODO: save the file

    return { fileUrl: "" }
}