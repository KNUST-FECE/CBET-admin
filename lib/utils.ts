
// export function cn(...inputs: ClassValue[]) {
//     return twMerge(clsx(inputs))
// }

import connectToDB from "./db";

  
/**
*  RETURNS THE BASE URL BASED ON THE ENVIRONMENT
*/
export const baseUrl = () => {

    if(process.env.NEXT_PUBLIC_VERCEL_ENV === "production")
        return (`https://${process.env.NEXT_PUBLIC_VERCEL_URL}`)
    else
        return (`http://${process.env.NEXT_PUBLIC_VERCEL_URL}`)
    
};

export async function connectionProvider<T>(callback: (isProduction: boolean) => Promise<T>): Promise<T> {
    await connectToDB();
    const isProduction = process.env.NODE_ENV === 'production';
    const data = JSON.stringify(await callback(isProduction));
  
    return JSON.parse(data || "[]") as T
};