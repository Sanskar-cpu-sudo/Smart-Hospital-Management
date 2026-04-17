import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/SpecializationDoctors.css";

const SpecializationDoctors = () => {

  const { spec } = useParams();
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState(""); // ✅ city search
  const [loading, setLoading] = useState(true);


  /* ================= FETCH DOCTORS ================= */

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/doctors/getbyspecialization/${spec}`
        );

        setDoctors(res.data);

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [spec]);


  /* ================= FILTER BY CITY ================= */

  const filteredDoctors = doctors.filter((doc) =>
    doc.clinicId?.location
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );


  /* ================= LOADING ================= */

  if (loading) return <h4 className="text-center mt-5">Loading...</h4>;


  /* ================= UI ================= */

  return (
    <div className="container py-5">

      <h3 className="text-center mb-4 fw-bold">
        {spec} Specialists
      </h3>


      {/* ================= SEARCH BAR ================= */}

      <div className="search-wrapper mb-4">
        <input
          type="text"
          placeholder="Search by city..."
          className="form-control search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>


      {filteredDoctors.length === 0 && (
        <p className="text-center">No doctors found</p>
      )}


      {/* ================= GRID ================= */}

      <div className="doctor-grid">

        {filteredDoctors.map((doc) => (
          <div key={doc._id} className="doctor-card">

            <img
              src="https://cdn-icons-png.flaticon.com/512/387/387561.png"
              className="doctor-img"
              alt=""
            />

            <h6>{doc.userId?.username}</h6>

            <p className="spec">{doc.specialization}</p>

            <p>{doc.clinicId?.name}</p>

            <p className="location">{doc.clinicId?.location}</p>

            <button
              className="btn btn-primary btn-sm w-100"
              onClick={() =>
                navigate(`/doctor/${doc._id}`)
              }
            >
              Show Details
            </button>

          </div>
        ))}

      </div>

    </div>
  );
};

export default SpecializationDoctors;
