import { GoogleGenAI } from "@google/genai";
import { summarizeResponseSchema } from "./typeChecker";

const ai=new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
})

export async function generateSunmmary(title: string, content: string){
    const response=await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: `
           title : ${title}
           content: ${content}
        `,

        config:{
            systemInstruction: `
               You are a blog summarizing assistant your job is to summarize the blog based on the information that is provided
               Now your job is to  - 
               1.) generate a 100-150 words of summary 
               2.) generate keyPoints like 5-6 according to yourself
               3.) generate the takeaway of the blog its like the important point


               Important-
               Make sure to respond in this format only
               {
                 isValid: true,
                 summary : string,
                 keyPoints : [string],
                 takeaway: string
               }

               Before generating the summary, determine whether the provided blog content is valid.

            Set isValid to false if:
            - The content is gibberish or meaningless.
            - The content is too short to meaningfully summarize.
            - The content is unrelated to the provided title.
            - The content does not contain enough meaningful information to create a summary.
            - The content is primarily random characters or nonsense.

              Set isValid to true only when the content contains meaningful information that can reasonably be summarized.

              Important:
               Judge the validity primarily from the content itself. Do not treat the title as a substitute for missing or meaningless content.


               Note- 
               Make sure not to add any fencing or anything, respond only in the above format
            `
        }
    })
    const text=response.text;
    if(!text) return null;
    const data=JSON.parse(text);
    
    const responseResult=summarizeResponseSchema.safeParse(data);

    if(!responseResult.success) return null;
    if(!responseResult.data.isValid) return null; 
    return responseResult.data;
}