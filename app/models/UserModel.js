import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({

    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    NIDNumber:{type:String,required:true,unique: true},
    phoneNumber:{type:String,required:true},
   password:{type:String,required:true},
   bloodGroup:{type:String,default:0},
},{timestamps:true,versionKey:false})
export default mongoose.model("authusers", userSchema);
