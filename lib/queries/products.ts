"use server";

import { format, getDb } from "../mongo-utils";
import { IProduct } from "../types";


export async function getRecentProducts() {
    const data:IProduct[] = [];

    await using db = await getDb(); 

    const cursor = db.P.find().sort({ createdAt: -1 }).limit(5);    

    for await (const object of cursor) {
        const parsedData = format.from<IProduct>(object);
        data.push(parsedData);
    }

    return data;
}

export async function getProducts() {
    const data:IProduct[] = [];

    await using db = await getDb();

    const cursor = db.P.find();

    for await (const object of cursor) {
        const parsedData = format.from<IProduct>(object);
        data.push(parsedData);
    }

    return data;
}