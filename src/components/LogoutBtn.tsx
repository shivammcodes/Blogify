"use client"
import { Button } from "./ui/button"
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const LogoutBtn = () => {
      const router=useRouter();
    async function handlerLogout() {
        try{
          const response=await fetch("/api/user/logout",{
            method: "POST",
            headers:{"content-type" : "application/json"},
          })
          const data=await response.json();
          if(!response.ok){
            toast.error(data.error);
          }
          else{
            toast.success(data.msg);
            router.push('/');
            router.refresh();
          }
        }
        catch(error){
          console.log("User logout failed :",error);
        }
      }
  return (
    <Button variant={"default"} size={"lg"} className={"rounded-lg px-4 text-sm py-5"} onClick={handlerLogout}>Logout</Button>
  )
}

export default LogoutBtn;