"use server";

import { _id, format, getDb } from "../mongo-utils";
import { IResource } from "../types";

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

    return data;
}

export async function getFolderTrace(resourceID: string) {
    // TODO: omit other attributes in IResource and return only id, name
    const folders: IResource[] = [];

    await using db = await getDb();

    // TODO: make sure typescript knows parentID is a list of object ids
    const resource: any = await db.RC.findOne({ _id: _id(resourceID) }, { projection: { parentID: 1} });

    if(!resource) return [];

    for ( const id of resource.parentID ) {
        let folder = await db.RC.findOne({ _id: id }, { projection: {_id: 1, name: 1} });
        if (!folder) return [];
        let folderParsed = format.from<IResource>(folder);
        folders.push(folderParsed);
    }

    return folders;
}

export async function addResource({resource}:{resource: Omit<IResource, "id">[]}) {

    console.log({resource});
    return

    // const parsedData = format.to<IResource>(resource);
    // const immediateParentID = _id(parsedData.parentID[-1]); // future _id is not needed as would be handled by the parsing function 

    // await using db = await getDb();

    // const parentMeta = await db.RC.findOne({_id: immediateParentID}, {projection: {fileCount: 1, folderCount: 1}});

    // if(parentMeta && parsedData.type === "folder") parentMeta.folderCount = parentMeta.folderCount + 1;
    // if(parentMeta && parsedData.type === "file") parentMeta.fileCount = parentMeta.fileCount + 1;

    // await db.RC.updateOne({_id: immediateParentID}, {...parentMeta});
    // await db.RC.insertOne(parsedData);

    // return "success";
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