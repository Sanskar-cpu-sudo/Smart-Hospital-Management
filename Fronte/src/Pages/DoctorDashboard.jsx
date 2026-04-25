import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/DoctorDashboard.css";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/appointments/doctor",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setAppointments(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const total = appointments.length;
  const confirmed = appointments.filter(
    (a) => a.status === "confirmed"
  ).length;

  const cancelled = appointments.filter(
    (a) => a.status === "cancelled"
  ).length;

  const completed = appointments.filter(
    (a) => a.status === "completed"
  ).length;

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h4>Loading appointments...</h4>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <h2 className="dashboard-title mb-4">
        Doctor Dashboard
      </h2>

      {/* Stats */}
      <div className="stats-grid mb-5">

        <div className="stat-card">
          <h3>{total}</h3>
          <p>Total Today</p>
        </div>

        <div className="stat-card confirmed-card">
          <h3>{confirmed}</h3>
          <p>Confirmed</p>
        </div>

        <div className="stat-card cancelled-card">
          <h3>{cancelled}</h3>
          <p>Cancelled</p>
        </div>

        <div className="stat-card completed-card">
          <h3>{completed}</h3>
          <p>Completed</p>
        </div>

      </div>

      {/* Empty */}
      {appointments.length === 0 && (
        <div className="empty-box">
          <h5>No appointments today</h5>
        </div>
      )}

      {/* Cards */}
      <div className="appointment-grid">
        {appointments.map((appt) => (
          <div className="appointment-card" key={appt._id}>

            <img
              src="https://cdn-icons-png.flaticon.com/512/387/387561.png"
              alt="patient"
              className="patient-img"
            />

            <h5>
              {appt.patientId?.username || "Unknown Patient"}
            </h5>

            <p className="email">
              {appt.patientId?.email}
            </p>

            <p className="time">
              🕒 {appt.time}
            </p>

            {/* Status */}
            {appt.status === "confirmed" && (
              <>
                <span className="badge-confirmed">
                  Confirmed
                </span>

                <button
                  className="prescription-btn"
                  onClick={() =>
                    navigate(
                      `/doctor/prescription/${appt._id}`
                    )
                  }
                >
                  Write Prescription
                </button>
              </>
            )}

            {appt.status === "cancelled" && (
              <span className="badge-cancelled">
                Cancelled
              </span>
            )}

            {appt.status === "completed" && (
              <>
                <span className="badge-completed">
                  Completed
                </span>

                <p className="done-text">
                  Prescription Done
                </p>
              </>
            )}

          </div>
        ))}
      </div>

    </div>
  );
};

export default DoctorDashboard;