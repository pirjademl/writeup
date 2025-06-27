import { ReactNode } from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BellIcon, CircleAlert, SquarePenIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

interface FeedLayoutProps {
    children: ReactNode;
}

export default function FeedLayout({ children }: FeedLayoutProps) {
    const notifications = [
        { id: 1, title: "Liked your blog" },
        { id: 2, title: "Liked your blog" },
    ];

    return (
        <div className=" w-full flex flex-col h-screen ">
            <header className="w-full  shadow-sm py-4  px-4 sticky top-0 z-50 items-center  ">
                {" "}
                <div className="  flex items-center justify-between ">
                    <Link
                        href="/"
                        className="text-2xl font-bold text-blue-600 hover:text-blue-700"
                    >
                        Writeup
                    </Link>

                    <div className="flex items-center gap-6">
                        <div>
                            <form>
                                <Button
                                    variant={"secondary"}
                                    className="flex items-center gap-2"
                                >
                                    <SquarePenIcon size={15} />
                                    <p className="text-sm ">Write blog</p>
                                </Button>
                            </form>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Button variant={"outline"}>
                                    <BellIcon size={15} />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="border  py-4 px-4 flex flex-col gap-4">
                                {notifications.map((notification) => (
                                    <DropdownMenuItem
                                        key={notification.id}
                                        className="text-xs flex  items-center justify-between  py-2 px-2  "
                                    >
                                        <div className="flex  items-center gap-2">
                                            <CircleAlert size={15} />
                                            <div>{notification.title}</div>
                                        </div>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <div className="mr-4">
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Button variant={"link"}>
                                        <UserIcon size={25} />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="border  py-4 px-4 flex flex-col gap-4 text-xs min-w-[200px] items-center justify-center ">
                                    <DropdownMenuItem className="w-full p-2 text-sm font-normal">
                                        Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="w-full p-2 text-sm font-normal">
                                        library
                                    </DropdownMenuItem>

                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="w-full p-2 text-sm font-normal">
                                        list
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto flex items-center justify-between">
                <Tabs defaultValue="random">
                    <TabsList>
                        <TabsTrigger value="random" asChild>
                            <Link href="/feed/recommended">recommended</Link>
                        </TabsTrigger>
                        <TabsTrigger value="following" asChild>
                            <Link href="/feed/following">Following</Link>
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
                {/* You can add your Profile dropdown here, assuming it's already implemented */}
            </div>

            <main className="flex-1 overflow-y-auto p-4">
                <div className="container mx-auto">{children}</div>
            </main>
        </div>
    );
}
