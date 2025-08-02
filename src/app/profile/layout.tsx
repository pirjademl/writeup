import { FeedHeading } from "@/common/feed.heading";
import { Tabs, TabsTrigger, TabsList } from "@/components/ui/tabs";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { AuthOption } from "../lib/auth";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
type ProfileProps = {
    children: ReactNode;
};
export default async function ProfileLayout({ children }: ProfileProps) {
    const session = await getServerSession(AuthOption);
    if (!session) {
        redirect("/login");
    }

    const userMail = session.user?.email;

    return (
        <main className="w-full  border border-red-500 ">
            <FeedHeading />
            <div className="flex  ">
                <div className="max-w-6xl mx-auto mt-[80px] ">
                    <h1 className="text-3xl">{session.user?.name}</h1>
                    <div className="">
                        <Tabs defaultValue="random" className="">
                            <TabsList className="">
                                <TabsTrigger
                                    defaultChecked
                                    value="random"
                                    asChild
                                >
                                    <Link href={`/profile/${userMail}/`}>
                                        Home
                                    </Link>
                                </TabsTrigger>
                                <TabsTrigger value="list" asChild>
                                    <Link href={`/profile/${userMail}/list`}>
                                        List
                                    </Link>
                                </TabsTrigger>

                                <TabsTrigger value="about" asChild>
                                    <Link href={`/profile/${userMail}/about`}>
                                        About
                                    </Link>
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                    {children}
                </div>
                <div className=" hidden lg:block border border-red-500 min-w-[400px]">
                    <div className="min-h-[100vh]">{session.user.name}</div>
                </div>
            </div>
        </main>
    );
}
