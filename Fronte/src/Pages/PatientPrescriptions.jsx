import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/PatientPrescriptions.css";

const PatientPrescriptions = () => {
  const token = localStorage.getItem("token");

  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPrescriptions = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/prescriptions/my",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setPrescriptions(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load prescriptions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h4>Loading prescriptions...</h4>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <h2 className="text-center mb-5 fw-bold">
        My Prescriptions
      </h2>

      {prescriptions.length === 0 && (
        <div className="empty-box">
          <h5>No prescriptions found</h5>
        </div>
      )}

      <div className="prescription-list">
        {prescriptions.map((pres) => (
          <div
            className="prescription-card"
            key={pres._id}
          >
            <div className="doctor-header">
              <img
                src="https://cdn-icons-png.flaticon.com/512/387/387561.png"
                alt="doctor"
                className="doctor-img"
              />

              <div>
                <h5>
                  Dr.{" "}
                  {
                    pres.doctorId?.userId
                      ?.username
                  }
                </h5>

                <p className="specialization">
                  {
                    pres.doctorId
                      ?.specialization
                  }
                </p>

                <p className="date">
                  📅{" "}
                  {new Date(
                    pres.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>

            <hr />

            <h6>Diagnosis</h6>

            <p className="diagnosis">
              {pres.diagnosis}
            </p>

            <h6 className="mt-4">
              Medicines
            </h6>

            {pres.medicines.map(
              (med, index) => (
                <div
                  className="medicine-item"
                  key={index}
                >
                  <h6>
                    💊 {med.name} —{" "}
                    {med.dosage}
                  </h6>

                  <p>
                    →{" "}
                    {med.instructions}
                  </p>
                </div>
              )
            )}

          </div>
        ))}
      </div>

    </div>
  );
};

export default PatientPrescriptions;