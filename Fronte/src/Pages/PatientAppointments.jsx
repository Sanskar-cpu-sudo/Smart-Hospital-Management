import { useEffect, useState } from "react";
import axios from "axios";

const PatientAppointments = () => {
  const token = localStorage.getItem("token");

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/appointments/show",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setAppointments(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  /* ================= CANCEL ================= */

  const cancelAppointment = async (id) => {
    if (!window.confirm("Cancel this appointment?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/appointments/cancel/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Cancelled successfully");
      fetchAppointments(); // refresh
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  /* ================= HELPER ================= */

  const canCancel = (appt) => {
    const dt = new Date(`${appt.date}T${appt.time}`);
    return dt > new Date() && appt.status === "confirmed";
  };

  /* ================= UI ================= */

  if (loading) return <h4>Loading...</h4>;

  return (
    <div className="container mt-5">
      <h3 className="mb-4">My Appointments</h3>

      {appointments.length === 0 && <p>No appointments found</p>}

      {appointments.map((appt) => (
        <div key={appt._id} className="card mb-3 p-3 shadow">

          <h5>{appt.doctorId?.specialization} Doctor</h5>

          <p>
            📅 {appt.date} <br />
            ⏰ {appt.time} <br />
            🏥 {appt.clinicId?.name}
          </p>

          <p>Status: <b>{appt.status}</b></p>

          {canCancel(appt) && (
            <button
              className="btn btn-danger"
              onClick={() => cancelAppointment(appt._id)}
            >
              Cancel
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default PatientAppointments;
