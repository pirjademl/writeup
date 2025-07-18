"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { HeadingEditor } from "@/editor/blog-heading.editor";
import { BLogEditor } from "@/editor/editor";

//interface SaveDraftParams {
//   title: string;
//  content: string;
//}

export default function CreateBlogPage() {
    const router = useRouter();
    const [content, setContent] = useState<string>("");
    const [headingContent, setHeadingContent] = useState<string>("");

    const handleContentChnage = useCallback((content: string) => {
        console.log("handle main content  ", content);
        setContent(content!);
    }, []);

    const handleheadingContentChange = useCallback((heading: string) => {
        router.replace(`/p/${123123123}`);
        console.log("heandle  heading content", heading);
        setHeadingContent(heading!);
    }, []);

    return (
        <div className="min-h-[calc(100vh-6rem)] py-8 px-4 flex flex-col items-center">
            <div className="w-full max-w-4xl space-y-8">
                <HeadingEditor
                    intialHeaading={headingContent}
                    onHeadingContentChange={handleheadingContentChange}
                />

                <BLogEditor
                    initialContent={content}
                    onContentChange={handleContentChnage}
                />
                <div className="mt-4 text-sm text-gray-500 text-center">
                    {"Draft saved"}
                </div>
            </div>
        </div>
    );
}
