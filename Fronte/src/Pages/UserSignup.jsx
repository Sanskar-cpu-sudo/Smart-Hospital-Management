import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Signup.css";

const UserSignup = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [extra, setExtra] = useState({});

  const [availability, setAvailability] = useState({
    from: "",
    to: "",
    maxSlots: "",
    days: []
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleExtraChange = (e) => {
    setExtra({
      ...extra,
      [e.target.name]: e.target.value
    });
  };

  const toggleDay = (day) => {
    setAvailability((prev) => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      role,
      extradata:
        role === "doctor"
          ? {
              ...extra,
              availability: [availability]
            }
          : extra
    };

    try {
      await axios.post(
        "http://localhost:5000/api/auth/signup",
        payload
      );

      alert("Signup Successful");
      navigate("/login");

    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Error"
      );
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">

        <div className="auth-logo">
          🏥
        </div>

        <h2>Create Account</h2>

        <p>
          Join MediCare today
        </p>

        <form onSubmit={handleSubmit}>

          {/* common */}
          <div className="input-group-custom">
            <label>Username</label>
            <input
              name="username"
              placeholder="Enter username"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group-custom">
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group-custom">
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter password"
              onChange={handleChange}
              required
            />
          </div>

          {/* role */}
          <label className="role-label">
            Select Role
          </label>

          <div className="role-selector">
            <button
              type="button"
              className={
                role === "patient"
                  ? "role-btn active"
                  : "role-btn"
              }
              onClick={() =>
                setRole("patient")
              }
            >
              Patient
            </button>

            <button
              type="button"
              className={
                role === "doctor"
                  ? "role-btn active"
                  : "role-btn"
              }
              onClick={() =>
                setRole("doctor")
              }
            >
              Doctor
            </button>
          </div>

          {/* patient */}
          {role === "patient" && (
            <>
              <div className="input-group-custom">
                <input
                  name="age"
                  placeholder="Age"
                  onChange={handleExtraChange}
                />
              </div>

              <div className="input-group-custom">
                <input
                  name="mobile"
                  placeholder="Mobile"
                  onChange={handleExtraChange}
                />
              </div>

              <div className="input-group-custom">
                <select
                  name="gender"
                  onChange={handleExtraChange}
                >
                  <option value="">
                    Select Gender
                  </option>
                  <option value="male">
                    Male
                  </option>
                  <option value="female">
                    Female
                  </option>
                  <option value="other">
                    Other
                  </option>
                </select>
              </div>

              <div className="input-group-custom">
                <input
                  name="address"
                  placeholder="Address"
                  onChange={handleExtraChange}
                />
              </div>

              <div className="input-group-custom">
                <input
                  name="bloodGroup"
                  placeholder="Blood Group"
                  onChange={handleExtraChange}
                />
              </div>
            </>
          )}

          {/* doctor */}
          {role === "doctor" && (
            <>
              <div className="input-group-custom">
                <input
                  name="Bio"
                  placeholder="Bio"
                  onChange={handleExtraChange}
                />
              </div>

              <div className="input-group-custom">
                <input
                  name="specialization"
                  placeholder="Specialization"
                  onChange={handleExtraChange}
                />
              </div>

              <div className="input-group-custom">
                <input
                  name="clinicName"
                  placeholder="Clinic Name"
                  onChange={handleExtraChange}
                />
              </div>

              <div className="input-group-custom">
                <input
                  name="clinicAddress"
                  placeholder="Clinic Address"
                  onChange={handleExtraChange}
                />
              </div>

              <div className="input-group-custom">
                <input
                  name="clinicLocation"
                  placeholder="City / Location"
                  onChange={handleExtraChange}
                />
              </div>

              <div className="input-group-custom">
                <input
                  name="clinicSpecialization"
                  placeholder="Clinic Specialization"
                  onChange={handleExtraChange}
                />
              </div>

              <div className="availability-row">
                <input
                  type="time"
                  onChange={(e) =>
                    setAvailability({
                      ...availability,
                      from: e.target.value
                    })
                  }
                />

                <input
                  type="time"
                  onChange={(e) =>
                    setAvailability({
                      ...availability,
                      to: e.target.value
                    })
                  }
                />

                <input
                  type="number"
                  placeholder="Slots"
                  onChange={(e) =>
                    setAvailability({
                      ...availability,
                      maxSlots: e.target.value
                    })
                  }
                />
              </div>

              <div className="days-box">
                {[
                  "Mon",
                  "Tue",
                  "Wed",
                  "Thu",
                  "Fri",
                  "Sat",
                  "Sun"
                ].map((day) => (
                  <button
                    key={day}
                    type="button"
                    className={
                      availability.days.includes(day)
                        ? "day-btn active"
                        : "day-btn"
                    }
                    onClick={() =>
                      toggleDay(day)
                    }
                  >
                    {day}
                  </button>
                ))}
              </div>
            </>
          )}

          <button
            className="auth-btn"
            type="submit"
            disabled={!role}
          >
            Signup
          </button>

        </form>

        <div className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </div>

      </div>
    </div>
  );
};

export default UserSignup;