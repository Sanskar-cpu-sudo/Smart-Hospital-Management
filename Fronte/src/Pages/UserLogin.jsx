import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";

function UserLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("userId", user.id);

      if (user.role === "patient") {
        navigate("/patient/dashboard");
      } else {
        navigate("/doctor/dashboard");
      }

    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-logo">
          🏥
        </div>

        <h2>Welcome Back</h2>

        <p>
          Login to your MediCare account
        </p>

        <form onSubmit={handleSubmit}>

          <div className="input-group-custom">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group-custom">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={handleChange}
              required
            />
          </div>

          <button
            className="auth-btn"
            type="submit"
          >
            Login
          </button>

        </form>

        <div className="auth-footer">
          Don’t have an account?{" "}
          <Link to="/signup">
            Signup
          </Link>
        </div>

      </div>
    </div>
  );
}

export default UserLogin;