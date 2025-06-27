// app/create-blog/[blogId]/page.jsx (or whatever your page path is)
"use client";

import { HeadingEditor } from "@/editor/blog-heading.editor"; // Assuming this is for title/subtitle
import { BLogEditor } from "@/editor/editor"; // Your main rich text editor
import { useParams } from "next/navigation";

export default function CreateBlogPage() {
    // Renamed to avoid confusion with layout component
    const { blogId } = useParams();
    console.log("Editing blog:", blogId);

    return (
        <div className="min-h-[calc(100vh-6rem)] py-8 px-4 flex flex-col items-center">
            <div className="w-full max-w-4xl space-y-8">
                <BLogEditor />
            </div>
        </div>
    );
}
