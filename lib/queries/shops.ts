"use server";

import { IShop } from "../types";
import { format, getDb } from "../utils";

export async function getShops() {
    const data: IShop[] = [];

    await using db = await getDb();

    const cursor = db.S.find();

    for await (const object of cursor) {
        const parsedData = format.from<IShop>(object);
        data.push(parsedData);
    }

    return data;
}