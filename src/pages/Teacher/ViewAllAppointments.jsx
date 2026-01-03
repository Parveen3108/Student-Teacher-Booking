import { useEffect, useState } from "react";
import { realtimeDB } from "../../firebase/config";
import { ref, onValue } from "firebase/database";

const ViewAllAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [students, setStudents] = useState({});
  const [teachers, setTeachers] = useState({});

  // Fetch Students
  useEffect(() => {
    const studentRef = ref(realtimeDB, "Students");
    onValue(studentRef, (snap) => setStudents(snap.val() || {}));
  }, []);

  // Fetch Teachers
  useEffect(() => {
    const teacherRef = ref(realtimeDB, "Teachers");
    onValue(teacherRef, (snap) => setTeachers(snap.val() || {}));
  }, []);

  // Fetch All Appointments
  useEffect(() => {
    const apptRef = ref(realtimeDB, "Appointments");

    onValue(apptRef, (snapshot) => {
      const data = snapshot.val() || {};
      const list = Object.keys(data).map((id) => ({ id, ...data[id] }));
      setAppointments(list);
    });
  }, []);

  const getStudentName = (id) => students[id]?.name || "Unknown";
  const getTeacherName = (id) => teachers[id]?.name || "Unknown";

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white shadow-xl p-8 rounded-xl">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
        All Appointments
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="px-4 py-2">Student</th>
              <th className="px-4 py-2">Teacher</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Time</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {appointments.length > 0 ? (
              appointments.map((a) => (
                <tr key={a.id} className="border text-center">
                  <td className="px-4 py-2">{getStudentName(a.studentId)}</td>
                  <td className="px-4 py-2">{getTeacherName(a.teacherId)}</td>
                  <td className="px-4 py-2">{a.date}</td>
                  <td className="px-4 py-2">{a.timeSlot}</td>

                  <td className="px-4 py-2">
                    {a.status === "pending" && (
                      <span className="bg-yellow-300 px-3 py-1 rounded text-black">
                        Pending
                      </span>
                    )}
                    {a.status === "approved" && (
                      <span className="bg-green-500 px-3 py-1 rounded text-white">
                        Approved
                      </span>
                    )}
                    {a.status === "cancelled" && (
                      <span className="bg-red-500 px-3 py-1 rounded text-white">
                        Cancelled
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-4 text-gray-500"
                >
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default ViewAllAppointments;
