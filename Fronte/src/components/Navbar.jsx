import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role"); // patient | doctor | null

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">

      {/* ================= LOGO ================= */}
      <Link className="navbar-brand fw-bold text-primary" to="/">
        🏥 MediCare
      </Link>

      {/* mobile toggle */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#nav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="nav">

        <ul className="navbar-nav ms-auto align-items-center gap-3">

          {/* ================================================= */}
          {/* ================= GUEST ========================= */}
          {/* ================================================= */}

          {!role && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/doctors">All Doctors</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/about">About Us</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>

              <li className="nav-item">
                <Link className="btn btn-primary btn-sm" to="/signup">
                  Signup
                </Link>
              </li>
            </>
          )}


          {/* ================================================= */}
          {/* ================= PATIENT ======================= */}
          {/* ================================================= */}

          {role === "patient" && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/showalldoctors">All Doctors</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/patient/appointments">
                  My Appointments
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/patient/prescriptions">
                  My Prescriptions
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link"  to={`/profile/${localStorage.getItem("userId")}/${localStorage.getItem("role")}`}>
                  My Profile
                </Link>
              </li>

              <li className="nav-item">
                <button
                  className="btn btn-danger btn-sm"
                  onClick={logout}
                >
                  Logout
                </button>
              </li>
            </>
          )}


          {/* ================================================= */}
          {/* ================= DOCTOR ======================== */}
          {/* ================================================= */}

          {role === "doctor" && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About Us</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/doctor/profile">
                  My Profile
                </Link>
              </li>

              <li className="nav-item">
                <button
                  className="btn btn-danger btn-sm"
                  onClick={logout}
                >
                  Logout
                </button>
              </li>
            </>
          )}

        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
