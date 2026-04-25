const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
 
const Doctor=require("../Controller/DoctorController")
const Appointment=require("../Controller/AppointController")

router.post("/book", auth, Appointment.booking);
router.get("/count", Appointment.countAppointments);
router.get("/show",auth,Appointment.getPatientAppointments)
router.get("/doctor",auth, Appointment.showAppoint);
router.delete("/cancel/:appointmentId", auth, Appointment.cancel);

module.exports=router;