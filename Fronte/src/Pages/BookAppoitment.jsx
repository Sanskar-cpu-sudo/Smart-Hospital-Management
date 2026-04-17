import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/BookAppointment.css";

const BookAppointment = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [doctor, setDoctor] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [slotsLeft, setSlotsLeft] = useState({});
  const [loading, setLoading] = useState(true);

  /* ================= FETCH DOCTOR ================= */

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/doctors/${doctorId}`
        );

        console.log("Doctor API Response =>", res.data);

        setDoctor(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [doctorId]);

  /* ================= SAFETY ================= */

  const availability = doctor?.availability?.[0];

  /* ================= GENERATE NEXT 7 DAYS ================= */

  const getAvailableDays = () => {
    if (!availability) return [];

    const daysAllowed = availability.days;

    const result = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);

      // ⭐ FIXED → short weekday (Mon/Tue/Wed)
      const dayName = date.toLocaleDateString("en-US", {
        weekday: "short"
      });

      if (daysAllowed.includes(dayName)) {
        result.push({
          label: dayName.toUpperCase(),
          dateStr: date.toISOString().split("T")[0]
        });
      }
    }

    return result;
  };

  /* ================= GENERATE TIME BLOCKS ================= */

  const generateTimeBlocks = () => {
    if (!availability) return [];

    const { from, to } = availability;

    const blocks = [];

    let start = new Date(`1970-01-01T${from}`);
    const end = new Date(`1970-01-01T${to}`);

    while (start < end) {
      const next = new Date(start);
      next.setHours(start.getHours() + 1);

      const label =
        start.toTimeString().slice(0, 5) +
        " - " +
        next.toTimeString().slice(0, 5);

      blocks.push(label);

      start = next;
    }

    return blocks;
  };

  /* ================= FETCH SLOT COUNT (FAST) ================= */

  const fetchSlots = async (date) => {
    if (!availability) return;

    const blocks = generateTimeBlocks();

    try {
      const requests = blocks.map((block) => {
        const time = block.split(" - ")[0];

        return axios.get(
          `http://localhost:5000/api/appointments/count`,
          {
            params: { doctorId, date, time }
          }
        );
      });

      const responses = await Promise.all(requests);

      const newSlots = {};

      blocks.forEach((block, i) => {
        const count = responses[i].data.count;
        newSlots[block] = availability.maxSlots - count;
      });

      setSlotsLeft(newSlots);
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= BOOK ================= */

  const book = async () => {
    try {
      const time = selectedTime.split(" - ")[0];

      await axios.post(
        "http://localhost:5000/api/appointments/book",
        {
          doctorId,
          date: selectedDay,
          time
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Appointment booked!");
      navigate("/patient/appointments");
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  /* ================= RENDER ================= */

  if (loading) return <h4 className="text-center mt-5">Loading...</h4>;

  if (!availability)
    return (
      <h4 className="text-center mt-5">
        No availability configured for this doctor
      </h4>
    );

  const days = getAvailableDays();
  const blocks = generateTimeBlocks();

  return (
    <div className="container py-5">
      <div className="booking-card shadow">

        <h3 className="text-center mb-4">
          Booking Slots
        </h3>

        {/* ================= DAYS ================= */}

        <div className="day-row">
          {days.map((d) => (
            <button
              key={d.dateStr}
              className={`day-btn ${selectedDay === d.dateStr ? "active" : ""}`}
              onClick={() => {
                setSelectedDay(d.dateStr);
                setSelectedTime(null);
                fetchSlots(d.dateStr);
              }}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* ================= TIME BLOCKS ================= */}

        {selectedDay && (
          <div className="slot-row">
            {blocks.map((block) => {
              const left = slotsLeft[block] ?? availability.maxSlots;

              const disabled =
                left <= 0 ||
                new Date(`${selectedDay}T${block.split(" - ")[0]}`) < new Date();

              return (
                <button
                  key={block}
                  disabled={disabled}
                  className={`slot-btn 
                    ${selectedTime === block ? "active" : ""} 
                    ${disabled ? "disabled" : ""}
                  `}
                  onClick={() => setSelectedTime(block)}
                >
                  {block}
                  <span className="slot-left">{left} left</span>
                </button>
              );
            })}
          </div>
        )}

        {/* ================= BOOK BTN ================= */}

        {selectedTime && (
          <button className="book-btn" onClick={book}>
            Book an appointment
          </button>
        )}
      </div>
    </div>
  );
};

export default BookAppointment;
