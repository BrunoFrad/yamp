'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCookies } from "@/lib/getCookies";
import { NavUser } from "./navbar-user";
import { Input } from "@/components/ui/input";
import { useNavbarContext } from "../context/NavbarContext";
import { useMusicPlaybackContext } from "../context/MusicPlaybackContext";

export default function Navbar() {
    const { musicQuery, setMusicQuery, setUsername } = useNavbarContext();
    const { pause } = useMusicPlaybackContext();
    const pathname = usePathname();
    const [cookies, setCookies] = useState();

    useEffect(() => {
        setMusicQuery("");
        getCookies().then((data) => {
            setCookies(data);
            if (data)
                setUsername(data.name)
        }).catch((error) => {
            console.error("Error setting cookies:", error);
        });

    }, [pathname, setMusicQuery, setUsername, setCookies]);

    return (
        <nav className="flex h-[8vh] items-center justify-between border-b-2">
            <section className="flex gap-10">
                <img src={"/vercel.svg"} width={30} className="ml-[5vw]" alt="Logo" />
                <ul className="flex space-x-4 gap-2">
                    {pathname === "/" ?
                        <li><span className="text-md text-neutral-100 font-medium cursor-default">Player</span></li> :
                        <li><Link href="/" className="text-md text-neutral-500 hover:text-neutral-100">Player</Link></li>
                    }
                    {
                        pathname === "/contribute" ?
                        <li><span className="text-md text-neutral-100 font-medium cursor-default">Contribute</span></li> :
                        <li><Link href="/contribute" className="text-md text-neutral-500 hover:text-neutral-100" onClick={() => pause()}>Contribute</Link></li>
                    }
                    <li>
                        <a href="https://github.com/BrunoFrad/yamp" target="_blank" rel="noopener noreferrer" className="text-md text-neutral-500 hover:text-neutral-100">
                            Github
                        </a>
                    </li>
                </ul>
            </section>
            {cookies &&
                <>
                    <Input
                        className="w-[35vw] mr-[16vw] text-center rounded-3xl py-[2vh]"
                        placeholder="Search your favorite music here"
                        value={musicQuery}
                        onChange={(e) => setMusicQuery(e.target.value)}
                    />
                    <NavUser user={cookies} />
                </>
            }
        </nav>
    );
}