"use server";

import { format, getDb } from "@/lib/utils";
import * as Types from "@/lib/types";

/**
 * Retrieves a member from the database by their email address.
 *
 * @param email - The email address of the member to retrieve.
 * @returns A promise that resolves to the member object formatted as an IMember instance.
 */
export async function getMemberByEmail(email: string){
    await using db = await getDb();
    const member = await db.M.findOne({email});

    return format.from<Types.IMember>(member!)
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
    const recentBlogs: Types.IBlog[] = [];

    await using db = await getDb();

    const cursor = db.B.find().sort({ createdAt: -1 }).limit(5);

    // Iterate over the cursor and format each blog
    for await (const blog of cursor) {
        const formattedBlog = format.from<Types.IBlog>(blog);
        recentBlogs.push(formattedBlog);
    }

    return recentBlogs;
}

export async function getRecentProducts() {
    const recentProducts: Types.IProduct[] = [];

    await using db = await getDb(); 

    const cursor = db.P.find().sort({ createdAt: -1 }).limit(5);    

    for await (const product of cursor) {
        const formattedProduct = format.from<Types.IProduct>(product);
        recentProducts.push(formattedProduct);
    }

    return recentProducts;
}

export async function getResources() {
    const resources: Types.IResource[] = [];

    await using db = await getDb();

    const cursor = db.RC.find();

    for await (const resource of cursor) {
        const formattedResource = format.from<Types.IResource>(resource);
        resources.push(formattedResource);
    }

    return resources;
}

export async function getBlogs() {
    const blogs: Types.IBlog[] = [];

    await using db = await getDb();

    const cursor = db.B.find();

    for await (const resource of cursor) {
        const formattedBlog = format.from<Types.IBlog>(resource);
        blogs.push(formattedBlog);
    }

    return blogs;
}

export async function getUsers() {
    const users: Types.IUser[] = [];

    await using db = await getDb();

    const cursor = db.U.find();

    for await (const user of cursor) {
        const formattedUser = format.from<Types.IUser>(user);
        users.push(formattedUser);
    }

    return users;
}

export async function getMembers() {
    const members: Types.IMember[] = [];

    await using db = await getDb();

    const cursor = db.M.find();

    for await (const member of cursor) {
        const formattedMember = format.from<Types.IMember>(member);
        members.push(formattedMember);
    }

    return members;
}

export async function getShops() {
    const shops: Types.IShop[] = [];

    await using db = await getDb();

    const cursor = db.S.find();

    for await (const shop of cursor) {
        const formattedShop = format.from<Types.IShop>(shop);
        shops.push(formattedShop);
    }

    return shops;
}

export async function getProducts() {
    const products: Types.IProduct[] = [];

    await using db = await getDb();

    const cursor = db.P.find();

    for await (const product of cursor) {
        const formattedProduct = format.from<Types.IProduct>(product);
        products.push(formattedProduct);
    }

    return products;
}

export async function getReports() {
    const reports: Types.IReport[] = [];

    await using db = await getDb();

    const cursor = db.RT.find();

    for await (const report of cursor) {
        const formattedReport = format.from<Types.IReport>(report);
        reports.push(formattedReport);
    }

    return reports;
}

export async function getRoles() {
    const roles: Types.IRole[] = [];

    await using db = await getDb();

    const cursor = db.RO.find();

    for await (const role of cursor) {
        const formattedRole = format.from<Types.IRole>(role);
        roles.push(formattedRole);
    }

    return roles;
}