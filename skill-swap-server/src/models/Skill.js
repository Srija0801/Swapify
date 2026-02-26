import mongoose,{Schema} from "mongoose";

const SkillSchema = new Schema(
    {
        skill : String
    }
);
 
export default mongoose.model("Skill",SkillSchema);