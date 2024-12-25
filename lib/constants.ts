import * as routes from "./routes";
import { Crown, Database, Fingerprint, LayoutGrid, Newspaper, Settings, SquareChartGantt, Store, Users } from "lucide-react";

export const mainLinks = [
    { 
        name: "Home",
        link: routes._home,
        icon: LayoutGrid
    },
    { 
        name: "Resources",
        link: routes._resources,
        icon: Database
    },
    { 
        name: "Blogs",
        link: routes._blogs,
        icon: Newspaper
    },
    { 
        name: "Market",
        link: routes._market,
        icon: Store
    },
    { 
        name: "Users",
        link: routes._users,
        icon: Users
    },
    { 
        name: "Members",
        link: routes._members,
        icon: Crown
    },
    { 
        name: "Reports",
        link: routes._reports,
        icon: SquareChartGantt
    },
    { 
        name: "Roles",
        link: routes._roles,
        icon: Fingerprint
    },
    { 
        name: "Settings",
        link: routes._settings,
        icon: Settings
    },
]