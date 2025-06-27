"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/dark.mode.button";

function Header() {
    return (
        <header className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm border-b border-border py-3 px-4 sticky top-0 z-[100]">
            <div className="container mx-auto flex items-center justify-between h-14">
                {/* Logo */}
                <Link
                    href="/"
                    className="text-2xl font-bold text-primary hover:text-primary-foreground/90 transition-colors"
                >
                    Writeup
                </Link>

                <nav className="flex items-center gap-2 sm:gap-4">
                    <Button variant="ghost" asChild className="hidden md:flex">
                        <Link href="/feed">Feed</Link>
                    </Button>
                    <Button variant="ghost" asChild className="hidden md:flex">
                        <Link href="/create-blog">Write Blog</Link>
                    </Button>

                    <Button variant="ghost" asChild className="hidden sm:flex">
                        <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild className="hidden sm:flex">
                        <Link href="/signup">Sign Up</Link>
                    </Button>

                    <ModeToggle />

                    <Button variant="ghost" className="sm:hidden">
                        Menu
                    </Button>
                </nav>
            </div>
        </header>
    );
}
export { Header };
