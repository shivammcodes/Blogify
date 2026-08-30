import { NextRequest,NextResponse } from "next/server";
import { summarizeRequestSchema} from "@/lib/typeChecker";
import { generateSunmmary } from "@/lib/aiSummarizer";

export async function POST(request :NextRequest){
    try{
        const body=await request.json();
        const {title,content}=body;
        const requestResult=summarizeRequestSchema.safeParse({title,content});
        if(!requestResult.success){
           return NextResponse.json({error:["Invalid title and content"]},{status:400});
        }

       const aiResponse= await generateSunmmary(title,content);
       if(!aiResponse) return NextResponse.json({error:["Failed to generate the summary for this post"]},{status:400});
       return NextResponse.json({data: aiResponse},{status: 200});
    }
    catch(error){
        console.log(error);
        return NextResponse.json({error:["Something went wrong"]},{status:500});
    }
}