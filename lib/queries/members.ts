"use server";

import { IMember } from "../types";
import { format, getDb } from "../utils";

/**
 * Retrieves a member from the database by their email address.
 *
 * @param email - The email address of the member to retrieve.
 * @returns A promise that resolves to the member object formatted as an IMember instance.
 */
export async function getMemberByEmail(email: string){
    await using db = await getDb();
    const member = await db.M.findOne({email});

    return format.from<IMember>(member!)
}

export async function getMembers() {
    const data: IMember[] = [];

    await using db = await getDb();

    const cursor = db.M.find();

    for await (const object of cursor) {
        const parsedData = format.from<IMember>(object);
        data.push(parsedData);
    }

    return data;
}
