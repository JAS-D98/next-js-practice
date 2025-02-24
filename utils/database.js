import mongoose from "mongoose";

let isConnected=false;

export const connectTODB=async()=>{
    mongoose.set('strictQuery', true);
    if (isConnected) {
        console.log("connected to db");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName:"share_prompt",
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        isConnected=true;
        console.log("connected to db");
        
    } catch (error) {
        console.log(error);
    }
}