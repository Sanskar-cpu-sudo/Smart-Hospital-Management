const mongoose=require("mongoose");
const {Schema}=mongoose;

const ClinicSchema = new Schema({
    name: { type: String, required: true },

    address: { type: String, required: true },

    location: { type: String, required: true },

    specialization: { type: String, required: true }
},{timestamps:true})

const Clinic=mongoose.model("Clinic",ClinicSchema);
module.exports=Clinic;