import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Db, MongoClient, ObjectId } from "mongodb";
import client from "./db";

// @ts-expect-error read only property is not assignable
Symbol.asyncDispose ??= Symbol("Symbol.asyncDispose")

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

/** @internal */
export function _id(hex?: string) {
    if (hex?.length !== 24) return new ObjectId()
    return new ObjectId(hex)
}  

export const format = {
    /** Takes a MongoDB object and returns a plain old JavaScript object */
    from<T = Record<string, unknown>>(object: Record<string, any>): T {
      const newObject: Record<string, unknown> = {}
      for (const key in object) {
        const value = object[key]
        if (key === "_id") {
          newObject.id = value.toHexString()
        } else if (key === "userId") {
          newObject[key] = value.toHexString()
        } else {
          newObject[key] = value
        }
      }
      return newObject as T
    },
    /** Takes a plain old JavaScript object and turns it into a MongoDB object */
    to<T = Record<string, unknown>>(object: Record<string, any>) {
      const newObject: Record<string, unknown> = {
        _id: _id(object.id),
      }
      for (const key in object) {
        const value = object[key]
        if (key === "userId") newObject[key] = _id(value)
        else if (key === "id") continue
        else newObject[key] = value
      }
      return newObject as T & { _id: ObjectId }
    },
};

export const getDb = async (onClose?: (client: MongoClient) => Promise<void>) => {
    const _db = client.db("cbet-platform");

    return {
      M: _db.collection("members"),
      U: _db.collection("users"),
      RC: _db.collection("resources"),
      B: _db.collection("blogs"),
      S: _db.collection("shops"),
      P: _db.collection("products"),
      RT: _db.collection("reports"),
      RO: _db.collection("roles"),
      [Symbol.asyncDispose]: async () => {
        await onClose?.(client)
      },
    }
}