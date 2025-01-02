"use server";

import { IBlog } from "../types";
import { format, getDb } from "../utils";

export async function getRecentBlogs() {
    const data: IBlog[] = [];

    await using db = await getDb();

    const cursor = db.B.find().sort({ createdAt: -1 }).limit(5);

    for await (const object of cursor) {
        const parsedData = format.from<IBlog>(object);
        data.push(parsedData);
    }

    return data;
}

export async function getBlogs() {
    const data: IBlog[] = [];

    await using db = await getDb();

    const cursor = db.B.find();

    for await (const object of cursor) {
        const parsedData = format.from<IBlog>(object);
        data.push(parsedData);
    }

    return data;
}