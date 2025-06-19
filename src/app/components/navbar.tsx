import { Button } from "@/components/ui/button";

export default function Navbar() {
    return(
        <nav className="flex h-20 items-center justify-between border-b-2">
            <section className="flex gap-10">
                <img src={"vercel.svg"} width={"30vw"} className="ml-16" />
                <ul className="flex space-x-4 gap-2">
                    <li><a href="#" className="text-md text-neutral-100 font-medium hover:cursor-default">Home</a></li>
                    <li><a href="#" className="text-md text-neutral-500 hover:text-neutral-100">Player</a></li>
                    <li><a href="https://github.com/BrunoFrad/yamp" target="_blank" className="text-md text-neutral-500 hover:text-neutral-100">Github</a></li>
                </ul>
            </section>
            <section className="flex gap-4">
                <Button variant="default">Login</Button>
                <Button variant="outline" className="mr-16">Sign Up</Button>
            </section>
        </nav>
    );
}