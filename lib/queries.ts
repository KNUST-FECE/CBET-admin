import { format, getDb } from "@/lib/utils";
import { IMember } from "@/lib/types";

export async function getMemberByEmail(email: string){
    await using db = await getDb();
    const member = await db.M.findOne({email});

    return format.from<IMember>(member!)
}