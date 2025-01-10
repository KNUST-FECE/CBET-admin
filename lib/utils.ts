import { type ClassValue, clsx } from "clsx";
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

export function getFilterString() {

}

export function getFilterObject() {
    
}