const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User=require("../Models/UserModel");
const Doctor=require("../Models/DoctorModel");
const Patient = require("../Models/PatientModel");
const Clinic = require("../Models/ClinicModel")
const Prescription=require("../Models/PrescriptionModel")
const Appointment=require("../Models/AppointModel")

async function writePrescription(req,res){
      try {
    const { appointmentId, diagnosis, medicines } = req.body;
    const { userId, role } = req.user;

    if (role !== "doctor") {
      return res.status(403).json({ message: "Access denied" });
    }

    const doctor = await Doctor.findOne({ userId });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.doctorId.toString() !== doctor._id.toString()) {
      return res.status(403).json({ message: "Not your appointment" });
    }
    const existing = await Prescription.findOne({ appointmentId });
    if (existing) {
      return res.status(400).json({ message: "Prescription already written" });
    }

    const prescription = new Prescription({
      appointmentId,
      patientId: appointment.patientId,
      doctorId: appointment.doctorId,
      diagnosis,
      medicines
    });

    await prescription.save();

    appointment.status = "completed";
    await appointment.save();

    res.json({
      message: "Prescription sent successfully",
      prescription
    });

  } catch (err) {
    console.error("Prescription error:", err.message);
    res.status(500).send("Server error");
  }
}

async function getMyPrescriptions(req, res) {
  try {
    const { userId, role } = req.user;

    if (role !== "patient") {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    const prescriptions = await Prescription.find({
      patientId: userId
    })
      .populate({
        path: "doctorId",
        populate: {
          path: "userId",
          select: "username email"
        }
      })
      .populate("appointmentId")
      .sort({ createdAt: -1 });

    res.json(prescriptions);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}
module.exports={
  writePrescription,
  getMyPrescriptions,
}