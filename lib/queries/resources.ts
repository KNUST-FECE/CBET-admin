"use server";

import { _id, format, getDb } from "../mongo-utils";
import { IFolderTrace, IResource } from "../types";
import { addTimeStamp } from "../utils";

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

    // TODO: get resources the current user has access to
    // TODO: get resources having status => accessible | hidden but not deleted
    const cursor = db.RC.find();

    for await (const object of cursor) {
        const parsedData = format.from<IResource>(object);
        data.push(parsedData);
    }

    return data || [];
}

export async function getFolderTrace(resourceID: string | null) {
    // TODO: omit other attributes in IResource and return only id, name
    const folders: IFolderTrace[] = [];

    if (!resourceID) return [];

    await using db = await getDb();

    // TODO: make sure typescript knows parentID is a list of object ids
    const resource = await db.RC.findOne({ _id: _id(resourceID) }, { projection: { _id: 1, name: 1, parentID: 1} });

    if(!resource) return [];

    const { parentID, ...currentFolder } = resource;

    for ( const id of parentID ) {
        let folder = await db.RC.findOne({ _id: id }, { projection: {_id: 1, name: 1} });
        if (!folder) return [];
        folders.push(format.from<IFolderTrace>(folder));
    }
    folders.push(format.from<IFolderTrace>(currentFolder));

    return folders;
}

export async function addResource({resource}:{resource: Omit<IResource, "id"|"updatedAt"|"createdAt">[]}) {

    const dataWithStamps = addTimeStamp<IResource>(resource);
    const parsedData = dataWithStamps.map(format.to);
    const immediateParentID = parsedData[0]?.parentID?.at(-1);
     
    await using db = await getDb();

    if(immediateParentID) {
        parsedData?.at(0)?.type === "folder" ?
            await db.RC.updateOne({_id: immediateParentID}, { $inc: {folderCount: 1} }) :
            await db.RC.updateOne({_id: immediateParentID}, { $inc: {fileCount: 1} });
    };

    await db.RC.insertMany(parsedData);

    return "success";
};

export async function modifyResources() {
    await using db = await getDb();
    // TODO: write function to update the name, status
}

export async function softRemoveOneResource(id: string) {
    await using db = await getDb();
    
    // TODO: make sure to delete multiple resources at once;
    await db.RC.updateOne({_id: _id(id)}, { status: "deleted"});
}

export async function hardRemoveOneResource(id: string) {
    await using db = await getDb();

    // TODO: make sure to hard delete multiple resources at once;
    await db.RC.updateOne({_id: _id(id)}, { status: "deleted"});
}