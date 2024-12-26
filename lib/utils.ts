import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Db } from "mongodb";
import client from "./db";


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

export async function conn<T>(callback: (db: Db, isLocal: boolean) => Promise<T>): Promise<T> {
    await client.connect();

    const db = client.db("cbet-platform");
    const isLocal = process.env.NODE_ENV === 'development';

    return await callback(db, isLocal) as T;
};