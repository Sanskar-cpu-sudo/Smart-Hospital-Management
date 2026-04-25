import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserSignup from "./Pages/userSignup";
import UserLogin from "./Pages/UserLogin";
import PatientHome from "./Pages/PatientHome";
import Navbar from "./components/Navbar"
import UserProfile from "./Pages/PatientProfile"
import ShowAllDoctors from "./Pages/ShowAllDoctors";
import ShowDoctor from "./Pages/ShowDoctor";
import SpecializationDoctors from "./Pages/SpecializationDoctors";
import BookAppointment from "./Pages/BookAppoitment";
import PatientAppointments from "./Pages/PatientAppointments";
import DoctorDashboard from "./Pages/DoctorDashboard";
import WritePrescription from "./Pages/WritePrescription";
import PatientPrescriptions from "./Pages/PatientPrescriptions";
import LandingPage from "./Pages/LandingPage";
function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
         <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/login" element={<UserLogin/>}/>
        <Route path="/patient/dashboard" element={<PatientHome/>}/>
        <Route path="/showalldoctors" element={<ShowAllDoctors/>}/>
        <Route path="/patient/appointments" element={<PatientAppointments />}/>
        <Route path="/patient/prescriptions" element={<PatientPrescriptions />}/>
        <Route path="/doctor/dashboard" element={<DoctorDashboard/>}/>
        <Route path="/doctor/details/:doctorId" element={<ShowDoctor/>}/>
        <Route path="/appointment/book/:doctorId" element={<BookAppointment/>}/>
        <Route path="/doctors/specialization/:spec" element={<SpecializationDoctors />}/>
        <Route path="/profile/:id/:role" element={<UserProfile/>}/>
        <Route
          path="/doctor/prescription/:appointmentId"
          element={<WritePrescription />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
