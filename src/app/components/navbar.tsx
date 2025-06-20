'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCookies } from "@/lib/getCookies";
import { NavUser } from "./navbar-user";

export default function Navbar() {

    const pathname = usePathname();

    const [cookies, setCookies] = useState();

    
    useEffect(() => {
        getCookies().then((data) => {
            try {
                setCookies(data);
            } catch (error) {
                console.error("Error setting cookies:", error);
            }
        });
    }, [pathname]);

    return(
        <nav className="flex h-[10vh] items-center justify-between border-b-2">
            <section className="flex gap-10">
                <img src={"vercel.svg"} width={"30vw"} className="ml-16" />
                <ul className="flex space-x-4 gap-2">
                    {pathname == "/" ? 
                        <li><Link href="#" className="text-md text-neutral-100 font-medium hover:cursor-default">Player</Link></li> :
                        <li><Link href="/" className="text-md text-neutral-500 hover:text-neutral-100">Player</Link></li>
                    }
                    <li><a href="https://github.com/BrunoFrad/yamp" target="_blank" className="text-md text-neutral-500 hover:text-neutral-100">Github</a></li>
                </ul>
            </section>
            {
                cookies && <NavUser user={cookies} />
            }
        </nav>
    );
}