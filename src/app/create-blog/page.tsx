// app/create-blog/page.jsx
"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // Added useSearchParams
import { BLogEditor } from "@/editor/editor";
import { HeadingEditor } from "@/editor/blog-heading.editor";
import { v4 as uuidv4 } from "uuid";
import { pool } from "@/persistence/mysql";
import { useSession } from "next-auth/react";

export default function CreateBlogPage() {
    const router = useRouter();
    const searchParams = useSearchParams(); // To get blogId from URL
    const initialBlogId = searchParams.get("blogId"); // Get ID if present in URL

    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [blogId, setBlogId] = useState<string | null>(initialBlogId); // Initialize with ID from URL
    const [saving, setSaving] = useState(false);
    const [initialLoadDone, setInitialLoadDone] = useState(false); // To manage initial data fetching/creation
    const [isEditing, setisEditing] = useState<boolean>(false);

    const { data: session, status } = useSession();

    // Debounce utility function
    const debounce = (func: (...args: any[]) => void, delay: number) => {
        let timeout: NodeJS.Timeout;
        return (...args: any[]) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), delay);
        };
    };

    const handleTitleChange = useCallback((newTitle: string) => {
        setTitle(newTitle);
    }, []);

    const handleContentChange = useCallback((newContent: string) => {
        console.log("new content", newContent);
        setContent(newContent);
        setisEditing(true);
    }, []);
    const CreateBlogDraft = async () => {
        console.log("Executing the blog creation page");

        try {
            const response = await fetch("/api/blogs", {
                body: JSON.stringify({
                    content: content,
                    title: title,
                }),
                method: "POST",
            });
            const data = await response.json();
            router.replace(`/p/${data.blogId}`);
            //router.push(`/p/${data.blogId}`);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (status === "loading") return;
        if (isEditing && !blogId && status === "authenticated") {
            console.log("creating blog draft satisfied the condition");
            CreateBlogDraft();
        } //}
    }, [blogId, status, router, isEditing]);

    return (
        <div className="min-h-[calc(100vh-6rem)] py-8 px-4 flex flex-col items-center">
            <div className="w-full max-w-4xl space-y-8">
                <HeadingEditor onHeadingContentChange={handleTitleChange} />

                <BLogEditor
                    initialContent={content}
                    onContentChange={handleContentChange}
                />

                <div className="mt-4 text-sm text-gray-500 text-center">
                    {saving ? "Saving draft..." : "All changes saved."}
                </div>
            </div>
        </div>
    );
}
