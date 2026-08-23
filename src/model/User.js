import mongoose, { Schema,model } from "mongoose";

const UserSchema=new Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
        trim: true
    }
},{timestamps: true})

const User=mongoose.models.User || model("User",UserSchema);
export default User;
