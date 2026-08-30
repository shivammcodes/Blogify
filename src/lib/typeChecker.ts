import * as z from "zod";

export const summarizeRequestSchema=z.object({
    title: z.string(),
    content: z.string()
})


export const summarizeResponseSchema=z.object({
    isValid: z.boolean(),
    summary: z.string(),
    keyPoints: z.array(z.string()),
    takeaway: z.string()
})