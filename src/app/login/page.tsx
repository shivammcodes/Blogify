"use client"

import React, { useState } from 'react'

import { Button } from "@/components/ui/button"

import toast from 'react-hot-toast'

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import Link from 'next/link'

import { useRouter } from 'next/navigation'

const page = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  async function handlerUserLogin(e: any) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error);
        return;
      }
      else {
        toast.success(data.msg);
        router.push('/');
        router.refresh();
      }
    }
    catch (error) {
      console.log("User login failed :", error);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div className='wrapper w-full min-h-screen flex items-center justify-center px-4 sm:px-6'>
      <Card className="w-full max-w-sm bg-secondary rounded-lg border border-black">
        <CardHeader className="p-5 sm:p-6">
          <CardTitle className='text-lg sm:text-xl'>
            Log in to your account
          </CardTitle>

          <CardDescription className="text-sm">
            Enter your email below to log in
          </CardDescription>

          <CardAction>
            <Link href={'/signup'}>Sign up</Link>
          </CardAction>
        </CardHeader>

        <CardContent className="px-5 sm:px-6">
          <form>
            <div className="flex flex-col gap-6">

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>

                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className='border-black rounded-sm'
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>

                <Input
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  value={password}
                  className='border-black rounded-sm'
                  required
                  placeholder='*****'
                />
              </div>

            </div>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-2 px-5 pb-5 sm:px-6 sm:pb-6">
          <Button
            type="submit"
            className="w-full bg-sidebar"
            onClick={handlerUserLogin}
          >
            {
              loading ? "Logging in..." : "Log in"
            }
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default page


















// "use client"
// import React, { useState } from 'react'
// import { Button } from "@/components/ui/button"
// import toast from 'react-hot-toast'
// import {
//   Card,
//   CardAction,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import Link from 'next/link'
// import { useRouter } from 'next/navigation'
// const page = () => {
//   const [email,setEmail]=useState<string>("");
//   const [password,setPassword]=useState<string>("");
//   const [loading,setLoading]=useState<boolean>(false);
//   const router=useRouter();
//   async function handlerUserLogin(e: any){
//     e.preventDefault();
//     try{
//         setLoading(true);
//         const response=await fetch("/api/user/login",{
//             method: "POST",
//             headers: {"content-type" : "application/json"},
//             body: JSON.stringify({email,password})
//         })
//         const data=await response.json();
//         if(!response.ok){
//             toast.error(data.error);
//             return;
//         }
//         else{
//             toast.success(data.msg);
//             router.push('/');
//             router.refresh();
//         }
//     }
//     catch(error){
//         console.log("User login failed :",error);
//     }
//     finally{
//         setLoading(false);
//     }
//   }
 
//   return (
//     <div className='wrapper w-full min-h-screen flex items-center justify-center'>
//         <Card className="w-full max-w-sm bg-secondary rounded-lg border border-black">
//       <CardHeader>
//         <CardTitle className='text-lg'>Log in to your account</CardTitle>
//         <CardDescription>
//           Enter your email below to log in
//         </CardDescription>
//         <CardAction>
//           <Link href={'/signup'}>Sign up</Link>
//         </CardAction>
//       </CardHeader>
//       <CardContent>
//         <form>
//           <div className="flex flex-col gap-6">
//             <div className="grid gap-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 value={email}
//                 onChange={(e)=>setEmail(e.target.value)}
//                 id="email"
//                 type="email"
//                 placeholder="m@example.com"
//                 required
//                 className='border-black rounded-sm'
//               />
//             </div>
//             <div className="grid gap-2">
//               <div className="flex items-center">
//                 <Label htmlFor="password">Password</Label>
//               </div>
//               <Input id="password" onChange={(e)=>setPassword(e.target.value)} type="password" value={password} className='border-black rounded-sm' required placeholder='*****' />
//             </div>
//           </div>
//         </form>
//       </CardContent>
//       <CardFooter className="flex-col gap-2">
//         <Button type="submit" className="w-full bg-sidebar" onClick={handlerUserLogin}>
//               {
//                 loading ? "Logging in..."  : "Log in"
//               }
//         </Button>
//       </CardFooter>
//     </Card>
//     </div>
//   )
// }

// export default page