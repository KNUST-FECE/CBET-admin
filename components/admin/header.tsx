"use client";

import { mainLinks } from "@/lib/constants";
import { _products } from "@/lib/routes";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/public/logo.png";


export default function Header() {
    const pathname = usePathname();
    const getActive = (link: string) =>  link === "/" ? pathname === link : pathname.startsWith(link);
    
    return (
        <header>
            <div id="header-logo">
                <Image src={logo} alt="logo" width={60} height={60} id="the-logo" priority={true} />
            </div>
            <nav>
                <ul>
                    {mainLinks.map(item => (
                        <li key={item.name}>
                            <Link 
                                href={item.name === "market" ? _products : item.link} 
                                data-active={getActive(item.link)}
                            >
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
                <button id="the-logout" onClick={() => signOut({redirectTo: "/login"})}>
                    <p>Logout</p>
                    <span>
                        <LogOut />
                    </span>
                </button>
            </div>
        </header>
    )
}