import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/WritePrescription.css";

const WritePrescription = () => {
  const navigate = useNavigate();
  const { appointmentId } = useParams();
  const token = localStorage.getItem("token");

  const [diagnosis, setDiagnosis] = useState("");
  const [loading, setLoading] = useState(false);

  const [medicines, setMedicines] = useState([
    {
      name: "",
      dosage: "",
      instructions: ""
    }
  ]);

  const handleMedicineChange = (index, field, value) => {
    const updated = [...medicines];
    updated[index][field] = value;
    setMedicines(updated);
  };

  const addMedicine = () => {
    setMedicines([
      ...medicines,
      {
        name: "",
        dosage: "",
        instructions: ""
      }
    ]);
  };

  const removeMedicine = (index) => {
    if (medicines.length === 1) return;

    const updated = medicines.filter(
      (_, i) => i !== index
    );

    setMedicines(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!diagnosis.trim()) {
      return alert("Diagnosis is required");
    }

    for (let med of medicines) {
      if (
        !med.name.trim() ||
        !med.dosage.trim() ||
        !med.instructions.trim()
      ) {
        return alert(
          "Fill all medicine fields"
        );
      }
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/prescriptions",
        {
          appointmentId,
          diagnosis,
          medicines
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Prescription submitted successfully");

      navigate("/doctor/dashboard");

    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message ||
          "Submission failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">

      <div className="prescription-card shadow">

        <h2 className="text-center mb-4">
          Write Prescription
        </h2>

        <form onSubmit={handleSubmit}>

          {/* Diagnosis */}
          <div className="mb-4">
            <label className="form-label fw-bold">
              Diagnosis
            </label>

            <textarea
              className="form-control"
              rows="4"
              placeholder="Enter diagnosis..."
              value={diagnosis}
              onChange={(e) =>
                setDiagnosis(e.target.value)
              }
              required
            />
          </div>

          {/* Medicines */}
          <h5 className="mb-3">
            Medicines
          </h5>

          {medicines.map((med, index) => (
            <div
              className="medicine-box"
              key={index}
            >
              <div className="row g-3">

                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Medicine Name"
                    value={med.name}
                    onChange={(e) =>
                      handleMedicineChange(
                        index,
                        "name",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Dosage"
                    value={med.dosage}
                    onChange={(e) =>
                      handleMedicineChange(
                        index,
                        "dosage",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Instructions"
                    value={med.instructions}
                    onChange={(e) =>
                      handleMedicineChange(
                        index,
                        "instructions",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="col-md-1">
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() =>
                      removeMedicine(index)
                    }
                  >
                    ✕
                  </button>
                </div>

              </div>
            </div>
          ))}

          {/* Add medicine */}
          <button
            type="button"
            className="add-btn"
            onClick={addMedicine}
          >
            + Add Medicine
          </button>

          {/* Submit */}
          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading
              ? "Submitting..."
              : "Submit Prescription"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default WritePrescription;