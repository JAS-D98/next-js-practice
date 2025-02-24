import Prompt from "@models/prompt";
import { connectTODB } from "@utils/database";

export const GET=async(request)=>{
    try {
        await connectTODB()

        const prompts=await Prompt.find({}).populate('creator'); 

        return new Response(JSON.stringify(prompts),{status:200})
    } catch (error) {
        return new Response("Failed to Fetch all prompts",{status:500})
    }
}