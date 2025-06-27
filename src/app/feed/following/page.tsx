import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

export default function FollowingFeedPage() {
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
            excerpt: "this is const hello w",
            url: "https://www.google.com",
        },
    ];
    return (
        <div>
            <h2>Following Blogs</h2>
            {/* Display blogs from followed users here */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-12">
                {blogs.map((blog) => (
                    <Card className="rounded-xs flex flex-col">
                        <CardHeader>
                            <div className="max-w-[500px] p-0 m-0">
                                <img
                                    src={
                                        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
                                    }
                                    className="m-0 p-0 aspect-square"
                                    alt={"blog thumbnail"}
                                />
                            </div>
                            <span className="text-lg font-semibold">
                                {blog.title}
                            </span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm">{blog.excerpt}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
