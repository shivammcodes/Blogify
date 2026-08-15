import mongoose from "mongoose";
export async function dbConnection(){
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        const Connection=mongoose.connection;
        Connection.on("connected",()=>{
            console.log("Database connected Successfully");
        })
        Connection.on("error",(error)=>{
            console.log("Database connection failed :",error);
        })
    }
    catch(error){
        console.log("Something went wrong");
        console.log(error);
    }
}