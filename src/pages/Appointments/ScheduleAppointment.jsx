import { useEffect, useState } from "react";
import { realtimeDB } from "../../firebase/config";
import { ref, onValue, push } from "firebase/database";
import { logAction } from "../../utils/logAction";

const ScheduleAppointment = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const [studentId, setStudentId] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const timeSlots = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ];

  // Fetch Students
  useEffect(() => {
    const studentRef = ref(realtimeDB, "Students");

    onValue(studentRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data)
          .map((id) => ({ id, ...data[id] }))
          .filter((s) => s.status === "approved"); // Only approved students
        setStudents(list);
      }
    });
  }, []);

  // Fetch Teachers
  useEffect(() => {
    const teacherRef = ref(realtimeDB, "Teachers");

    onValue(teacherRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map((id) => ({ id, ...data[id] }));
        setTeachers(list);
      }
    });
  }, []);

  const handleSchedule = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!studentId || !teacherId || !date || !timeSlot) {
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
        status: "approved",
        createdBy: "admin",
        createdAt: new Date().toISOString(),
      });

      logAction("Admin Scheduled Appointment", {
        studentId,
        teacherId,
        date,
        timeSlot,
      });

      setSuccessMsg("Appointment Scheduled Successfully!");
      setStudentId("");
      setTeacherId("");
      setDate("");
      setTimeSlot("");

      setTimeout(() => setSuccessMsg(""), 2500);
    } catch (error) {
      console.error(error);
      setErrorMsg("Failed to schedule appointment.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg p-8 rounded-xl">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Schedule Appointment (Admin)
      </h2>

      {errorMsg && <p className="text-red-500 text-center mb-3">{errorMsg}</p>}
      {successMsg && (
        <p className="text-green-600 text-center mb-3">{successMsg}</p>
      )}

      <form onSubmit={handleSchedule} className="space-y-5">

        {/* Select Student */}
        <div>
          <label className="font-semibold">Select Student</label>
          <select
            className="w-full p-3 border rounded-lg mt-1"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          >
            <option value="">Choose Student</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} — {s.email}
              </option>
            ))}
          </select>
        </div>

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
          <label className="font-semibold">Select Time Slot</label>
          <select
            className="w-full p-3 border rounded-lg mt-1"
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
          >
            <option value="">Choose Time Slot</option>
            {timeSlots.map((slot, i) => (
              <option key={i} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Scheduling..." : "Schedule Appointment"}
        </button>
      </form>
    </div>
  );
};

export default ScheduleAppointment;
