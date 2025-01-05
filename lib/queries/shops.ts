"use server";

import { format, getDb } from "../mongo-utils";
import { IShop } from "../types";

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