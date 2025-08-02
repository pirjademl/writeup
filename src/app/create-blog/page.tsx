"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BLogEditor } from "@/editor/editor";
import { HeadingEditor } from "@/editor/blog-heading.editor";
import { useSession } from "next-auth/react";

export default function CreateBlogPage() {
    const router = useRouter();

    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [isEditing, setisEditing] = useState<boolean>(false);

    ///const { data: session, status } = useSession();
    const { status } = useSession();

    //const debounce = (func: (...args: any[]) => void, delay: number) => {
    //   let timeout: NodeJS.Timeout;
    //  return (...args: any[]) => {
    //     clearTimeout(timeout);
    //    timeout = setTimeout(() => func(...args), delay);
    //        };
    //   };

    const handleTitleChange = useCallback((newTitle: string) => {
        setTitle(newTitle);
    }, []);

    const handleContentChange = useCallback((newContent: string) => {
        console.log("new content", newContent);
        setContent(newContent);
        setisEditing(true);
    }, []);
    const CreateBlogDraft = useCallback(async () => {
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
        } catch (err) {
            console.error(err);
        }
    }, [content, router, title]);

    useEffect(() => {
        if (status === "loading") return;
        if (isEditing && status === "authenticated") {
            console.log("creating blog draft satisfied the condition");
            CreateBlogDraft();
        } //}
    }, [status, router, isEditing, CreateBlogDraft]);

    return (
        <div className="min-h-[calc(100vh-6rem)] py-8 px-4 flex flex-col items-center">
            <div className="w-full max-w-4xl space-y-8">
                <HeadingEditor
                    intialHeaading=""
                    onHeadingContentChange={handleTitleChange}
                />

                <BLogEditor
                    initialContent={content}
                    onContentChange={handleContentChange}
                />
            </div>
        </div>
    );
}
