import User from "@/model/User";
import { dbConnection } from "@/dbConfig/Config";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
type userType={
    _id: string,
    email:string
}
export async function verifyCurrentUser(){
    try{
        // get the cookie
        const cookie=await cookies();

        // extract the _id value from it
        const token = cookie.get("token")?.value;

        // if not we return
        if(!token) return null;
        
        // if yes then we verify
        const decoded=jwt.verify(token,process.env.JWT_SECRET!)as userType;

        // now if the token is there find the user on db and return

        await dbConnection();

        const user=await User.findById(decoded._id);

        // if user does not exist
        if(!user) return null;

        return user;
    }
    catch(error){
        console.log("Failed to verify the user");
        return null;
    }
}