import Prompt from "@models/prompt";
import { connectTODB } from "@utils/database";

// get data
export const GET=async(request, {params})=>{
    try {
        await connectTODB()

        const prompt=await Prompt.findById(params.id).populate('creator'); 

        if(!prompt) return new Response("Prompt not found",{status:404})

        return new Response(JSON.stringify(prompt),{status:200})
    } catch (error) {
        return new Response("Failed to Fetch all prompts",{status:500})
    }
}

// update
export const Patch=async(request, {params})=>{
    const {prompt, tag}=await request.json();
    try {
        await connectTODB();

        const existingPrompt=await Prompt.findById(params.id)

        if(!existingPrompt) return new Response("Prompt not found", {status:404})
            
        existingPrompt.prompt=prompt;
        existingPrompt.tag=tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), {status:200})
        } catch (error) {
        return new Response("Failed to update the prompt", {status:500})
    }
}

// delete
export const DELETE= async(request, params)=>{
    try {
        await connectTODB();
    await Prompt.findByIdAndDelete(params.id)
    return new Response("Prompt deleted successfully", {status:200})
    } catch (error) {
        return new Response("Failed to delete Prompt", {status:500})    
    }
}

