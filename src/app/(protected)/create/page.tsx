"use client";

import PublishLoader from "@/components/PublishLoader";
import { useState } from "react";
import TipTap from "@/components/editor/TipTap";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const CreatePost = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const router = useRouter();

  function handleCoverImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverImage(file);
  }

  function handleAddTag(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;

    e.preventDefault();

    const tag = tagInput.trim();

    if (!tag) return;

    if (tags.includes(tag)) {
      toast.error("Tag already added");
      return;
    }

    setTags([...tags, tag]);
    setTagInput("");
  }

  function handleRemoveTag(tagToRemove: string) {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  }

  async function handlePublish() {
    try {
      // Make sure all fields are present
      if (!title || !content || !coverImage) {
        toast.error("Please fill all the fields");
        return;
      }

      setLoading(true);

      // Create FormData
      const formData = new FormData();

      formData.append("title", title);
      formData.append("content", content);
      formData.append("coverImage", coverImage);
      formData.append("tags", JSON.stringify(tags));

      // Send to backend
      const response = await fetch("/api/posts/create", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error?.[0] || "Failed to create post");
        return;
      } else {
        toast.success(data.msg?.[0] || "Post created successfully");
        router.push("/");
      }
    } catch (error) {
      console.log("Publish post failed:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading && <PublishLoader />}

      <main className="min-h-screen bg-gray-50 px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="mx-auto w-full max-w-5xl">

          {/* Header */}
          <div className="mb-8 sm:mb-10">
            <p className="mb-2 text-xs font-medium tracking-[0.16em] text-gray-500 sm:text-sm">
              CREATE NEW POST
            </p>

            <h1 className="font-heading text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
              Tell your story.
            </h1>

            <p className="mt-2 text-sm tracking-wide text-gray-500 sm:text-base">
              Write something worth reading.
            </p>
          </div>


          {/* Title */}
          <div className="mb-6 rounded-xl border bg-white p-4 shadow-sm sm:p-6">

            <label className="mb-2 block text-sm font-medium tracking-wide">
              Post Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your post title..."
              className="w-full border-none bg-transparent text-2xl font-medium tracking-tight outline-none placeholder:text-gray-300 sm:text-3xl"
            />

          </div>


          {/* Tags */}
          <div className="mb-6 rounded-xl border bg-white p-4 shadow-sm sm:p-6">

            <label className="mb-3 block text-sm font-medium tracking-wide">
              Tags
            </label>

            {/* Existing tags */}
            <div className="mb-3 flex flex-wrap gap-2">

              {tags.map((tag) => (

                <div
                  key={tag}
                  className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-sm"
                >

                  <span>#{tag}</span>

                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-gray-500 transition-colors hover:text-red-500"
                  >
                    ×
                  </button>

                </div>

              ))}

            </div>

            {/* Tag input */}
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Add a tag and press Enter..."
              className="w-full rounded-lg border px-4 py-3 text-sm tracking-wide outline-none transition focus:ring-2 focus:ring-gray-200 sm:text-base"
            />

          </div>


          {/* Cover Image */}
          <div className="mb-6 rounded-xl border bg-white p-4 shadow-sm sm:p-6">

            <label className="mb-3 block text-sm font-medium tracking-wide">
              Cover Image
            </label>

            <label className="flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-4 transition hover:bg-gray-50 sm:min-h-[250px]">

              {coverImage ? (

                <div className="flex w-full flex-col items-center">

                  <img
                    src={URL.createObjectURL(coverImage)}
                    alt="Cover preview"
                    className="max-h-[220px] w-auto max-w-full rounded-lg object-contain sm:max-h-[250px]"
                  />

                  <p className="mt-3 max-w-full truncate px-2 text-center text-sm font-medium sm:text-base">
                    {coverImage.name}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    {(coverImage.size / 1024 / 1024).toFixed(2)} MB
                  </p>

                  {/* Remove Image */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setCoverImage(null);
                    }}
                    className="mt-4 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
                  >
                    Remove Image
                  </button>

                </div>

              ) : (

                <>
                  <p className="text-base font-medium sm:text-lg">
                    Upload cover image
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    PNG, JPG or WEBP
                  </p>
                </>

              )}

              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleCoverImage}
                className="hidden"
              />

            </label>

          </div>


          {/* Editor */}
          <div className="mb-8">

            <label className="mb-3 block text-sm font-medium tracking-wide">
              Content
            </label>

            <div className="w-full overflow-hidden">
              <TipTap onChange={setContent} />
            </div>

          </div>


          {/* Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">

            <button
              type="button"
              className="w-full rounded-lg border bg-white px-6 py-3 font-medium tracking-wide transition hover:bg-gray-50 sm:w-auto"
            >
              Save Draft
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={handlePublish}
              className="w-full rounded-lg bg-black px-6 py-3 font-medium tracking-wide text-white transition hover:bg-gray-800 sm:w-auto"
            >
              Publish Post
            </button>

          </div>

        </div>
      </main>
    </>
  );
};

export default CreatePost;





















// "use client";
// import PublishLoader from "@/components/PublishLoader";
// import { useState } from "react";
// import TipTap from "@/components/editor/TipTap";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// const CreatePost = () => {
//   const [loading,setLoading]=useState<boolean>(false);
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [coverImage, setCoverImage] = useState<File | null>(null);
//   const [tags, setTags] = useState<string[]>([]);
//   const [tagInput, setTagInput] = useState("");
//   const router=useRouter();

//   function handleCoverImage(e: React.ChangeEvent<HTMLInputElement>) {
//     const file = e.target.files?.[0];

//     if (!file) return;

//     setCoverImage(file);
//   }

//   function handleAddTag(e: React.KeyboardEvent<HTMLInputElement>) {
//     if (e.key !== "Enter") return;

//     e.preventDefault();

//     const tag = tagInput.trim();

//     if (!tag) return;

//     if (tags.includes(tag)) {
//         toast.error("Tag already added");
//         return;
//     }

//     setTags([...tags, tag]);
//     setTagInput("");
// }

// function handleRemoveTag(tagToRemove: string) {
//     setTags(tags.filter((tag) => tag !== tagToRemove));
// }


//   async function handlePublish() {
//   try {
//     // Make sure all fields are present
//     if (!title || !content || !coverImage) {
//       toast.error("Please fill all the fields");
//       return;
//     }

//     setLoading(true);

//     // Create FormData
//     const formData = new FormData();

//     formData.append("title", title);
//     formData.append("content", content);
//     formData.append("coverImage", coverImage);
//     formData.append("tags", JSON.stringify(tags));

//     // Send to backend
//     const response = await fetch("/api/posts/create", {
//       method: "POST",
//       body: formData,
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       toast.error(data.error?.[0] || "Failed to create post");
//       return;
//     }

//     else{
//       toast.success(data.msg?.[0] || "Post created successfully");
//       router.push('/');
//     }

//   } catch (error) {
//     console.log("Publish post failed:", error);
//     toast.error("Something went wrong");
//   }
//   finally{
//     setLoading(false);
//   }
// }

//   return (
//     <>
//       {loading && <PublishLoader/>}
//     <main className="min-h-screen bg-gray-50 px-6 py-32">
//       <div className="mx-auto max-w-5xl">

//         {/* Header */}
//         <div className="mb-8">
//           <p className="mb-2 text-sm font-medium text-gray-500">
//             CREATE NEW POST
//           </p>

//           <h1 className="text-4xl font-bold">
//             Tell your story.
//           </h1>

//           <p className="mt-2 text-gray-500">
//             Write something worth reading.
//           </p>
//         </div>

//         {/* Title */}
//         <div className="mb-6 rounded-xl border bg-white p-6 shadow-sm">
//           <label className="mb-2 block text-sm font-medium">
//             Post Title
//           </label>

//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Enter your post title..."
//             className="w-full border-none text-3xl font-bold outline-none placeholder:text-gray-300"
//           />
//         </div>




// {/* Tags */}
// <div className="mb-6 rounded-xl border bg-white p-6 shadow-sm">
//     <label className="mb-3 block text-sm font-medium">
//         Tags
//     </label>

//     {/* Existing tags */}
//     <div className="mb-3 flex flex-wrap gap-2">
//         {tags.map((tag) => (
//             <div
//                 key={tag}
//                 className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-sm"
//             >
//                 <span>#{tag}</span>

//                 <button
//                     type="button"
//                     onClick={() => handleRemoveTag(tag)}
//                     className="text-gray-500 hover:text-red-500"
//                 >
//                     ×
//                 </button>
//             </div>
//         ))}
//     </div>

//     {/* Tag input */}
//     <input
//         type="text"
//         value={tagInput}
//         onChange={(e) => setTagInput(e.target.value)}
//         onKeyDown={handleAddTag}
//         placeholder="Add a tag and press Enter..."
//         className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-gray-200"
//     />
// </div>




//         {/* Cover Image */}
// <div className="mb-6 rounded-xl border bg-white p-6 shadow-sm">
//   <label className="mb-3 block text-sm font-medium">
//     Cover Image
//   </label>

//   <label className="flex min-h-[250px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-4 transition hover:bg-gray-50">

//     {coverImage ? (
//       <div className="flex w-full flex-col items-center">

//         <img
//           src={URL.createObjectURL(coverImage)}
//           alt="Cover preview"
//           className="max-h-[250px] max-w-full rounded-lg object-contain"
//         />

//         <p className="mt-3 font-medium">
//           {coverImage.name}
//         </p>

//         <p className="mt-1 text-sm text-gray-500">
//           {(coverImage.size / 1024 / 1024).toFixed(2)} MB
//         </p>

//         {/* Remove Image */}
//         <button
//           type="button"
//           onClick={(e) => {
//             e.preventDefault();
//             setCoverImage(null);
//           }}
//           className="mt-4 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
//         >
//           Remove Image
//         </button>

//       </div>
//     ) : (
//       <>
//         <p className="text-lg font-medium">
//           Upload cover image
//         </p>

//         <p className="mt-1 text-sm text-gray-500">
//           PNG, JPG or WEBP
//         </p>
//       </>
//     )}

//     <input
//       type="file"
//       accept="image/png,image/jpeg,image/webp"
//       onChange={handleCoverImage}
//       className="hidden"
//     />

//   </label>
// </div>

//         {/* Editor */}
//         <div className="mb-8">
//           <label className="mb-3 block text-sm font-medium">
//             Content
//           </label>
//           <TipTap onChange={setContent} />
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-end gap-3">

//           <button
//             type="button"
//             className="rounded-lg border bg-white px-6 py-3 font-medium hover:bg-gray-50"
//           >
//             Save Draft
//           </button>

//           <button
//             type="button"
//             disabled={loading}
//             onClick={handlePublish}
//             className="rounded-lg bg-black px-6 py-3 font-medium text-white hover:bg-gray-800"
//           >
//             Publish Post
//           </button>

//         </div>

//       </div>
//     </main>
//     </>
//   );
// };

// export default CreatePost;