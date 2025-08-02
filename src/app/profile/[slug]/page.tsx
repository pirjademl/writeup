import { Blog } from "@/@types/blog";
import { getUserByEmail } from "@/app/lib/user";
import axios from "axios";
import { Key } from "react";
type ProfilePageParams = Promise<{ slug: string }>;

export default async function ProfilePage(props: {
    params: ProfilePageParams;
}) {
    const param = await props.params;
    const email = decodeURIComponent(param.slug).slice(1);
    const result = await getUserByEmail(email);
    console.log(result);

    const { data } = await axios.get("http://localhost:3000/api/blogs");

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
                    {data.map((blog: Blog) => {
                        return (
                            <div
                                key={blog.blogId as Key}
                                className="p-6 flex flex-col gap-2 border border-gray-300"
                            >
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
