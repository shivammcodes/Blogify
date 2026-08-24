"use client";
import PublishLoader from "@/components/PublishLoader";
import { useState } from "react";
import TipTap from "@/components/editor/TipTap";
import toast from "react-hot-toast";
const CreatePost = () => {
  const [loading,setLoading]=useState<boolean>(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);

  function handleCoverImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    setCoverImage(file);
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

    // Send to backend
    const response = await fetch("/api/posts/create", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.error?.[0] || "Failed to create post");
      return;
    }

    toast.success(data.msg?.[0] || "Post created successfully");

  } catch (error) {
    console.log("Publish post failed:", error);
    toast.error("Something went wrong");
  }
  finally{
    setLoading(false);
  }
}

  return (
    <>
      {loading && <PublishLoader/>}
    <main className="min-h-screen bg-gray-50 px-6 py-32">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-gray-500">
            CREATE NEW POST
          </p>

          <h1 className="text-4xl font-bold">
            Tell your story.
          </h1>

          <p className="mt-2 text-gray-500">
            Write something worth reading.
          </p>
        </div>

        {/* Title */}
        <div className="mb-6 rounded-xl border bg-white p-6 shadow-sm">
          <label className="mb-2 block text-sm font-medium">
            Post Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your post title..."
            className="w-full border-none text-3xl font-bold outline-none placeholder:text-gray-300"
          />
        </div>

        {/* Cover Image */}
        {/* Cover Image */}
<div className="mb-6 rounded-xl border bg-white p-6 shadow-sm">
  <label className="mb-3 block text-sm font-medium">
    Cover Image
  </label>

  <label className="flex min-h-[250px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-4 transition hover:bg-gray-50">

    {coverImage ? (
      <div className="flex w-full flex-col items-center">

        <img
          src={URL.createObjectURL(coverImage)}
          alt="Cover preview"
          className="max-h-[250px] max-w-full rounded-lg object-contain"
        />

        <p className="mt-3 font-medium">
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
          className="mt-4 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
        >
          Remove Image
        </button>

      </div>
    ) : (
      <>
        <p className="text-lg font-medium">
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
          <label className="mb-3 block text-sm font-medium">
            Content
          </label>
          <TipTap onChange={setContent} />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">

          <button
            type="button"
            className="rounded-lg border bg-white px-6 py-3 font-medium hover:bg-gray-50"
          >
            Save Draft
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={handlePublish}
            className="rounded-lg bg-black px-6 py-3 font-medium text-white hover:bg-gray-800"
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