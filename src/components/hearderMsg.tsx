import Link from "next/link"

export const HearderMsg = () => {
  return (
    <div className="w-full h-8 px-4 bg-sidebar flex items-center justify-center">
  <p className="text-xs sm:text-sm text-white text-center">
    ✨ Discover something new today —{" "}
    <Link href="/blogs" className="font-medium underline">
      Explore Now
    </Link>
  </p>
</div>
  )
}

