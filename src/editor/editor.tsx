// editor/editor.jsx
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Blockquote from "@tiptap/extension-blockquote";
import Underline from "@tiptap/extension-underline";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { Placeholder } from "@tiptap/extensions";
import { common as lowlightCommon, createLowlight, all } from "lowlight";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import css from "highlight.js/lib/languages/css";
import html from "highlight.js/lib/languages/xml";
import { LineHeight } from "@tiptap/extension-text-style";
import {
    BoldIcon,
    ItalicIcon,
    MessageSquareQuoteIcon,
    UnderlineIcon,
    Heading1Icon,
    Heading2Icon,
    Heading3Icon,
    ListIcon,
    ListOrderedIcon,
    Code2Icon,
    MinusIcon,
    PilcrowIcon,
    ArrowDownNarrowWideIcon,
    CircleChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils"; // <-- This is crucial for joining classes safely
import { useEffect, useCallback, useState } from "react";
import { HeadingEditor } from "./blog-heading.editor";
import {
    DropdownMenu,
    DropdownMenuArrow,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import {
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const lowlight = createLowlight(all);

const MenuBar = ({ editor }) => {
    if (!editor) {
        alert("edutoir is null return ");
        return null;
    }
    const [currentLineHeight, setCurrentLineHeight] = useState<string>("1.0");
    const handleLineHeight = (e) => {
        alert("Hello world");
    };

    return (
        <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-md border bg-card text-card-foreground shadow-sm mb-4 sticky top-[3.75rem] z-40">
            <Toggle
                size="sm"
                onPressedChange={() =>
                    editor.chain().focus().toggleBold().run()
                }
                disabled={!editor.can().chain().focus().toggleBold().run()}
                pressed={editor.isActive("bold")}
                aria-label="Toggle bold"
            >
                <BoldIcon className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                onPressedChange={() =>
                    editor.chain().focus().toggleItalic().run()
                }
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                pressed={editor.isActive("italic")}
                aria-label="Toggle italic"
            >
                <ItalicIcon className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                onPressedChange={() =>
                    editor.chain().focus().toggleUnderline().run()
                }
                pressed={editor.isActive("underline")}
                aria-label="Toggle underline"
            >
                <UnderlineIcon className="h-4 w-4" />
            </Toggle>

            <Separator orientation="vertical" className="h-6 mx-1 bg-border" />

            <Toggle
                size="sm"
                onPressedChange={() =>
                    editor.chain().focus().setParagraph().run()
                }
                pressed={editor.isActive("paragraph")}
                aria-label="Set paragraph"
            >
                <PilcrowIcon className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                onPressedChange={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                pressed={editor.isActive("heading", { level: 1 })}
                aria-label="Toggle H1"
            >
                <Heading1Icon className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                onPressedChange={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                pressed={editor.isActive("heading", { level: 2 })}
                aria-label="Toggle H2"
            >
                <Heading2Icon className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                onPressedChange={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                pressed={editor.isActive("heading", { level: 3 })}
                aria-label="Toggle H3"
            >
                <Heading3Icon className="h-4 w-4" />
            </Toggle>

            <Separator orientation="vertical" className="h-6 mx-1 bg-border" />

            <Toggle
                size="sm"
                onPressedChange={() =>
                    editor.chain().focus().toggleBulletList().run()
                }
                pressed={editor.isActive("bulletList")}
                aria-label="Toggle bullet list"
            >
                <ListIcon className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                onPressedChange={() =>
                    editor.chain().focus().toggleOrderedList().run()
                }
                pressed={editor.isActive("orderedList")}
                aria-label="Toggle ordered list"
            >
                <ListOrderedIcon className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                onPressedChange={() =>
                    editor.chain().focus().toggleBlockquote().run()
                }
                disabled={
                    !editor.can().chain().focus().toggleBlockquote().run()
                }
                pressed={editor.isActive("blockquote")}
                aria-label="Toggle blockquote"
            >
                <MessageSquareQuoteIcon className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                onPressedChange={() =>
                    editor.chain().focus().toggleCodeBlock().run()
                }
                pressed={editor.isActive("codeBlock")}
                aria-label="Toggle code block"
            >
                <Code2Icon className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                onPressedChange={() =>
                    editor.chain().focus().setHorizontalRule().run()
                }
                aria-label="Insert horizontal rule"
            >
                <MinusIcon className="h-4 w-4" />
            </Toggle>

            <div>
                <Select onValueChange={handleLineHeight} className="w-[300px]">
                    <SelectTrigger>{1.0}</SelectTrigger>
                    <SelectContent>
                        <SelectItem value="2">{2.0}</SelectItem>
                        <SelectItem value="3.0">{3.0}</SelectItem>
                        <SelectItem value="4.0">{4.0}</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export const BLogEditor = ({ initialContent = "" }) => {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit,
            LineHeight,
            CodeBlockLowlight.configure({
                lowlight,
            }),
            Placeholder.configure({
                placeholder: "Start writing your amazing story...",
                emptyNodeClass:
                    "first:before:text-gray-400 first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none first:before:text-3xl  first:before:text-center",
            }),
        ],
        editorProps: {
            attributes: {
                // Use cn utility to safely join Tailwind classes
                class: cn(
                    "prose dark:prose-invert",
                    "max-w-none w-full",
                    "focus:outline-none",
                    "min-h-[500px] md:min-h-[700px] lg:min-h-[800px]",
                    "py-8 text-xl",
                ),
            },
        },
        content: initialContent || localStorage.getItem("editorContent") || "",
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            localStorage.setItem("editorContent", html);
        },
        onCreate: ({ editor }) => {
            // No specific action here, content is loaded by `content` prop/localStorage
        },
    });

    useEffect(() => {
        return () => {
            if (editor) {
                editor.destroy();
            }
        };
    }, [editor]);

    return (
        <div className="w-full">
            {editor && <MenuBar editor={editor} />}
            <HeadingEditor />

            <EditorContent editor={editor} className="mt-0" />
        </div>
    );
};
