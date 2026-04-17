const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

//Middleware
app.use(cors());
app.use(express.json());

//ROUTES (DIRECT – NO MAIN ROUTER)
app.use("/api/auth", require("./Routes/userRouter"));
app.use("/api/users",require("./Routes/profileRouter"));
app.use("/api/appointments", require("./Routes/AppointmentRouter"));
app.use("/api/doctors", require("./Routes/DoctorRouter"));
app.use("/api/prescriptions", require("./Routes/PrescriptionRouter"));
// app.use("/api/clinics", require("./Routes/clinicRoutes")); // if you add later

// 🔹 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
 
// 🔹 Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
