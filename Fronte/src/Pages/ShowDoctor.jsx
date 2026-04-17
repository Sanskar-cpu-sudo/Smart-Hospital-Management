import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ShowDoctor.css";

const ShowDoctor = () => {
const navigate = useNavigate();
  const { doctorId } = useParams();
  
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH DOCTOR ================= */

  useEffect(() => {
    const fetchDoctor = async () => {

      try {
        const res = await axios.get(
          `http://localhost:5000/api/doctors/${doctorId}`
        );

        setDoctor(res.data);

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [doctorId]);

  if (loading) return <h4 className="text-center mt-5">Loading...</h4>;
  if (!doctor) return <h4 className="text-center mt-5">Doctor not found</h4>;

  /* ================= UI ================= */

  return (
    <div className="container py-5">

      <div className="doctor-details-card shadow">

        {/* ===== HEADER ===== */}

        <div className="details-header">

          <img
            src="https://cdn-icons-png.flaticon.com/512/387/387561.png"
            alt="doctor"
            className="details-img"
          />

          <div>
            <h3>{doctor.userId?.username}</h3>
            <p className="spec">{doctor.specialization}</p>
            <p>{doctor.userId?.email}</p>
          </div>

        </div>


        {/* ===== BODY ===== */}

        <div className="details-body">

          <h5>Clinic Information</h5>

          <p><strong>Name:</strong> {doctor.clinicId?.name}</p>
          <p><strong>Location:</strong> {doctor.clinicId?.location}</p>
          <p><strong>Address:</strong> {doctor.clinicId?.address}</p>


          <h5 className="mt-4">About Doctor</h5>

          <p>{doctor.Bio || "No bio available"}</p>


          {/* Availability */}
          {doctor.availability && (
            <>
              <h5 className="mt-4">Availability</h5>
               
              {doctor.availability.map((a, index) => (
                <p key={index}>
                  {a.days.join(", ")} <br></br>{a.from} - {a.to}
                </p>
              ))}
            </>
          )}
          <button className="btn btn-primary" onClick={() =>
                navigate(`/appointment/book/${doctor._id}`)
              }>Book Appointment</button>

        </div>

      </div>

    </div>
  );
};

export default ShowDoctor;
