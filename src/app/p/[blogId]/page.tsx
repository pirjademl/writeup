"use client";
import { useCallback, useEffect, useState } from "react";

import { BLogEditor } from "@/editor/editor";
import { HeadingEditor } from "@/editor/blog-heading.editor";
import { useParams, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/app/lib/debounce";
import axios from "axios";

export default function EditBlogPage() {
    //const params = useSearchParams();
    //console.log("params", params);
    //const blogId = params.get("blogId");
    //
    const { blogId } = useParams();
    console.log("client blog id ", blogId);
    const [content, setContent] = useState<string>("");
    const debounceSave = useCallback(
        useDebounce(async (newTitle: string, newcontent: string) => {
            if (!blogId) return;
            try {
                await fetch(`http://localhost:3000/api/blogs/${blogId}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title: newTitle,
                        content: newcontent,
                    }),
                });
            } catch (err) {}
        }, 5000),
        [blogId],
    );

    const [title, setTitle] = useState<string>("");
    const handleContentChange = useCallback(
        (newContent: string) => {
            setContent(newContent);
            debounceSave(title, newContent);
        },
        [title, debounceSave],
    );

    const handleHeadingChange = useCallback(
        (newTitle: string) => {
            setTitle(newTitle);
            debounceSave(newTitle, content);
        },
        [content, debounceSave],
    );

    const handlePublish = async () => {
        const result = await fetch("", {
            body: JSON.stringify({ title }),
            method: "PATCH",
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(
                    `http://localhost:3000/api/blog/${blogId}`,
                );
                console.log("result", result.data);
                setTitle(result.data.title);
                setContent(result.data.content);
            } catch (err) {
                console.error("err", err);
            }
        };
        fetchData();
    }, [blogId, title, content]);

    return (
        <div className="min-h-[calc(100vh-6rem)] py-8 px-4 flex flex-col items-center ">
            <div className="sticky   w-full justify-end flex">
                {" "}
                <Button className="flex w- min-w-content border align-end">
                    Publish Blog
                </Button>
            </div>
            <div className="w-full max-w-4xl space-y-8">
                <HeadingEditor
                    intialHeaading={title}
                    onHeadingContentChange={handleHeadingChange}
                />
                <BLogEditor
                    initialContent={content}
                    onContentChange={handleContentChange}
                />
            </div>
        </div>
    );
}
