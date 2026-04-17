const mongoose=require("mongoose");
const {Schema}=mongoose;

const PatientSchema=new Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true 
    },
    
    age: { type: Number },

    gender: { type: String },

    mobile: { type: String },

    address: { type: String },

    bloodGroup: { type: String }
},{timestamps:true})

const Patient=mongoose.model("Patient",PatientSchema);
module.exports=Patient;