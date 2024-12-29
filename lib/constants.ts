import * as routes from "./routes";
import { Crown, Database, Fingerprint, LayoutGrid, Newspaper, Settings, SquareChartGantt, Store, Users } from "lucide-react";
import { IBlog, IProduct } from "./types";

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
        link: routes._products,
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
];

export const departments = ["computer", "biomedical", "electrical", "telecom"];

export const demoBlogs:IBlog[] = [
    {
        id: "89789777665365765",
        name: "[ ReactJS version 15 ] : A framework for the web or a public nuissance",
        createdAt: "10 days ago",
        updatedAt: "10 days ago",
        authorID: "Delali Tengue", //the author id
        category: "Framework",
        tags: ["react", "coding", "infomix", "tutorial"],
        likes: 30,
        coverUrl: "",
        content: ""
    },
    {
        id: "89789777665365765",
        name: "[ ReactJS version 15 ] : A framework for the web or a public nuissance",
        createdAt: "10 days ago",
        updatedAt: "10 days ago",
        authorID: "Delali Tengue", //the author id
        category: "Framework",
        tags: ["react", "coding", "infomix", "tutorial"],
        likes: 30,
        coverUrl: "",
        content: ""
    },
    {
        id: "89789777665365765",
        name: "[ ReactJS version 15 ] : A framework for the web or a public nuissance",
        createdAt: "10 days ago",
        updatedAt: "10 days ago",
        authorID: "Delali Tengue", //the author id
        category: "Framework",
        tags: ["react", "coding", "infomix", "tutorial"],
        likes: 30,
        coverUrl: "",
        content: ""
    },
    {
        id: "89789777665365765",
        name: "[ ReactJS version 15 ] : A framework for the web or a public nuissance",
        createdAt: "10 days ago",
        updatedAt: "10 days ago",
        authorID: "Delali Tengue", //the author id
        category: "Framework",
        tags: ["react", "coding", "infomix", "tutorial"],
        likes: 30,
        coverUrl: "",
        content: ""
    },
]

export const demoProducts:IProduct[] = [
    {
        id: "94878634656",
        name: "Electro-Magnetic Lecture Slides",
        price: 25.09,
        discount: 0,
        description: "",
        category: "Lecture Materials",
        inStock: 100,
        tags: ["lecture", "electrical", "notes"],
        images: [],
        shopID: "Kwesi Benku Books",
        likes: 20,
        published: true,
        approved: false,
        deniedMessage: "",
        updatedAt: "2 weeks ago",
        createdAt: "2 weeks ago"
    },
    {
        id: "94878634656",
        name: "Electro-Magnetic Lecture Slides",
        price: 25.09,
        discount: 0,
        description: "",
        category: "Lecture Materials",
        inStock: 100,
        tags: ["lecture", "electrical", "notes"],
        images: [],
        shopID: "Kwesi Benku Books",
        likes: 20,
        published: true,
        approved: false,
        deniedMessage: "",
        updatedAt: "2 weeks ago",
        createdAt: "2 weeks ago"
    },
    {
        id: "94878634656",
        name: "Electro-Magnetic Lecture Slides",
        price: 25.09,
        discount: 0,
        description: "",
        category: "Lecture Materials",
        inStock: 100,
        tags: ["lecture", "electrical", "notes"],
        images: [],
        shopID: "Kwesi Benku Books",
        likes: 20,
        published: true,
        approved: false,
        deniedMessage: "",
        updatedAt: "2 weeks ago",
        createdAt: "2 weeks ago"
    },
]