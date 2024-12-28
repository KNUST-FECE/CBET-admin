"use server";

import { format, getDb } from "@/lib/utils";
import { IMember } from "@/lib/types";

export async function getMemberByEmail(email: string){
    await using db = await getDb();
    const member = await db.M.findOne({email});

    return format.from<IMember>(member!)
}

export async function getDepartmentStat(dep:string){
    await using db = await getDb();
    const userCount = await db.U.countDocuments({department: dep});
    const depFolder = await db.RC.findOne(
        { name: dep, type: "folder", parentID: [] },
        { projection: { _id: 0, folderCount: 1, fileCount: 1 } }
    );

    if (!depFolder) 
        return { userCount, folderCount: 0, fileCount: 0 }

    const folderCount = depFolder.folderCount || 0;
    const fileCount = depFolder.fileCount || 0;

    return { userCount, folderCount, fileCount };
}