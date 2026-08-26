import Post from "@/model/Post";
import { NextRequest, NextResponse } from "next/server";

export async function GET( request: NextRequest,{params}: any){
    try{
       const resolvedParams=await params;
       const {id}=resolvedParams;
      // now that we have got the id get the post from the database  
      const post=await Post.findById(id);


      // if we not find any post we return from this api
      if(!post){
        return NextResponse.json({error:["Post not found"]},{status:404});
      }

      return NextResponse.json({data:post},{status:200})
    }
    catch(error){
       console.log("Something went wrong :",error);
       return NextResponse.json({error:["Something went wrong"]},{status:500});
    }
}