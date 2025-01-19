import { type ClassValue, clsx } from "clsx";
import { ReadonlyURLSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

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

export function getFilterString<T>(filter: T): string {

    const filterString = "";
    return filterString;
}

export function getFilterObject<T>(searchParams: ReadonlyURLSearchParams) {
    return {} as T;
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