import mongoose, {Schema,model} from "mongoose";

const PostSchema=new Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    content:{
        type: String,
        required: true
    },
    coverImage:{
        type: String,
        required: true
    },
    authorName:{
        type: String,
        required: true
    },
    authorId:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},{timestamps:true})

const Post=mongoose.models.Post || model("Post",PostSchema);
export default Post;