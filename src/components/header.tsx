import Link from "next/link"

import { Button } from "@/components/ui/button"

import { verifyCurrentUser } from "@/lib/auth"

import LogoutBtn from "./LogoutBtn";

export const Header = async () => {

  const user = await verifyCurrentUser();

  return (
    <div className="wrapper fixed w-full top-8 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 bg-transparent z-50">

      <nav className="bg-secondary w-full py-3 sm:py-4 rounded-xl px-4 sm:px-6 flex items-center justify-between relative">

        {/* Logo */}
        <Link
          className="text-2xl sm:text-3xl font-semibold font-heading tracking-[0.01em]"
          href="/"
        >
          Blogify
        </Link>

        {/* Desktop Navigation */}
        <div className="content hidden md:flex gap-x-2 lg:gap-x-3 items-center text-lg absolute left-1/2 -translate-x-1/2">

          <Link href="/">
            <Button
              variant="secondary"
              size="lg"
              className="rounded-2xl px-3 lg:px-4 text-xs lg:text-sm py-4"
            >
              Home
            </Button>
          </Link>

          <Link href="/blogs">
            <Button
              variant="secondary"
              size="lg"
              className="rounded-2xl px-3 lg:px-4 text-xs lg:text-sm py-4"
            >
              Blogs
            </Button>
          </Link>

          <Link href="/">
            <Button
              variant="secondary"
              size="lg"
              className="rounded-2xl px-3 lg:px-4 text-xs lg:text-sm py-4"
            >
              About
            </Button>
          </Link>

        </div>

        {/* Auth */}
        <div className="auth flex gap-x-2 sm:gap-x-3 lg:gap-x-5 items-center">

          {
            user ? (

              <>
                {/* Create Post */}
                <Link
                  href="/create"
                  className="hidden sm:flex items-center justify-center"
                >
                  <Button
                    variant="secondary"
                    size="lg"
                    className="rounded-2xl px-3 lg:px-4 text-xs lg:text-sm py-4"
                  >
                    Create Post
                  </Button>
                </Link>

                {/* Welcome */}
                <Button
                  variant="secondary"
                  size="lg"
                  className="rounded-2xl hover:bg-transparent px-3 lg:px-4 text-xs lg:text-sm py-4 flex items-center justify-center"
                >
                  <span className="hidden sm:inline">
                    Welcome, {user.username.split(" ")[0]}
                  </span>

                  <span className="sm:hidden">
                    {user.username.split(" ")[0]}
                  </span>
                </Button>

                <LogoutBtn />
              </>

            ) : (

              <>
                {/* Login */}
                <Link
                  href="/login"
                  className="flex items-center justify-center"
                >
                  <Button
                    variant="secondary"
                    size="lg"
                    className="rounded-2xl px-3 lg:px-4 text-xs lg:text-sm py-4"
                  >
                    Log in
                  </Button>
                </Link>

                {/* Sign Up */}
                <Link
                  href="/signup"
                  className="flex items-center justify-center"
                >
                  <Button
                    variant="default"
                    size="lg"
                    className="rounded-lg px-3 lg:px-4 text-xs lg:text-sm py-5"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>

            )
          }

        </div>

      </nav>

    </div>
  )
}

































// import Link from "next/link"
// import {Button} from "@/components/ui/button"
// import { verifyCurrentUser } from "@/lib/auth"
// import LogoutBtn from "./LogoutBtn";
// export const Header = async() => {
//   const user=await verifyCurrentUser();
//   return (
//       <div className="wrapper fixed w-full top-14 px-32 bg-transparent z-50">
//         <nav className="bg-secondary w-full py-4 rounded-xl px-6 flex items-center justify-between relative">
//         <Link className="text-3xl font-semibold" href={'/'}>Blogify</Link>
//         <div className="content  flex gap-x-3 items-center text-lg absolute left-1/2 -translate-x-1/2">
//           <Link href={'/'}><Button variant={"secondary"} size={"lg"} className={"rounded-2xl px-4 text-sm py-4"}>Home</Button></Link>
//           <Link href={'/blogs'}><Button variant={"secondary"} size={"lg"} className={"rounded-2xl px-4 text-sm py-4"}>Blogs</Button></Link>
//           <Link href={'/'}><Button variant={"secondary"} size={"lg"} className={"rounded-2xl px-4 text-sm py-4"}>About</Button></Link>
//         </div>
//         <div className="auth flex gap-x-5 items-center">
//           {
//           user ? (
//             <>   
//                 <Link href={'/create'} className="flex items-center justify-center "><Button variant={"secondary"} size={"lg"} className={"rounded-2xl px-4 text-sm py-4"}>Create Post</Button></Link>
//                  <Button variant={"secondary"} size={"lg"} className={"rounded-2xl hover:bg-transparent px-4 text-sm py-4 flex items-center justify-center"}>Welcome, {user.username.split(' ')[0]}</Button>
//                  <LogoutBtn></LogoutBtn>
//             </>
//           ) : (
//            <>
//                  <Link href={'/login'} className="flex items-center justify-center "><Button variant={"secondary"} size={"lg"} className={"rounded-2xl px-4 text-sm py-4"}>Log in</Button></Link>
//                  <Link href={'/signup'} className="flex items-center justify-center "><Button variant={"default"} size={"lg"} className={"rounded-lg px-4 text-sm py-5"}>Sign Up</Button></Link>
//            </>
//           )
//           }
//         </div>
//       </nav>
//       </div>
//   )
// }