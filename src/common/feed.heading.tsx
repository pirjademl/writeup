import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { SquarePenIcon, BellIcon, UserIcon, CircleAlert } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const notifications = [
    { id: 1, title: "Liked your blog" },
    { id: 2, title: "Liked your blog" },
];
interface IFeedHeading {
    name?: string;
    image?: string;
    email?: string;
}

export const FeedHeading = async ({ name, image, email }: IFeedHeading) => {
    return (
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
                        <Link href="/create-blog" passHref>
                            <Button
                                variant={"secondary"}
                                className="flex items-center gap-2"
                            >
                                <SquarePenIcon size={15} />
                                write blog
                            </Button>
                        </Link>
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
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="relative h-9 w-9 rounded-full"
                                >
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src={image} alt={name} />
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
                                    {name}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href={`/profile/${email}`}>
                                        Profile
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/settings">Settings</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Log out</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </header>
    );
};
