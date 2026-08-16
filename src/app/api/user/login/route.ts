import User from "@/model/User";
import bcrypt from "bcryptjs";
import { dbConnection } from "@/dbConfig/Config";
import { NextRequest,NextResponse } from "next/server";
import jwt  from "jsonwebtoken";

await dbConnection();
export async function POST(request : NextRequest){
    try{
        // get the data from request
        const reqBody=await request.json();
        const{email,password}=reqBody;

        // check if both the fields are there or not
        if(!email || !password) return NextResponse.json({error:["Both the email and password are needed"]},{status: 400});

        // if we have both then first we veriy the email if there or not
        const user=await User.findOne({email});

        // now check for the user if there or not
        if(!user) return NextResponse.json({error:["User does not exist"]},{status: 401});

        // if the user is there then we match the password
        const isUser=await bcrypt.compare(password,user.password);

        // if password does not match

        if(!isUser) return NextResponse.json({error:["Invalid password entered"]},{status:401});

        // now if everything is alright we can create the cookie for user to be logged in

         const token=jwt.sign({email: user.email,_id:user._id},process.env.JWT_SECRET!,{expiresIn: "1d"});

        //  make a response
        const response=NextResponse.json({msg:["User login successful"],userData:{email:user.email,_id:user._id}},{status:200});

        // attatching info to the cookies
        response.cookies.set("token",token,{
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24,
       })

       return response;
    }
    catch(error : any){
        let err=[];
            err.push("Login Failed");
            return NextResponse.json({error:err},{status: 500});
    }
}