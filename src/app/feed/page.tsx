import { redirect } from "next/navigation";

export default async function FeedPage() {
    return redirect("/feed/following");
}
