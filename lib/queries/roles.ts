"use server";

import { format, getDb } from "../mongo-utils";
import { IRole } from "../types";

export async function getRoles() {
    const data: IRole[] = [];

    await using db = await getDb();

    const cursor = db.RO.find();

    for await (const object of cursor) {
        const parsedData = format.from<IRole>(object);
        data.push(parsedData);
    }

    return data;
}