'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {

    const router = useRouter();
    const pathname = usePathname();

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
            <section className="flex gap-4">
                <Button variant="default" onClick={() => router.push("/login")}>Login</Button>
                <Button variant="outline" className="mr-16" onClick={() => router.push("/signup")} >Sign Up</Button>
            </section>
        </nav>
    );
}