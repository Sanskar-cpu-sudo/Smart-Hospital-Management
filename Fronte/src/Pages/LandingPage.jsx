import { useNavigate } from "react-router-dom";
import {
  FaUserMd,
  FaHeartbeat,
  FaNotesMedical,
  FaRobot,
  FaArrowRight
} from "react-icons/fa";
import "../styles/LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <span className="hero-badge">
            Smart Digital Healthcare Platform
          </span>

          <h1>
            The Future of Smart Healthcare Starts Here
          </h1>

          <p>
            Book appointments, connect with trusted doctors,
            receive digital prescriptions, and manage your
            healthcare seamlessly—all in one smart platform.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={() => navigate("/signup")}
            >
              Get Started <FaArrowRight />
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/showalldoctors")}
            >
              Explore Doctors
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="hero-right">
          <div className="dashboard-card">
            <h4>AI Health Monitor</h4>

            <div className="dashboard-chart"></div>

            <div className="dashboard-stats">
              <div className="mini-stat">
                <span>Patients</span>
                <h5>1,248</h5>
              </div>

              <div className="mini-stat">
                <span>Doctors</span>
                <h5>78</h5>
              </div>
            </div>
          </div>

          <div className="floating-chip chip1">
            🤖 AI Diagnosis
          </div>

          <div className="floating-chip chip2">
            ❤️ Health Analytics
          </div>

          <div className="floating-chip chip3">
            💊 E-Prescription
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features container py-5">
        <h2 className="section-title">
          Smart Healthcare Features
        </h2>

        <div className="feature-grid">
          <div className="feature-card">
            <FaUserMd className="feature-icon" />
            <h5>Trusted Doctors</h5>
            <p>
              Consult highly qualified doctors across
              multiple specialties.
            </p>
          </div>

          <div className="feature-card">
            <FaHeartbeat className="feature-icon" />
            <h5>Digital Monitoring</h5>
            <p>
              Smart tracking for appointments,
              health records and care.
            </p>
          </div>

          <div className="feature-card">
            <FaNotesMedical className="feature-icon" />
            <h5>E-Prescriptions</h5>
            <p>
              Receive digital prescriptions securely
              inside your dashboard.
            </p>
          </div>

          <div className="feature-card">
            <FaRobot className="feature-icon" />
            <h5>AI Powered</h5>
            <p>
              Smarter healthcare with intelligent
              digital workflows.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>Your Health, Smarter Than Ever</h2>
        <p>
          Join our smart hospital ecosystem today.
        </p>

        <button
          className="primary-btn mx-auto"
          onClick={() => navigate("/login")}
        >
          Login Now
        </button>
      </section>
    </div>
  );
};

export default LandingPage;