const mongoose=require("mongoose");
const {Schema}=mongoose;

const AppointSchema= new Schema({
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true
    },

    clinicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clinic",
      required: true
    },

    date: { type: String, required: true }, // "2026-01-23"

    time: { type: String, required: true }, // "10:30"

    status: {
      type: String,
      enum: ["confirmed", "cancelled", "completed"],
      default: "confirmed"
    }
    
},{timestamps:true})

const Appoint=mongoose.model("Appoint",AppointSchema);
module.exports=Appoint;