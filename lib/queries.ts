import { conn } from "./utils";

export const getMemberByEmail = async (email: string) => await conn(async (db) => {
    const member = await db.collection("members").findOne({email});

    return member;
})