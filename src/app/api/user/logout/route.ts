import { NextRequest,NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function POST(request : NextRequest){
    try{
        const cookie=await cookies();
        const token=cookie.get("token")?.value;
        // if not logged in
        if(!token){
            return NextResponse.json({error:["You are not logged in"]},{status:401});
        }

        // now delete the cookie
        cookie.delete("token");
        return NextResponse.json({msg:["User logout successful"]},{status:200});   
    }
    catch(error){
        console.log("User logout failed :",error);
        return NextResponse.json({error:["user logout Failed"]},{status:500});
    }
}