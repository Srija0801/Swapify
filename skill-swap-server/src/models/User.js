import mongoose,{Schema} from "mongoose";

const UserSchema = new Schema(
    {
      name     : String,
      email    : {type:String,unique:true},
      password : String,
      avatar_url : String,
      bio      : String,
      role : {
        type:String,
        enum : ["user","admin"],
        default:"user",
      },
      resetPasswordToken : String,
      resetPasswordExpires : Date,
      lastSeen : {
        type : Date,
        default:null,
      },
      isBlocked : {
        type:Boolean,
        default:false,
      },
      isOnline : {
        type : Boolean,
        default:false,
      }
   },

    {timestamps : true}

);
export default mongoose.model("User",UserSchema);