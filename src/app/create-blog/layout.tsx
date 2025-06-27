// components/layouts/CreateBlogLayout.jsx (or wherever you prefer to place it)
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/dark.mode.button";
import { UserIcon, Check, MoreVertical } from "lucide-react"; // Import more icons for a richer header
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // For user avatar
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    dropd,
} from "@/components/ui/dropdown-menu"; // For more options

export default function CreateBlogLayout({ children }) {
    // Dummy user data for demonstration
    const user = {
        name: "Magdum Pirjade",
        avatar: "https://github.com/shadcn.png", // Replace with actual user avatar URL
    };
    const blogStatus = "saved"; // Can be 'saving...', 'saved', 'error'
return ( <div className="w-full flex flex-col min-h-screen bg-background">
            {/* Header for Create Blog Page */}
            <header className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border py-3 px-4 sticky top-0 z-50">
                <div className="container mx-auto flex items-center justify-between h-14">
                    {/* Left Side: Logo and Draft Status */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="text-2xl font-bold text-primary hover:text-primary-foreground/90 transition-colors"
                        >
                            Writeup
                        </Link>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground ml-4">
                            <p className="hidden sm:inline-block">
                                Draft in {user.name}
                            </p>
                            <div className="flex items-center gap-1.5">
                                {blogStatus === "saved" && (
                                    <Check className="w-4 h-4 text-green-500" />
                                )}
                                {/* Add other status indicators if needed, e.g., for 'saving...' */}
                                <span className="font-medium capitalize">
                                    {blogStatus}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Actions (Publish, User Menu, Theme Toggle) */}
                    <div className="flex items-center gap-3 sm:gap-4">
                        <Button className="font-semibold px-6 py-2">
                            Publish
                        </Button>

                        {/* User Avatar Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="relative h-9 w-9 rounded-full"
                                >
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage
                                            src={user.avatar}
                                            alt={user.name}
                                        />
                                        <AvatarFallback>
                                            <UserIcon className="h-5 w-5" />
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-56"
                                align="end"
                                forceMount
                            >
                                <DropdownMenuItem className="px-4 py-2 text-sm font-semibold">
                                    {user.name}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/profile">Profile</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/settings">Settings</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Log out</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* More Options Dropdown (Optional, for editor specific actions) */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-9 w-9"
                                >
                                    <MoreVertical className="h-5 w-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-48" align="end">
                                <DropdownMenuItem>Save Draft</DropdownMenuItem>
                                <DropdownMenuItem>View Draft</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                    Delete Draft
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <ModeToggle />
                    </div>
                </div>
            </header>

            {/* Main Content Area for Editor */}
            <main className="flex-grow flex justify-center py-8 md:py-12 lg:py-16 px-4">
                <div className="w-full max-w-4xl">
                    {children}{" "}
                    {/* This is where your BLogEditor and HeadingEditor will render */}
                </div>
            </main>
        </div>
    );
}
