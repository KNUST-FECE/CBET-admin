import { formatFileSize } from "@edgestore/react/utils";
import * as routes from "./routes";
import { Crown, Database, Fingerprint, LayoutGrid, Newspaper, Settings, ShoppingBag, ShoppingBasket, SquareChartGantt, Store, Users } from "lucide-react";

export const mainLinks = [
    { 
        name: "home",
        link: routes._home,
        icon: LayoutGrid
    },
    { 
        name: "resources",
        link: routes._resources,
        icon: Database
    },
    { 
        name: "blogs",
        link: routes._blogs,
        icon: Newspaper
    },
    { 
        name: "market",
        link: routes._market,
        icon: Store
    },
    { 
        name: "users",
        link: routes._users,
        icon: Users
    },
    { 
        name: "members",
        link: routes._members,
        icon: Crown
    },
    { 
        name: "reports",
        link: routes._reports,
        icon: SquareChartGantt
    },
    { 
        name: "roles",
        link: routes._roles,
        icon: Fingerprint
    },
    { 
        name: "settings",
        link: routes._settings,
        icon: Settings
    },
];

export const marketLinks = [
    {
        name: "shops",
        link: routes._shops,
        icon: ShoppingBag
    },
    {
        name: "products",
        link: routes._products,
        icon: ShoppingBasket
    },
]

export const ERROR_MESSAGES = {
    fileTooLarge(maxSize: number) {
        return `The file is too large. Max size is ${formatFileSize(maxSize)}.`;
    },
    fileInvalidType() {
        return 'Invalid file type.';
    },
    tooManyFiles(maxFiles: number) {
        return `You can only add ${maxFiles} file(s).`;
    },
    fileNotSupported() {
        return 'The file is not supported.';
    },
};

export const departments = ["computer", "biomedical", "electrical", "telecom"];

export const SORT_PREFERENCE = ["accending", "decending"];

export const RESOURCES_TYPE = ["folder", "file"];
export const RESOURECS_FILE_TYPE = ["docx","pdf","txt","ppt","png","jpg","mp4"];
export const RESOURCES_STATUS = ["active","hidden"];
export const RESOURCES_SORT_KEYS = ["name","file type","status","created at","updated at"]

export const MEMBERS_ROLE = ["admin", "edittor", "resource manager", "products manager", "user manager"];
export const MEMBERS_STATUS = ["active", "suspended"];
export const MEMBERS_SORT_KEYS = ["name", "email", "role", "status", "created at", "updated at"];

export const USERS_DEPARTMENT = ["computer", "biomedical", "electrical", "telecom"];
export const USERS_LEVEL = ["l100", "l200", "l300", "l400"];
export const USERS_SORT_KEYS = ["name", "student no", "indexc no", "department", "level", "created at", "updated at"];

export const BLOGS_CATEGORY = [];
export const BLOGS_STATUS = ["published", "draft", "archived"];
export const BLOGS_SORT_KEYS = ["name", "category", "likes", "status", "created at", "updated at"];

export const PRODUCTS_CATEGORY = [];
export const PRODUCTS_STATUS = ["published", "draft", "archived"]; 
export const PRODUCTS_APPROVAL = ["pending", "approved", "denied"];
export const PRODUCTS_SORT_KEY = ["name", "price", "stock", "status", "approval", "category", "created at", "updated at"];

export const SHOPS_SORT_KEYS = ["name", "email", "product count", "created at", "updated at"]; 

export const REPORTS_CATEGORY = [];
export const REPORTS_TYPE = [];
export const REPORTS_STATUS = ["pending", "serviced", "archived"];
export const REPORTS_SORT_KEYS = ["user", "summary", "category", "type", "status", "created at", "updated at"];