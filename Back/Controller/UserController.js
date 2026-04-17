const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User=require("../Models/UserModel");
const Doctor=require("../Models/DoctorModel");
const Patient = require("../Models/PatientModel");
const Clinic = require("../Models/ClinicModel")
const dotenv = require("dotenv");
dotenv.config(); 


async function Signup  (req, res) {
  const { username, password, email, role, extradata } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
      role
    });
    await user.save();

    
    if (role === "patient") {
      const patient = new Patient({
        userId: user._id,
        ...extradata
      });
      await patient.save();
    }

    if (role === "doctor") {
      const {
        clinicName,
        clinicAddress,
        clinicLocation,
        clinicSpecialization,
        specialization,
        Bio,
        availability
      } = extradata;

      const clinic = new Clinic({
        name: clinicName,
        address: clinicAddress,
        location: clinicLocation,
        specialization: clinicSpecialization
      });

      await clinic.save();

      const doctor = new Doctor({
        userId: user._id,
        clinicId: clinic._id,
        specialization,
        Bio,
        availability
      });

      await doctor.save();
    }

    res.json({ message: "Signup successful" });

  } catch (err) {
    console.error("Signup error:", err.message);
    res.status(500).json({ message: "Error in signup" });
  }
};


async function Login(req,res){
    const {email,password}=req.body;
    try{
        const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        role: user.role
      }
    });
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

async function getUserById(req, res) {
  const { id, role } = req.params;

  try {
    if (role === "patient") {
      const user = await Patient
        .findOne({ userId: id })
        .populate("userId", "username email");

      if (!user) return res.status(404).json({ message: "User not found" });
      return res.json(user);
    }

    if (role === "doctor") {
      const user = await Doctor
        .findOne({ userId: id })
        .populate("userId", "username email")
        .populate("clinicId");

      if (!user) return res.status(404).json({ message: "User not found" });
      return res.json(user);
    }

    return res.status(400).json({ message: "Invalid role" });

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error!");
  }
}


async function updateUser(req,res){
    const { userId, role } = req.user;

  try {
    let updatedProfile;
    if (role === "patient") {
      const allowedFields = ["age", "gender", "mobile", "address", "bloodGroup"];
      const updateData = {};

      allowedFields.forEach(field => {
        if (req.body[field] !== undefined) {
          updateData[field] = req.body[field];
        }
      });

      updatedProfile = await Patient.findOneAndUpdate(
        { userId },
        updateData,
        { new: true }
      );
    }
    else if (role === "doctor") {
      const allowedFields = ["specialization", "availability", "clinicId"];
      const updateData = {};

      allowedFields.forEach(field => {
        if (req.body[field] !== undefined) {
          updateData[field] = req.body[field];
        }
      });

      updatedProfile = await Doctor.findOneAndUpdate(
        { userId },
        updateData,
        { new: true }
      );
    }

    else {
      return res.status(400).json({ message: "Invalid role" });
    }
    if (req.body.name) {
      await User.findByIdAndUpdate(userId, { name: req.body.name });
    }

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    return res.json({
      message: "Profile updated successfully",
      profile: updatedProfile
    });

  } catch (err) {
    console.error("Error updating profile:", err.message);
    res.status(500).send("Server error!");
  }
}

module.exports={
  Login,
  Signup,
  getUserById,
  updateUser
}