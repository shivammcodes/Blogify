import Link from "next/link"
import {Button} from "@/components/ui/button"

export const Header = () => {
  return (
      <div className="wrapper fixed w-full top-14 px-32 bg-transparent z-50">
        <nav className="bg-[#f9f5f0] w-full py-4 rounded-xl px-6 flex items-center justify-between relative">
        <Link className="text-3xl font-semibold" href={'/'}>Blogify</Link>
        <div className="content  flex gap-x-3 items-center text-lg absolute left-1/2 -translate-x-1/2">
          <Link href={'/'}><Button variant={"secondary"} size={"lg"} className={"rounded-2xl px-4 text-sm py-4"}>Home</Button></Link>
          <Link href={'/'}><Button variant={"secondary"} size={"lg"} className={"rounded-2xl px-4 text-sm py-4"}>Blogs</Button></Link>
          <Link href={'/'}><Button variant={"secondary"} size={"lg"} className={"rounded-2xl px-4 text-sm py-4"}>About</Button></Link>
        </div>
        <div className="auth flex gap-x-5">
          <Link href={'/login'} className="flex items-center justify-center "><Button variant={"secondary"} size={"lg"} className={"rounded-2xl px-4 text-sm py-4"}>Log in</Button></Link>
          <Link href={'/'} className="flex items-center justify-center "><Button variant={"default"} size={"lg"} className={"rounded-lg px-4 text-sm py-5"}>Sign Up</Button></Link>
        </div>
      </nav>
      </div>
  )
}

