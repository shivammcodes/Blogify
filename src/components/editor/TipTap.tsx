"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import EditorToolbar from "./EditorToolbar";

interface TipTapProps {
  onChange: (content: string) => void;
}

const TipTap = ({ onChange }: TipTapProps) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Image,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
      Placeholder.configure({
        placeholder: "Start writing your amazing blog...",
      }),
      CharacterCount,
    ],
    content: "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

      <EditorToolbar editor={editor} />

      <EditorContent
        editor={editor}
        className="min-h-[400px] p-4 sm:min-h-[500px] sm:p-6"
      />

      <div className="flex justify-end border-t px-3 py-2 text-xs tracking-wide text-gray-500 sm:px-4 sm:text-sm">
        {editor.storage.characterCount.characters()}
        {" · "}
        {editor.storage.characterCount.words()} words
      </div>

    </div>
  );
};

export default TipTap;














// "use client";

// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Underline from "@tiptap/extension-underline";
// import Link from "@tiptap/extension-link";
// import Image from "@tiptap/extension-image";
// import TextAlign from "@tiptap/extension-text-align";
// import Highlight from "@tiptap/extension-highlight";
// import Placeholder from "@tiptap/extension-placeholder";
// import CharacterCount from "@tiptap/extension-character-count";

// import EditorToolbar from "./EditorToolbar";

// interface TipTapProps {
//   onChange: (content: string) => void;
// }

// const TipTap = ({ onChange }: TipTapProps) => {
//   const editor = useEditor({
//     immediatelyRender: false,

//     extensions: [
//       StarterKit,
//       Underline,

//       Link.configure({
//         openOnClick: false,
//       }),

//       Image,

//       TextAlign.configure({
//         types: ["heading", "paragraph"],
//       }),

//       Highlight,

//       Placeholder.configure({
//         placeholder: "Start writing your amazing blog...",
//       }),

//       CharacterCount,
//     ],

//     content: "",

//     onUpdate: ({ editor }) => {
//       onChange(editor.getHTML());
//     },
//   });

//   if (!editor) {
//     return null;
//   }

//   return (
//     <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
//       <EditorToolbar editor={editor} />

//       <EditorContent
//         editor={editor}
//         className="min-h-[500px] p-6"
//       />

//       <div className="flex justify-end border-t px-4 py-2 text-sm text-gray-500">
//         {editor.storage.characterCount.characters()} characters
//         {" · "}
//         {editor.storage.characterCount.words()} words
//       </div>
//     </div>
//   );
// };

// export default TipTap;