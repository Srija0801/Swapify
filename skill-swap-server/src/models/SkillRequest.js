import mongoose,{Schema} from "mongoose";

const SkillRequestSchema = new Schema(
    {
        sender : {type:Schema.Types.ObjectId , ref : "User"},
        receiver : {type:Schema.Types.ObjectId , ref : "User"},
        skill : {type:Schema.Types.ObjectId , ref : "Skill"},
        message : String ,
        status : {
            type : String,
            enum : ['pending','accepted','rejected','completed','cancelled'],
            default : 'pending'
        },

    },
    {timestamps : true}
);

export default mongoose.model("SkillRequest",SkillRequestSchema);