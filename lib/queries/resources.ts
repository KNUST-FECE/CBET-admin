"use server";

import { IResource } from "../types";
import { format, getDb } from "../utils";

/**
 * Retrieves statistics for a department. 
 *
 * @param dep - The department name (e.g. "computer", "biomedical", etc.)
 * @returns A promise that resolves to an object with the following properties:
 *          - `userCount`: The number of users in the department
 *          - `folderCount`: The number of folders in the department folder
 *          - `fileCount`: The number of files in the department folder
 */
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

export async function getResources() {
    const data: IResource[] = [];

    await using db = await getDb();

    const cursor = db.RC.find();

    for await (const object of cursor) {
        const parsedData = format.from<IResource>(object);
        data.push(parsedData);
    }

    return data;
}