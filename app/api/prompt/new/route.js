import Prompt from "@models/prompt";
import { connectTODB } from "@utils/database";

export const POST=async(req)=>{
    const {userId, prompt, tag}=await req.json(); 
    
    try {
        await connectTODB();
        const newPrompt=new Prompt({
            creator:userId, 
            prompt,
            tag
        })
        await newPrompt.save()
        return new Response(JSON.stringify(newPrompt),{status:201})
    } catch (error) {
        return new Response("Failed to create a new prompt", {status:500})
    }
}