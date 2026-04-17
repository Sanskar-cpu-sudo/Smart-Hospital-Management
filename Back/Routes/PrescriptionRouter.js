const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  writePrescription,
  getMyPrescriptions
} = require("../Controller/PresciptionController");

// doctor writes
router.post("/", auth, writePrescription);

// patient views
router.get("/my", auth, getMyPrescriptions);

module.exports = router;
