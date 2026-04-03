import { Blog } from "@/@types/blog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import axios from "axios";
import Image from "next/image";
import { Key } from "react";

export default async function FollowingFeedPage() {
    const { data } = await axios.get("http://localhost:3000/api/blogs/");
    return (
        <div>
            <h2>Following Blogs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-12">
                {data.map((blog: Blog) => (
                    <Card
                        className="rounded-xs flex flex-col "
                        key={blog.blogId as Key}
                    >
                        <CardHeader>
                            <div className="max-w-[500px] p-0 m-0">
                                <Image
                                    src={
                                        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
                                    }
                                    width={1000}
                                    height={50}
                                    className="m-0 p-0 aspect-video"
                                    alt={"blog thumbnail"}
                                />
                            </div>
                            <span className="text-lg font-semibold">
                                {blog.title}
                            </span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm">{blog.content}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
