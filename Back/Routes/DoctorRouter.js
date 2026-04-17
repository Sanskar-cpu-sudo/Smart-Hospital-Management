const express = require("express");
const router = express.Router();

const Doctor = require("../Controller/DoctorController")

router.get("/getalldoctors",Doctor.getAllDoctors);
router.get("/getdoctorbycity",Doctor.getDoctorsByCity);
router.get("/getbyspecialization/:spec",Doctor.getDoctorsBySpecialization);
router.get("/:doctorId", Doctor.showDoctor);

module.exports = router;
 