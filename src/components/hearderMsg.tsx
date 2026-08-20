import Link from "next/link"
export const HearderMsg = () => {
  return (
    <div className="msg w-full h-8 py-4 bg-sidebar flex items-center justify-center">
        <p className='text-sm text-white'>✨ Discover something new today — <Link href={'/'}>Explore Now</Link></p>
    </div>
  )
}
