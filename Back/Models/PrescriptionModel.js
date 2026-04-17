const mongoose=require("mongoose");
const {Schema}=mongoose;

const PrescriptionSchema=new Schema({
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appoint",
      required: true,
      unique: true
    },

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

    diagnosis: { type: String, required: true },

    medicines: [
      {
        name: { type: String, required: true },
        dosage: { type: String, required: true },
        instructions: { type: String, required: true }
      }
    ]
},{timestamps:true})

const Prescription=mongoose.model("Prescription",PrescriptionSchema);
module.exports=Prescription;