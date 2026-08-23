import bcrypt from "bcryptjs";
import User from "@/model/User";
import {dbConnection} from "@/dbConfig/Config";
import { NextRequest,NextResponse} from "next/server";

await dbConnection();

export async function POST(request : NextRequest){
    try{
        // this is the way to destructure the data from the request
        const reqBody=await request.json();

        const{email,password,username}=reqBody;

        // check if the data is present there or not
        if(!email || !password || !username) return NextResponse.json({error:["Every field is required"]},{status:400});

        // if email and password is there we has the password before saving it to the database
        const saltrounds=10;
        const hashedPassword=await bcrypt.hash(password,saltrounds);

        // now we can create a user on the database
        const user=await User.create({
            email,
            password:hashedPassword,
            username
        })

        return NextResponse.json({msg:["User successfully created"],userData:{email:user.email,_id:user._id}},{status:201});
    } 
    catch(error: any){
        const errors=[];
        if(error.name=="ValidationError"){
            for(let err in error.errors){
                errors.push(error.errors[err].message);
            }
            return NextResponse.json({error:errors},{status:400});
        }
        else  if(error.code==11000){
            errors.push("User already exists");
            return  NextResponse.json({error:errors},{status:400});
        }
        else{
            errors.push("Something went wrong");
            return  NextResponse.json({error:errors},{status:400});
        }
    }
}
