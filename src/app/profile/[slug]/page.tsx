import { getUserByEmail } from "@/app/lib/user";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import axios from "axios";

export default async function ProfilePage({ params }) {
    const param = await params;
    const email = decodeURIComponent(param.slug).slice(1);
    const result = await getUserByEmail(email);
    console.log(result);

    const { data } = await axios.get("http://localhost:3000/api/blogs");
    const blogs = [
        {
            id: 1,
            title: "why are we even",
            excerpt: "This is why are junior developers getting behind",
            url: "https://www.google.com",
        },
        {
            id: 2,
            title: "How to write repository pattern code in typescript",
            excerpt: "this is const hello w",
            url: "https://www.google.com",
        },
        {
            id: 3,
            title: "How to write repository pattern code in typescript",
            excerpt: "this is const hello w",
            url: "https://www.google.com",
        },
        {
            id: 4,
            title: "How to write repository pattern code in typescript",
            excerpt: "this is const hello w aslkdfjlaskjflkasjflkasfjlkasjdflk",
            url: "https://www.google.com",
        },
    ];
    console.log("data", data);
    return (
        <div className="max-w-6xl     ">
            <div>
                <h1 className="text-3xl">
                    {result?.firstName} {result?.lastName}
                </h1>
            </div>

            <div>
                <h1>your stories</h1>
                <div className="max-w-[900px] flex flex-col gap-6 mt-12">
                    {data.map((blog) => {
                        return (
                            <div className="p-6 flex flex-col gap-2 border border-gray-300">
                                <h4 className="font-bold">{blog.title}</h4>
                                <p className="truncate">{blog.content}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
