"use server";

import { format, getDb } from "../mongo-utils";
import { IUser } from "../types";

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