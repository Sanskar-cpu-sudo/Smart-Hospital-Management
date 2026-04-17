const mongoose=require("mongoose");
const {Schema}=mongoose;

const UserSchema=new Schema({
    username:{
        type:String,
        required:true,
    }, 
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["doctor","patient"],
        required:true,
    }
},{timestamps:true})

const User=mongoose.model("User",UserSchema);
module.exports=User