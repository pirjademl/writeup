//"use client";
//import { useEditor, EditorContent } from "@tiptap/react";
//import StarterKit from "@tiptap/starter-kit";
//import { useEffect } from "react";
//import { CharacterCount, Placeholder } from "@tiptap/extensions";
//export const HeadingEditor = ({ placeholder }: string) => {
//   const editor = useEditor({
//      extensions: [
//         Placeholder.configure({
//            placeholder: "Enter title of the blog",
//       }),
//  ],
// immediatelyRender: false,
//enableContentCheck: true,

//content: ``,
//});

//return (
//    <div className="border border-green-400 placeholder:text-red-500 placeholder:font-semibold">
//       <EditorContent editor={editor} content="<h1>Hello world</h1>" />
//  </div>
//);
//};

import { CharacterCount, Placeholder } from "@tiptap/extensions";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

export const HeadingEditor = () => {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: "Enter the title of the blog",
                emptyEditorClass:
                    "first:before:text-gray-400 first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none first:before:text-3xl  first:before:text-center",
            }),
            CharacterCount.configure({
                limit: 40,
            }),
        ],
        editorProps: {
            attributes: {
                class: "p-4 text-3xl font-semibold",
            },
        },
    });

    return (
        <div>
            <EditorContent editor={editor} />
        </div>
    );
};
