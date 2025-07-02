import { AuthOption } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export default async function RandomFeedPage() {
    const session = await getServerSession(AuthOption);
    console.log("this is session", session);
    if (!session) {
        return redirect("/login");
    }

    return (
        <div>
            <h2>Random Blogs</h2>
            {/* Display random blog posts here */}
        </div>
    );
}
