"use server";

import { format, getDb } from "@/lib/utils";
import { IBlog, IMember, IProduct } from "@/lib/types";

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

export async function getRecentBlogs() {
    const recentBlogs: IBlog[] = [];

    await using db = await getDb();

    const cursor = db.B.find().sort({ createdAt: -1 }).limit(5);

    // Iterate over the cursor and format each blog
    for await (const blog of cursor) {
        const formattedBlog = format.from<IBlog>(blog);
        recentBlogs.push(formattedBlog);
    }

    return recentBlogs;
}

export async function getRecentProducts() {
    const recentProducts: IProduct[] = [];

    await using db = await getDb(); 

    const cursor = db.P.find().sort({ createdAt: -1 }).limit(5);    

    for await (const product of cursor) {
        const formattedProduct = format.from<IProduct>(product);
        recentProducts.push(formattedProduct);
    }

    return recentProducts;
}