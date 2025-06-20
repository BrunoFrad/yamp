'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { NavUser } from "./navbar-user";
import { get } from "http";

export default function Navbar() {

    const pathname = usePathname();

    const [cookies, setCookies] = useState();

    async function getCookies() {
        try {
            const res = await axios.get("/api/cookies");
            setCookies(res.data.cookies);
        } catch (error) {
            console.log("Error fetching cookies:", error);
        }
    }

    useEffect(() => {
        getCookies();
    }, [pathname]);

    return(
        <nav className="flex h-20 items-center justify-between border-b-2">
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