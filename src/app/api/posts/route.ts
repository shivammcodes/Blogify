import {NextResponse } from "next/server";
import { dbConnection } from "@/dbConfig/Config";
import Post from "@/model/Post";
import { unstable_cache } from "next/cache";


const getPosts=unstable_cache(
    async()=>{
        await dbConnection();
        const posts=await Post.find().sort({createdAt :-1}).lean();
        return JSON.parse(JSON.stringify(posts));

    },
    ["all-posts"],
    {revalidate: 60,tags: ["posts"]}
);

export async function GET(){
    try{
        const posts=await getPosts();
        if(posts.length==0) return NextResponse.json({error:["No blogs are found create some"]},{status:400});
        // if found then return it
        return NextResponse.json({data:posts},{status:200});
    }
    catch(error){
        return NextResponse.json({error:["Cant find the blogs"]},{status: 500});
    }
}