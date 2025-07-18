import { ReactNode } from "react";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getServerSession } from "next-auth";
import { AuthOption } from "../lib/auth";
import { FeedHeading } from "@/common/feed.heading";

interface FeedLayoutProps {
    children: ReactNode;
}

export default async function FeedLayout({ children }: FeedLayoutProps) {
    const notifications = [
        { id: 1, title: "Liked your blog" },
        { id: 2, title: "Liked your blog" },
    ];

    const session = await getServerSession(AuthOption);
    const userMail = session.user?.email;

    return (
        <div className=" w-full flex flex-col h-screen ">
            <FeedHeading />

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
