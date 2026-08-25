import {NextResponse } from "next/server";
import { dbConnection } from "@/dbConfig/Config";
import Post from "@/model/Post";


export async function GET(){
    try{
        await dbConnection();
        const posts=await Post.find();
        if(posts.length==0) return NextResponse.json({error:["No blogs are find create some"]},{status:400});
        // if found then return it
        return NextResponse.json({data:posts},{status:200});
    }
    catch(error){
        return NextResponse.json({error:["Cant find the blogs"]},{status: 500});
    }
}