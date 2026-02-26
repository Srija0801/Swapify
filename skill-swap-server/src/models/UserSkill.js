import mongoose,{Schema} from "mongoose";

const UserSkillSchema = new Schema(
    {
        user : {type:Schema.Types.ObjectId , ref:"User"},
        skill : {type:Schema.Types.ObjectId , ref:"Skill"},
        skill_type : {type:String , enum:['teaching','learning']},
        proficiency : Number
    }
)
export default mongoose.model('UserSkill',UserSkillSchema);