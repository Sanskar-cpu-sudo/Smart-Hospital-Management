const mongoose=require("mongoose");
const {Schema}=mongoose;

const DoctorSchema=new Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    clinicId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Clinic",
        required:true,
        unique:true,
    },

    specialization:{
        type: String, 
        required: true 
    },

    Bio:{
        type: String, 
        required: true 
    },
    availability: [
      {
        days: {
          type: [String], // ["Monday", "Tuesday", ...]
          required: true
        },
        from: {
          type: String, // "11:00"
          required: true
        },
        to: {
          type: String, // "14:00"
          required: true
        },
        maxSlots: {
          type: Number,
          required: true
        }
      }
    ]

},{timestamps:true})

const Doctor=mongoose.model("Doctor",DoctorSchema);
module.exports=Doctor;