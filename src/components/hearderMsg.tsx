import Link from "next/link"

export const HearderMsg = () => {
  return (
    <div className="msg w-full min-h-8 px-4 py-1.5 bg-sidebar flex items-center justify-center">
      <p className="text-xs sm:text-sm text-white text-center">
        ✨ Discover something new today —{" "}
        <Link href="/blogs">Explore Now</Link>
      </p>
    </div>
  );
};

