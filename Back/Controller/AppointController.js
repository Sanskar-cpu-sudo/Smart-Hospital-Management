const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User=require("../Models/UserModel");
const Doctor=require("../Models/DoctorModel");
const Patient = require("../Models/PatientModel");
const Clinic = require("../Models/ClinicModel");
const Appointment=require("../Models/AppointModel");

async function booking(req, res) {
  try {
    const { doctorId, date, time } = req.body;
    const { userId, role } = req.user;

    if (!userId)
      return res.status(403).json({ message: "Login required" });

    if (role !== "patient")
      return res.status(403).json({ message: "Only patients allowed" });

    if (!doctorId || !date || !time)
      return res.status(400).json({ message: "Missing fields" });

    const doctor = await Doctor.findById(doctorId);

    if (!doctor)
      return res.status(404).json({ message: "Doctor not found" });

    const clinicId = doctor.clinicId;

    const day = new Date(date).toLocaleDateString("en-US", {
      weekday: "short"
    });

    const availability = doctor.availability.find(a =>
      a.days.includes(day)
    );

    if (!availability)
      return res.status(400).json({ message: "Doctor not available today" });

    if (time < availability.from || time >= availability.to)
      return res.status(400).json({ message: "Invalid time" });

    const appointmentDateTime = new Date(`${date}T${time}`);

    if (appointmentDateTime <= new Date())
      return res.status(400).json({ message: "Past time not allowed" });

    const bookedCount = await Appointment.countDocuments({
      doctorId,
      date,
      time,
      status: "confirmed"
    });

    if (bookedCount >= availability.maxSlots)
      return res.status(400).json({ message: "Slots full" });

    const appointment = await Appointment.create({
      patientId: userId,
      doctorId,
      clinicId,
      date,
      time,
      status: "confirmed"
    });

    res.json({ message: "Booked successfully", appointment });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}


async function showAppoint(req, res) {
  try {
    const { userId, role } = req.user;
    if (role !== "doctor") {
      return res.status(403).json({ message: "Access Denied" });
    }

    const doctor = await Doctor.findOne({ userId });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }
    const today = new Date().toISOString().split("T")[0];
    const now = new Date();

    let appointments = await Appointment.find({
      doctorId: doctor._id,
      date: today,
    })
      .populate("patientId", "username email")
      .sort({ time: 1 });

    // auto-complete logic
    for (let appt of appointments) {
      const appointmentDateTime = new Date(`${appt.date}T${appt.time}`);

      if (appt.status === "confirmed" && appointmentDateTime < now) {
        appt.status = "completed";
        await appt.save(); // updates updatedAt automatically
      }
    }

    res.json(appointments);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
}
async function getPatientAppointments(req, res) {
  try {
    const { userId, role } = req.user;

    if (role !== "patient") {
      return res.status(403).json({ message: "Access denied" });
    }

    const now = new Date();

    let appointments = await Appointment.find({
      patientId: userId
    })
      .populate("doctorId")
      .populate("clinicId")
      .sort({ date: 1, time: 1 });
    for (let appt of appointments) {
      const appointmentDateTime = new Date(`${appt.date}T${appt.time}`);

      if (appt.status === "confirmed" && appointmentDateTime < now) {
        appt.status = "completed";
        await appt.save();
      }
    }

    res.json(appointments);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
async function cancel(req, res) {
  const { userId, role } = req.user;
  const { appointmentId } = req.params;
  try {
    if (role !== "patient") {
      return res
        .status(403)
        .json({ message: "Only patients can cancel appointments" });
    }

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    if (appointment.patientId.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to cancel this appointment" });
    }

    // Check if already cancelled or completed
    if (appointment.status !== "confirmed") {
      return res.status(400).json({
        message: `Appointment already ${appointment.status}`,
      });
    }

    // Combine date + time to check expiry
    const appointmentDateTime = new Date(
      `${appointment.date}T${appointment.time}`,
    );
    const now = new Date();

    if (appointmentDateTime <= now) {
      return res.status(400).json({
        message: "Cannot cancel appointment after scheduled time",
      });
    }

    // Cancel appointment
    appointment.status = "cancelled";
    await appointment.save(); // updatedAt is updated automatically

    res.json({
      message: "Appointment cancelled successfully",
      appointment,
    });
  } catch (err) {}
}

async function countAppointments(req, res) {
  try {
    const { doctorId, date, time } = req.query;

    const count = await Appointment.countDocuments({
      doctorId,
      date,
      time,
      status: "confirmed"
    });

    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}


module.exports={
  showAppoint,
  booking,
  cancel,
  countAppointments,
  getPatientAppointments
}
