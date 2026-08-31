"use client";

const CommonLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md">
      <div className="flex flex-col items-center text-center">

        {/* Animated glow */}
        <div className="relative mb-8 flex h-24 w-24 items-center justify-center">
          <div className="absolute inset-0 animate-ping rounded-full bg-white/10" />

          <div className="absolute h-16 w-16 animate-pulse rounded-full bg-white/10 blur-xl" />

          <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          </div>
        </div>

        {/* Brand */}
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          Blogify
        </h2>

        {/* Main text */}
        <p className="mt-3 text-lg text-white/80">
          Publish your story
        </p>

        {/* Animated dots */}
        <div className="mt-2 flex gap-1">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/60" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/60 [animation-delay:150ms]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/60 [animation-delay:300ms]" />
        </div>

        <p className="mt-6 text-sm text-white/40">
          Loading the page...
        </p>

      </div>
    </div>
  );
};

export default CommonLoader;