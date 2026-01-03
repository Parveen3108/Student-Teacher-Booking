import { useEffect, useState } from "react";
import { realtimeDB } from "../../firebase/config";
import { ref, onValue, push } from "firebase/database";
import { logAction } from "../../utils/logAction";

const BookAppointment = () => {
  const studentId = localStorage.getItem("studentId");

  const [teachers, setTeachers] = useState([]);
  const [teacherId, setTeacherId] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const timeSlots = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ];

  // Fetch teachers
  useEffect(() => {
    const teacherRef = ref(realtimeDB, "Teachers");

    onValue(teacherRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map((id) => ({
          id,
          ...data[id],
        }));
        setTeachers(list);
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!teacherId || !date || !timeSlot) {
      return setErrorMsg("Please fill all fields.");
    }

    setLoading(true);

    try {
      const apptRef = ref(realtimeDB, "Appointments");

      await push(apptRef, {
        studentId,
        teacherId,
        date,
        timeSlot,
        status: "pending",
        createdAt: new Date().toISOString(),
      });

      logAction("Appointment Booked", { studentId, teacherId, date });

      setSuccessMsg("Appointment Booked Successfully!");
      setTeacherId("");
      setDate("");
      setTimeSlot("");

      setTimeout(() => setSuccessMsg(""), 2000);
    } catch (error) {
      console.error(error);
      setErrorMsg("Failed to book appointment.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-5 text-blue-700">
        Book Appointment
      </h2>

      {errorMsg && (
        <p className="text-red-500 text-center mb-4">{errorMsg}</p>
      )}

      {successMsg && (
        <p className="text-green-600 text-center mb-4">{successMsg}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Select Teacher */}
        <div>
          <label className="font-semibold">Select Teacher</label>
          <select
            className="w-full p-3 border rounded-lg mt-1"
            value={teacherId}
            onChange={(e) => setTeacherId(e.target.value)}
          >
            <option value="">Choose Teacher</option>
            {teachers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} — {t.department}
              </option>
            ))}
          </select>
        </div>

        {/* Select Date */}
        <div>
          <label className="font-semibold">Select Date</label>
          <input
            type="date"
            className="w-full p-3 border rounded-lg mt-1"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Select Time Slot */}
        <div>
          <label className="font-semibold">Select Time</label>
          <select
            className="w-full p-3 border rounded-lg mt-1"
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
          >
            <option value="">Choose Time Slot</option>
            {timeSlots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Booking..." : "Book Appointment"}
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;
