"use server";

import { format, getDb } from "../mongo-utils";
import { IReport } from "../types";

export async function getReports() {
    const data:IReport[] = [];

    await using db = await getDb();

    const cursor = db.RT.find();

    for await (const object of cursor) {
        const parsedData = format.from<IReport>(object);
        data.push(parsedData);
    }

    return data;
}