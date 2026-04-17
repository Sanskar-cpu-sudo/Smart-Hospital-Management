import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  /* ---------- COMMON ---------- */

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleExtraChange = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };

  /* ---------- DAYS ---------- */

  const toggleDay = (day) => {
    setAvailability((prev) => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day]
    }));
  };

  /* ---------- SUBMIT ---------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      role,
      extradata:
        role === "doctor"
          ? { ...extra, availability: [availability] }
          : extra
    };

    try {
      await axios.post("http://localhost:5000/api/auth/signup", payload);
      alert("Signup Successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div>
      <h2>Signup</h2>

      <form onSubmit={handleSubmit}>

        <input name="username" placeholder="Username" onChange={handleChange} />
        <br />

        <input name="email" placeholder="Email" onChange={handleChange} />
        <br />

        <input name="password" type="password" placeholder="Password" onChange={handleChange} />
        <br />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select Role</option>
          <option value="doctor">Doctor</option>
          <option value="patient">Patient</option>
        </select>

        <br /><br />

        {role === "patient" && (
          <>
            <input name="age" placeholder="Age" onChange={handleExtraChange} />
            <br />
            <input name="mobile" placeholder="Mobile" onChange={handleExtraChange} />
            <br></br>
            <select name="gender" onChange={handleExtraChange}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
            <input name="address" placeholder="Address" onChange={handleExtraChange} />
            <br />
            <input name="bloodGroup" placeholder="bg" onChange={handleExtraChange} />
            <br />
          </>
        )}

        {role === "doctor" && (
          <>
            <input name="Bio" placeholder="Bio" onChange={handleExtraChange} />
            <br />
            <input name="specialization" placeholder="Specialization" onChange={handleExtraChange} />
            <br />
                <h3>Clinic Details</h3>

                <input
                  name="clinicName"
                  placeholder="Clinic Name"
                  onChange={handleExtraChange}
                />
                <br />

                <input
                  name="clinicAddress"
                  placeholder="Clinic Address"
                  onChange={handleExtraChange}
                />
                <br />

                <input
                  name="clinicLocation"
                  placeholder="City / Location"
                  onChange={handleExtraChange}
                />
                <br />
                        <input
              name="clinicSpecialization"
              placeholder="Clinic Specialization"
              onChange={handleExtraChange}
            />
            <br /><br />
            <input type="time" onChange={(e) => setAvailability({ ...availability, from: e.target.value })} />
            <input type="time" onChange={(e) => setAvailability({ ...availability, to: e.target.value })} />
            <input type="number" placeholder="Slots" onChange={(e) => setAvailability({ ...availability, maxSlots: e.target.value })} />

            <br /><br />

            {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(day => (
              <label key={day}>
                <input type="checkbox" onChange={() => toggleDay(day)} />
                {day}
              </label>
            ))}
          </>
        )}

        <br /><br />

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default UserSignup;
