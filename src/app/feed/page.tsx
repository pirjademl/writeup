import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { AuthOption } from "../lib/auth";
import { getServerSession } from "next-auth";

export default async function FeedPage() {
    const session = await getServerSession(AuthOption);
    console.log("this is session", session);
    if (!session) {
        return redirect("/login");
    }

    return redirect("/feed/following");
}
