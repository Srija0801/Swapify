import mongoose,{Schema} from "mongoose";

const ExchangeSchema = new Schema(
    {
        request : {type : Schema.Types.ObjectId , ref : "SkillRequest"},
        users : [{type : Schema.Types.ObjectId , ref : "User"}],
        skill : {type : Schema.Types.ObjectId , ref : "Skill"},
        status : {type : String , enum : ["active","completed","cancelled"]}
    }
);

export default mongoose.model("Exchange",ExchangeSchema);