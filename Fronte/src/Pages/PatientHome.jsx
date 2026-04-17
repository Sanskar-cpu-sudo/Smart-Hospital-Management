import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/PatientHome.css";

function PatientHome() {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10); 

  /* ---------------- FETCH DOCTORS ---------------- */

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/doctors/getalldoctors")
      .then((res) => setDoctors(res.data))
      .catch((err) => console.log(err));
  }, []);

  const showMore = () => {
    setVisibleCount((prev) => prev + 5); // load 5 more
  };

  return (
    <div className="container py-4">

      {/* ================================================= */}
      {/* ================= HERO 1 ======================== */}
      {/* ================================================= */}

      <section className="hero-section mb-5">
        <div className="row align-items-center">

          <div className="col-md-6 hero-text">
            <h1>Book Appointment</h1>
            <h2>With Trusted Doctors</h2>
            <p>
              Browse through our trusted doctors and book instantly.
            </p>

            <button
              className="btn btn-light"
              onClick={() => navigate("/doctors")}
            >
              Book Appointment →
            </button>
          </div>

          <div className="col-md-6 text-end">
            <img src="/hero1.png" className="hero-doctor" alt="" />
          </div>

        </div>
      </section>



      {/* ================================================= */}
      {/* ================= TOP DOCTORS =================== */}
      {/* ================================================= */}

      <h3 className="text-center fw-bold mb-4">Top Doctors</h3>

      <div className="doctor-grid mb-3">

        {doctors.slice(0, visibleCount).map((doc) => (
          <div key={doc._id} className="doctor-card">

            <img
              src="https://cdn-icons-png.flaticon.com/512/387/387561.png"
              className="doctor-img"
              alt=""
            />

            <p className="available">● Available</p>

            <h6>{doc.userId?.username}</h6>

            <p className="specialization">
              {doc.specialization}
            </p>

            <button
              className="btn btn-primary btn-sm w-100"
              onClick={() =>
                navigate(`/doctor/details/${doc._id}`)
              }
            >
              Show Details
            </button>

          </div>
        ))}

      </div>

      {/* ---------- SHOW MORE BUTTON ---------- */}

      {visibleCount < doctors.length && (
        <div className="text-center mb-5">
          <button className="btn btn-outline-primary" onClick={showMore}>
            Show More Doctors
          </button>
        </div>
      )}



      {/* ================================================= */}
      {/* ================= SPECIALIZATION ================ */}
      {/* ================================================= */}

      <h3 className="text-center fw-bold mb-4">
        Browse by Specialization
      </h3>

      <div className="special-grid mb-5">

        {[
          { name: "General", icon: "🩺" },
          { name: "Gynecology", icon: "🤰" },
          { name: "Dermatology", icon: "🧴" },
          { name: "Pediatrician", icon: "👶" },
          { name: "Neurology", icon: "🧠" },
          { name: "Eye", icon: "🫁" }
        ].map((item) => (
          <div
            key={item.name}
            className="special-card"
            onClick={() =>
              navigate(`/doctors/specialization/${item.name}`)
            }
          >
            <div className="icon-circle">{item.icon}</div>
            <p>{item.name}</p>
          </div>
        ))}

      </div>



      {/* ================================================= */}
      {/* ================= HERO 2 ======================== */}
      {/* ================================================= */}

      <section className="hero-section mb-5">
        <div className="row align-items-center">

          <div className="col-md-6 hero-text">
            <h1>100+ Trusted Doctors</h1>
            <p>Create account and start booking today</p>

            <button
              className="btn btn-light"
              onClick={() => navigate("/signup")}
            >
              Create Account →
            </button>
          </div>

          <div className="col-md-6 text-end">
            <img src="/hero2.png" className="hero-doctor" alt="" />
          </div>

        </div>
      </section>



      {/* ================================================= */}
      {/* ================= FOOTER ======================== */}
      {/* ================================================= */}

      <footer className="footer mt-5">

        <div className="row">

          {/* left */}
          <div className="col-md-6">
            <h4 className="footer-logo">Prescripto</h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry’s
              standard dummy text ever since the 1500s.
            </p>
          </div>

          {/* middle */}
          <div className="col-md-3">
            <h6>COMPANY</h6>
            <p>Home</p>
            <p>About us</p>
            <p>Delivery</p>
            <p>Privacy policy</p>
          </div>

          {/* right */}
          <div className="col-md-3">
            <h6>GET IN TOUCH</h6>
            <p>+1-212-456-7890</p>
            <p>greatstackdev@gmail.com</p>
          </div>

        </div>

        <hr />

        <p className="text-center small">
          Copyright 2024 © Prescripto.com - All Rights Reserved
        </p>

      </footer>

    </div>
  );
}

export default PatientHome;
