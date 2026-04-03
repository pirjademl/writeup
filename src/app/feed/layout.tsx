import { ReactNode } from "react";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getServerSession } from "next-auth";
import { AuthOption } from "../lib/auth";
import { FeedHeading } from "@/common/feed.heading";
import { redirect } from "next/navigation";

interface FeedLayoutProps {
    children: ReactNode;
}

export default async function FeedLayout({ children }: FeedLayoutProps) {
    const session = await getServerSession(AuthOption);
    if (!session) {
        redirect("/login");
    }
    // const userMail = session.user?.email;

    return (
        <div className=" w-full flex flex-col h-screen ">
            <FeedHeading
                email={session.user.email as string}
                image={session.user.image as string}
                name={session.user.name as string}
            />

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
