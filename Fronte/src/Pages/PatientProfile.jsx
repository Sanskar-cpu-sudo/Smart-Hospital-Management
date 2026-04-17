import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import axios from "axios";
import "../styles/PatientProfile.css";

const UserProfile = () => {

  /* ================= STATE ================= */

  const { id, role } = useParams(); // from URL
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  /* ================= FETCH PROFILE ================= */

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/users/${id}/${role}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setProfile(res.data);

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();

  }, [id, role, token]); // ✅ FIXED


  /* ================= LOADING ================= */

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (!profile) return <p className="text-center mt-5">No profile found</p>;


  /* ================= UI ================= */

  return (
    <div className="container mt-5">

      <div className="profile-card shadow">

        {/* ===== HEADER ===== */}

        <div className="profile-header">

          <img
            src="https://cdn-icons-png.flaticon.com/512/387/387561.png"
            alt="user"
            className="profile-img"
          />

          {/* ✅ populated userId */}
          <h3>{profile.userId?.username}</h3>

          <p className="text-muted">{role?.toUpperCase()}</p>

        </div>


        {/* ===== BODY ===== */}

        <div className="profile-body">

          {/* -------- PATIENT -------- */}

          {role === "patient" && (
            <>
              <p><strong>Email:</strong> {profile.userId?.email}</p>
              <p><strong>Age:</strong> {profile.age}</p>
              <p><strong>Mobile:</strong> {profile.mobile}</p>
              <p><strong>Gender:</strong> {profile.gender}</p>
              <p><strong>Address:</strong> {profile.address}</p>
              <p><strong>Blood Group:</strong> {profile.bloodGroup}</p>
            </>
          )}


          {/* -------- DOCTOR -------- */}

          {role === "doctor" && (
            <>
              <p><strong>Email:</strong> {profile.userId?.email}</p>
              <p><strong>Specialization:</strong> {profile.specialization}</p>
              <p><strong>Bio:</strong> {profile.Bio}</p>

              {profile.clinicId && (
                <>
                  <p><strong>Clinic:</strong> {profile.clinicId.name}</p>
                  <p><strong>Location:</strong> {profile.clinicId.location}</p>
                </>
              )}
            </>
          )}

        </div>

      </div>

    </div>
  );
};

export default UserProfile;
