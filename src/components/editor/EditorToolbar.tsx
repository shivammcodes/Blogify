"use client";

import { Editor } from "@tiptap/react";

import {
  Undo2,
  Redo2,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  CodeXml,
  Minus,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";

interface EditorToolbarProps {
  editor: Editor | null;
}

const EditorToolbar = ({ editor }: EditorToolbarProps) => {
  if (!editor) return null;

  return (
    <div className="flex w-full flex-wrap gap-1 border-b bg-gray-50 p-2 sm:gap-1.5 sm:p-3">
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded border p-1.5 transition hover:bg-gray-200 disabled:opacity-40 sm:h-9 sm:w-9 sm:p-2"
        title="Undo"
      >
        <Undo2 size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded border p-1.5 transition hover:bg-gray-200 disabled:opacity-40 sm:h-9 sm:w-9 sm:p-2"
        title="Redo"
      >
        <Redo2 size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded border p-1.5 transition sm:h-9 sm:w-9 sm:p-2 ${
          editor.isActive("bold") ? "bg-black text-white" : ""
        }`}
        title="Bold"
      >
        <Bold size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded border p-1.5 transition sm:h-9 sm:w-9 sm:p-2 ${
          editor.isActive("italic") ? "bg-black text-white" : ""
        }`}
        title="Italic"
      >
        <Italic size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded border p-1.5 transition sm:h-9 sm:w-9 sm:p-2 ${
          editor.isActive("underline") ? "bg-black text-white" : ""
        }`}
        title="Underline"
      >
        <Underline size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded border p-1.5 transition sm:h-9 sm:w-9 sm:p-2 ${
          editor.isActive("strike") ? "bg-black text-white" : ""
        }`}
        title="Strike"
      >
        <Strikethrough size={18} />
      </button>

      <button
        type="button"
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded border p-1.5 transition sm:h-9 sm:w-9 sm:p-2 ${
          editor.isActive("heading", { level: 1 })
            ? "bg-black text-white"
            : ""
        }`}
        title="Heading 1"
      >
        <Heading1 size={18} />
      </button>

      <button
        type="button"
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded border p-1.5 transition sm:h-9 sm:w-9 sm:p-2 ${
          editor.isActive("heading", { level: 2 })
            ? "bg-black text-white"
            : ""
        }`}
        title="Heading 2"
      >
        <Heading2 size={18} />
      </button>

      <button
        type="button"
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 3 }).run()
        }
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded border p-1.5 transition sm:h-9 sm:w-9 sm:p-2 ${
          editor.isActive("heading", { level: 3 })
            ? "bg-black text-white"
            : ""
        }`}
        title="Heading 3"
      >
        <Heading3 size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded border p-1.5 transition sm:h-9 sm:w-9 sm:p-2 ${
          editor.isActive("bulletList") ? "bg-black text-white" : ""
        }`}
        title="Bullet List"
      >
        <List size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded border p-1.5 transition sm:h-9 sm:w-9 sm:p-2 ${
          editor.isActive("orderedList") ? "bg-black text-white" : ""
        }`}
        title="Ordered List"
      >
        <ListOrdered size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded border p-1.5 transition sm:h-9 sm:w-9 sm:p-2 ${
          editor.isActive("blockquote") ? "bg-black text-white" : ""
        }`}
        title="Blockquote"
      >
        <Quote size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded border p-1.5 transition sm:h-9 sm:w-9 sm:p-2 ${
          editor.isActive("code") ? "bg-black text-white" : ""
        }`}
        title="Inline Code"
      >
        <Code size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded border p-1.5 transition sm:h-9 sm:w-9 sm:p-2 ${
          editor.isActive("codeBlock") ? "bg-black text-white" : ""
        }`}
        title="Code Block"
      >
        <CodeXml size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded border p-1.5 transition hover:bg-gray-200 sm:h-9 sm:w-9 sm:p-2"
        title="Horizontal Rule"
      >
        <Minus size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded border p-1.5 transition hover:bg-gray-200 sm:h-9 sm:w-9 sm:p-2"
        title="Align Left"
      >
        <AlignLeft size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded border p-1.5 transition hover:bg-gray-200 sm:h-9 sm:w-9 sm:p-2"
        title="Align Center"
      >
        <AlignCenter size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded border p-1.5 transition hover:bg-gray-200 sm:h-9 sm:w-9 sm:p-2"
        title="Align Right"
      >
        <AlignRight size={18} />
      </button>
    </div>
  );
};

export default EditorToolbar;
















// "use client";

// import { Editor } from "@tiptap/react";
// import {
//   Undo2,
//   Redo2,
//   Bold,
//   Italic,
//   Underline,
//   Strikethrough,
//   Heading1,
//   Heading2,
//   Heading3,
//   List,
//   ListOrdered,
//   Quote,
//   Code,
//   CodeXml,
//   Minus,
//   AlignLeft,
//   AlignCenter,
//   AlignRight,
// } from "lucide-react";

// interface EditorToolbarProps {
//   editor: Editor | null;
// }

// const EditorToolbar = ({ editor }: EditorToolbarProps) => {
//   if (!editor) return null;

//   return (
//     <div className="flex flex-wrap gap-2 border-b bg-gray-50 p-3">

//       {/* Undo */}
//       <button
//         type="button"
//         onClick={() => editor.chain().focus().undo().run()}
//         disabled={!editor.can().undo()}
//         className="rounded border p-2 hover:bg-gray-200 disabled:opacity-40"
//         title="Undo"
//       >
//         <Undo2 size={18} />
//       </button>

//       {/* Redo */}
//       <button
//         type="button"
//         onClick={() => editor.chain().focus().redo().run()}
//         disabled={!editor.can().redo()}
//         className="rounded border p-2 hover:bg-gray-200 disabled:opacity-40"
//         title="Redo"
//       >
//         <Redo2 size={18} />
//       </button>

//       {/* Bold */}
//       <button
//         type="button"
//         onClick={() => editor.chain().focus().toggleBold().run()}
//         className={`rounded border p-2 ${
//           editor.isActive("bold") ? "bg-black text-white" : ""
//         }`}
//         title="Bold"
//       >
//         <Bold size={18} />
//       </button>

//       {/* Italic */}
//       <button
//         type="button"
//         onClick={() => editor.chain().focus().toggleItalic().run()}
//         className={`rounded border p-2 ${
//           editor.isActive("italic") ? "bg-black text-white" : ""
//         }`}
//         title="Italic"
//       >
//         <Italic size={18} />
//       </button>

//       {/* Underline */}
//       <button
//         type="button"
//         onClick={() => editor.chain().focus().toggleUnderline().run()}
//         className={`rounded border p-2 ${
//           editor.isActive("underline") ? "bg-black text-white" : ""
//         }`}
//         title="Underline"
//       >
//         <Underline size={18} />
//       </button>

//       {/* Strike */}
//       <button
//         type="button"
//         onClick={() => editor.chain().focus().toggleStrike().run()}
//         className={`rounded border p-2 ${
//           editor.isActive("strike") ? "bg-black text-white" : ""
//         }`}
//         title="Strike"
//       >
//         <Strikethrough size={18} />
//       </button>

//       {/* H1 */}
//       <button
//         type="button"
//         onClick={() =>
//           editor.chain().focus().toggleHeading({ level: 1 }).run()
//         }
//         className={`rounded border p-2 ${
//           editor.isActive("heading", { level: 1 })
//             ? "bg-black text-white"
//             : ""
//         }`}
//         title="Heading 1"
//       >
//         <Heading1 size={18} />
//       </button>

//       {/* H2 */}
//       <button
//         type="button"
//         onClick={() =>
//           editor.chain().focus().toggleHeading({ level: 2 }).run()
//         }
//         className={`rounded border p-2 ${
//           editor.isActive("heading", { level: 2 })
//             ? "bg-black text-white"
//             : ""
//         }`}
//         title="Heading 2"
//       >
//         <Heading2 size={18} />
//       </button>

//       {/* H3 */}
//       <button
//         type="button"
//         onClick={() =>
//           editor.chain().focus().toggleHeading({ level: 3 }).run()
//         }
//         className={`rounded border p-2 ${
//           editor.isActive("heading", { level: 3 })
//             ? "bg-black text-white"
//             : ""
//         }`}
//         title="Heading 3"
//       >
//         <Heading3 size={18} />
//       </button>

//       {/* Bullet List */}
//       <button
//         type="button"
//         onClick={() => editor.chain().focus().toggleBulletList().run()}
//         className={`rounded border p-2 ${
//           editor.isActive("bulletList") ? "bg-black text-white" : ""
//         }`}
//         title="Bullet List"
//       >
//         <List size={18} />
//       </button>

//       {/* Ordered List */}
//       <button
//         type="button"
//         onClick={() => editor.chain().focus().toggleOrderedList().run()}
//         className={`rounded border p-2 ${
//           editor.isActive("orderedList") ? "bg-black text-white" : ""
//         }`}
//         title="Ordered List"
//       >
//         <ListOrdered size={18} />
//       </button>

//       {/* Blockquote */}
//       <button
//         type="button"
//         onClick={() => editor.chain().focus().toggleBlockquote().run()}
//         className={`rounded border p-2 ${
//           editor.isActive("blockquote") ? "bg-black text-white" : ""
//         }`}
//         title="Blockquote"
//       >
//         <Quote size={18} />
//       </button>

//       {/* Inline Code */}
//       <button
//         type="button"
//         onClick={() => editor.chain().focus().toggleCode().run()}
//         className={`rounded border p-2 ${
//           editor.isActive("code") ? "bg-black text-white" : ""
//         }`}
//         title="Inline Code"
//       >
//         <Code size={18} />
//       </button>

//       {/* Code Block */}
//       <button
//         type="button"
//         onClick={() => editor.chain().focus().toggleCodeBlock().run()}
//         className={`rounded border p-2 ${
//           editor.isActive("codeBlock") ? "bg-black text-white" : ""
//         }`}
//         title="Code Block"
//       >
//         <CodeXml size={18} />
//       </button>

//       {/* Horizontal Rule */}
//       <button
//         type="button"
//         onClick={() => editor.chain().focus().setHorizontalRule().run()}
//         className="rounded border p-2 hover:bg-gray-200"
//         title="Horizontal Rule"
//       >
//         <Minus size={18} />
//       </button>

//       {/* Align Left */}
//       <button
//         type="button"
//         onClick={() => editor.chain().focus().setTextAlign("left").run()}
//         className="rounded border p-2 hover:bg-gray-200"
//         title="Align Left"
//       >
//         <AlignLeft size={18} />
//       </button>

//       {/* Align Center */}
//       <button
//         type="button"
//         onClick={() => editor.chain().focus().setTextAlign("center").run()}
//         className="rounded border p-2 hover:bg-gray-200"
//         title="Align Center"
//       >
//         <AlignCenter size={18} />
//       </button>

//       {/* Align Right */}
//       <button
//         type="button"
//         onClick={() => editor.chain().focus().setTextAlign("right").run()}
//         className="rounded border p-2 hover:bg-gray-200"
//         title="Align Right"
//       >
//         <AlignRight size={18} />
//       </button>

//     </div>
//   );
// };

// export default EditorToolbar;