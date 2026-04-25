import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const getHomeRoute = () => {
    if (role === "patient") return "/patient/dashboard";
    if (role === "doctor") return "/doctor/dashboard";
    return "/";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark px-4 py-3">

      {/* LOGO */}
      <Link
        className="navbar-brand fw-bold fs-4"
        to={getHomeRoute()}
      >
        🏥 MediCare
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#nav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className="collapse navbar-collapse"
        id="nav"
      >
        <ul className="navbar-nav ms-auto align-items-center gap-3">

          {/* guest */}
          {!role && (
            <>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/showalldoctors"
                >
                  Doctors
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/login"
                >
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="btn btn-primary rounded-pill px-4"
                  to="/signup"
                >
                  Signup
                </Link>
              </li>
            </>
          )}

          {/* patient */}
          {role === "patient" && (
            <>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/showalldoctors"
                >
                  Doctors
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/patient/appointments"
                >
                  Appointments
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/patient/prescriptions"
                >
                  Prescriptions
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link"
                  to={`/profile/${userId}/patient`}
                >
                  Profile
                </Link>
              </li>

              <li className="nav-item">
                <button
                  className="btn btn-danger rounded-pill px-4"
                  onClick={logout}
                >
                  Logout
                </button>
              </li>
            </>
          )}

          {/* doctor */}
          {role === "doctor" && (
            <>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/doctor/dashboard"
                >
                  Dashboard
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link"
                  to={`/profile/${userId}/doctor`}
                >
                  Profile
                </Link>
              </li>

              <li className="nav-item">
                <button
                  className="btn btn-danger rounded-pill px-4"
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