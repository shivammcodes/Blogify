import { NextResponse,NextRequest } from "next/server";
import Post from '@/model/Post';
import { verifyCurrentUser } from "@/lib/auth";
import { Readable } from "stream";
import cloudinary from "@/lib/cloudinary";
import { dbConnection } from "@/dbConfig/Config";



export async function POST(request: NextRequest){
    try{
        await dbConnection();
        const user=await verifyCurrentUser();
    // check if the user is logged in 

    if(!user) return NextResponse.json({error:["You are not logged in"]},{status:401});

    // get the data from the req
    const data=await request.formData();
    const title=data.get("title");
    const coverImage=data.get('coverImage');
    const content=data.get("content");
    const tagsData = data.get("tags");


    // check if any field is null
    if(!title || !content || !coverImage) return NextResponse.json({error:["All the fields are required"]},{status:400});

    const tags = tagsData
    ? JSON.parse(tagsData as string)
    : [];

    // make sure that the cover image is in  valid format
    if(!(coverImage instanceof File)) return NextResponse.json({error:["The image format is invalid"]},{status:400});

    // now get the  file and make it buffer to send to the Cloudinary
    const bytes = await coverImage.arrayBuffer();
    const buffer = Buffer.from(bytes);


    // upload buffer to Cloudinary
    const imageUrl = await new Promise<string>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "blogify",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result!.secure_url);
          }
        }
      );

      Readable.from(buffer).pipe(uploadStream);
    });


    // now creating the post
    const post=await Post.create({
        title,
        authorId:user._id,
        authorName:user.username,
        content,
        coverImage:imageUrl,
        tags
    })

    // return the response now
    return NextResponse.json({msg:["Post successfully created"],post},{status:201});
    }

    catch(error){
        console.log("Failed to create the post :",error);
        return NextResponse.json({error:["Failed to create the post :"]},{status:500});
    }

}