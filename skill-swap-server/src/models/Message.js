import mongoose,{Schema} from "mongoose";

const MessageSchema = new Schema(
    {
        exchange : {type : Schema.Types.ObjectId , ref : "Exchange"},
        sender : {type : Schema.Types.ObjectId , ref : "User"},
        content : String,
        readBy : [
            {type:Schema.Types.ObjectId , ref : "User"}
        ]
    },
    {
        timestamps : true
    }
);

export default mongoose.model("Message",MessageSchema);