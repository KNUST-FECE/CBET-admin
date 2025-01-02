"use client";

import { marketLinks } from "@/lib/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navigation() {
    const pathname = usePathname();

    return (
        <section id="header-section">
            <h1>Market</h1>
            <nav>
                <ul>
                    {marketLinks.map( item => (
                        <li key={item.name}>
                            <Link 
                                href={item.link} 
                                data-active={pathname.startsWith(item.link)}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </section>
    )
}