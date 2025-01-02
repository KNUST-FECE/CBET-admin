"use server";

import { IUser } from "../types";
import { format, getDb } from "../utils";

export async function getUsers() {
    const data: IUser[] = [];

    await using db = await getDb();

    const cursor = db.U.find();

    for await (const object of cursor) {
        const parsedData = format.from<IUser>(object);
        data.push(parsedData);
    }

    return data;
}