import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
   {
      fullName : String,
      avatar : String,
      status : String,
      dob : Date,
      token: String,
      gender  :{
        type:String,
        default:"Khác"
      },
      phone : String,
      address : String,
      peopleId : String,
      decription: String,
      deleted :{
         type : Boolean,
         default : false
      },
      deletedAt : Date,
   },
   {
      timestamps  : true
   }
);


const User = mongoose.model("User",userSchema,"users");
export default User;