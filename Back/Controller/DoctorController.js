const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");
const Doctor = require("../Models/DoctorModel");
const Patient = require("../Models/PatientModel");
const Clinic = require("../Models/ClinicModel");
const Appointment = require("../Models/AppointModel");

async function showDoctor(req, res) {

  const { doctorId } = req.params;
  // prevent crash if invalid id
  if (!mongoose.Types.ObjectId.isValid(doctorId)) {
    return res.status(400).json({ message: "Invalid Doctor ID" });
  }

  try {
    const doctor = await Doctor.findById(doctorId)
      .populate("clinicId")
      .populate("userId", "username email")
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    
    res.json(doctor);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}


async function getAllDoctors(req, res) {
  try {
    const doctors = await Doctor.find()
      .populate("clinicId")
      .populate("userId", "username");

    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

async function getDoctorsBySpecialization(req, res) {
  try {
    const { spec } = req.params;

    const doctors = await Doctor.find({
      specialization: spec 
    })
      .populate("clinicId")
      .populate("userId", "username email");

    res.json(doctors);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

async function getDoctorsByCity(req, res) {
  try {
    const { city } = req.params;

    const doctors = await Doctor.find()
      .populate({
        path: "clinicId",
        match: { location: city }   // filter by city here
      })
      .populate("userId", "username");

    // remove doctors whose clinic didn't match
    const filteredDoctors = doctors.filter(doc => doc.clinicId);

    res.json(filteredDoctors);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}



module.exports={
  showDoctor,
  getAllDoctors,
  getDoctorsBySpecialization,
  getDoctorsByCity
}