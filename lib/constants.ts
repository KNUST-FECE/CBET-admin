import * as routes from "./routes";
import { Crown, Database, Fingerprint, LayoutGrid, Newspaper, Settings, ShoppingBag, ShoppingBasket, SquareChartGantt, Store, Users } from "lucide-react";
import { IBlog, IProduct } from "./types";

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

export const departments = ["computer", "biomedical", "electrical", "telecom"];

export const SORT_PREFERENCE = ["accending", "decending"];
export const RESOURCES_TYPE = ["folder", "file"];
export const RESOURECS_FILE_TYPE = ["docx","pdf","txt","ppt","png","jpg","mp4"];
export const RESOURCES_STATUS = ["active","hidden"];
export const RESOURCES_SORT_KEYS = ["name","file type","size","status","created at","updated at"]