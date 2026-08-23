import { verifyCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AuthChecker({children,}: {children: React.ReactNode}){
    const user=await verifyCurrentUser();
    if(!user){
        redirect("/login");
    }
    return <>{children}</>
}