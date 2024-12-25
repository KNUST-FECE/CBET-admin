"use client";

import { mainLinks } from "@/lib/constants";
import { LifeBuoy, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Header() {
    const pathname = usePathname();
    const getActive = (link: string) =>  link === "/" ? pathname === link : pathname.startsWith(link);
    
    return (
        <header>
            <div id="header-logo">
                <LifeBuoy id="the-logo" />
            </div>
            <nav>
                <ul>
                    {mainLinks.map(item => (
                        <li key={item.name}>
                            <Link href={item.link} data-active={getActive(item.link)}>
                                <div className="header-icon">
                                    <item.icon />
                                </div>
                                <p>{item.name}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <div id="header-logout">
                <button id="the-logout" onClick={() => console.log("logout")}>
                    <p>Logout</p>
                    <span>
                        <LogOut />
                    </span>
                </button>
            </div>
        </header>
    )
}